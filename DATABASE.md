# Base de datos — SmartPark Supabase

> Motor: PostgreSQL · Proveedor: Supabase  
> La app móvil consume esta base de datos directamente via Supabase Client.  
> El ESP32 actualiza datos via API REST (Laravel) que escribe en las mismas tablas.

---

## Arquitectura de datos

```
auth.users (Supabase Auth)
    │
    ▼
profiles ────────────────────────────────┐
    │                                    │
    │                              visit_history
    │                             (historial del cliente)
    ▼
parking_lots (estacionamientos)
    │
    └──▶ parking_spots (cajones individuales)
              │
              └──▶ spot_events (log de cambios de estado — del ESP32)
```

---

## Enums

```sql
CREATE TYPE user_role     AS ENUM ('client', 'employee', 'admin');
CREATE TYPE spot_status   AS ENUM ('available', 'occupied', 'maintenance');
CREATE TYPE visit_status  AS ENUM ('active', 'completed', 'cancelled');
```

---

## Tablas

### `profiles`
Extiende `auth.users`. Se crea automáticamente al registrarse.

| Columna      | Tipo          | Descripción                              |
|--------------|---------------|------------------------------------------|
| `id`         | `uuid` PK     | Mismo ID de `auth.users`                 |
| `full_name`  | `text`        | Nombre completo (del formulario de registro) |
| `avatar_url` | `text` null   | URL en Supabase Storage                  |
| `role`       | `user_role`   | default `'client'` — la app móvil solo crea clientes |
| `created_at` | `timestamptz` | default now()                            |
| `updated_at` | `timestamptz` | default now()                            |

---

### `parking_lots`
El estacionamiento físico (puede haber varios en el futuro).

| Columna          | Tipo          | Descripción                          |
|------------------|---------------|--------------------------------------|
| `id`             | `uuid` PK     |                                      |
| `name`           | `text`        | Ej: "SmartPark Centro"               |
| `address`        | `text`        | Dirección completa                   |
| `latitude`       | `float8`      | Para el mapa de la app               |
| `longitude`      | `float8`      |                                      |
| `hourly_rate`    | `numeric(8,2)`| Tarifa por hora (ej: 25.00)          |
| `opening_time`   | `time`        | Ej: 07:00                            |
| `closing_time`   | `time`        | Ej: 22:00                            |
| `phone`          | `text` null   |                                      |
| `email`          | `text` null   |                                      |
| `total_spots`    | `int`         | Total de cajones (ej: 10)            |
| `services`       | `text[]`      | Ej: ['Seguridad 24/7','Cámaras','Techado'] |
| `created_at`     | `timestamptz` | default now()                        |

---

### `parking_spots`
Cajones individuales. **El ESP32 actualiza `status` en esta tabla.**

| Columna       | Tipo          | Descripción                                        |
|---------------|---------------|----------------------------------------------------|
| `id`          | `uuid` PK     |                                                    |
| `lot_id`      | `uuid` FK     | → `parking_lots.id`                                |
| `number`      | `int`         | Número del cajón (1-10)                            |
| `section`     | `text`        | Ej: "A", "B"                                       |
| `level`       | `int`         | Nivel del estacionamiento (1, 2, 3...)             |
| `status`      | `spot_status` | default `'available'` — **actualizado por ESP32**  |
| `updated_at`  | `timestamptz` | default now() — la app muestra "Actualizado hace X minutos" con este campo |

> La app usa **Supabase Realtime** para escuchar cambios en esta tabla.
> Cuando el ESP32 detecta un vehículo, actualiza `status` y la app se actualiza sola.

---

### `visit_history`
Historial de visitas del cliente. Pantalla "Historial" de la app.

| Columna        | Tipo          | Descripción                            |
|----------------|---------------|----------------------------------------|
| `id`           | `uuid` PK     |                                        |
| `user_id`      | `uuid` FK     | → `profiles.id`                        |
| `spot_id`      | `uuid` FK     | → `parking_spots.id`                   |
| `lot_id`       | `uuid` FK     | → `parking_lots.id` (desnormalizado para consultas rápidas) |
| `entry_time`   | `timestamptz` | Cuando entró el vehículo               |
| `exit_time`    | `timestamptz` null | Cuando salió (null si aún está activo) |
| `duration_min` | `int` null    | Minutos totales (calculado al salir)   |
| `total_cost`   | `numeric(8,2)` null | Costo total al salir              |
| `status`       | `visit_status`| default `'active'`                     |
| `created_at`   | `timestamptz` | default now()                          |

---

### `spot_events`
Log de todos los cambios de estado detectados por el ESP32. Para métricas de admin.

| Columna      | Tipo          | Descripción                        |
|--------------|---------------|------------------------------------|
| `id`         | `uuid` PK     |                                    |
| `spot_id`    | `uuid` FK     | → `parking_spots.id`               |
| `old_status` | `spot_status` |                                    |
| `new_status` | `spot_status` |                                    |
| `detected_at`| `timestamptz` | Cuándo lo detectó el ESP32         |
| `source`     | `text`        | 'esp32' o 'manual'                 |

---

## Row Level Security (RLS)

### `profiles`
```sql
-- Cualquier usuario autenticado puede ver perfiles
CREATE POLICY "Ver perfiles" ON profiles
  FOR SELECT USING (auth.role() = 'authenticated');

-- Solo el dueño edita su perfil
CREATE POLICY "Editar perfil propio" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### `parking_spots`
```sql
-- Todos los usuarios autenticados (y anónimos) pueden ver los cajones
-- La app permite "Continuar sin cuenta" — modo lectura
CREATE POLICY "Ver cajones" ON parking_spots
  FOR SELECT USING (true);
```

### `visit_history`
```sql
-- El cliente solo ve su propio historial
CREATE POLICY "Ver historial propio" ON visit_history
  FOR SELECT USING (auth.uid() = user_id);
```

---

## Trigger: crear perfil al registrarse

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url, role)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url',
    'client'  -- La app móvil siempre crea clientes
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## Trigger: actualizar `updated_at` en parking_spots

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_spot_updated_at
  BEFORE UPDATE ON parking_spots
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at();
```

---

## Cliente Supabase en la app

```ts
// services/supabase.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL!,
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
);
```

```ts
// services/spots.service.ts — ejemplo de suscripción realtime
export const spotsService = {
  // Obtener todos los cajones de un estacionamiento
  async getAll(lotId: string) {
    const { data, error } = await supabase
      .from('parking_spots')
      .select('*')
      .eq('lot_id', lotId)
      .order('number');
    if (error) throw error;
    return data;
  },

  // Suscripción realtime — ESP32 actualiza → UI reacciona
  subscribeToChanges(lotId: string, callback: (spot: ParkingSpot) => void) {
    return supabase
      .channel(`spots-${lotId}`)
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'parking_spots', filter: `lot_id=eq.${lotId}` },
        (payload) => callback(payload.new as ParkingSpot)
      )
      .subscribe();
  }
};
```

---

## Variables de entorno

Agregar al archivo `.env.local` (nunca subir al repositorio):

```env
EXPO_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Agregar al `.gitignore`:
```
.env.local
.env
```

---

## Métricas de calidad (del QA Plan)

Las siguientes consultas soportan las métricas definidas en el QA Plan:

```sql
-- Métrica 1: Tasa de utilización (70-90% óptimo)
SELECT
  COUNT(*) FILTER (WHERE status = 'occupied') AS occupied,
  COUNT(*) AS total,
  ROUND(COUNT(*) FILTER (WHERE status = 'occupied') * 100.0 / COUNT(*), 1) AS utilization_pct
FROM parking_spots WHERE lot_id = '<lot_id>';

-- Métrica 2: Precisión de sensores (ver tasa de eventos por hora)
SELECT DATE_TRUNC('hour', detected_at) AS hour, COUNT(*) AS events
FROM spot_events
GROUP BY hour ORDER BY hour DESC;
```

---

## Próximos pasos

- [ ] Crear proyecto en [supabase.com](https://supabase.com)
- [ ] Ejecutar SQL de enums, tablas y triggers en el SQL Editor
- [ ] Activar RLS en cada tabla y aplicar las políticas
- [ ] Insertar datos de prueba: 1 `parking_lot` + 10 `parking_spots`
- [ ] Generar tipos TypeScript: `npx supabase gen types typescript --project-id <id> > types/supabase.ts`
- [ ] Compartir variables de entorno con el equipo (nunca por GitHub)
- [ ] Habilitar Realtime en la tabla `parking_spots` desde el Dashboard de Supabase

