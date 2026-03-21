# Guía de contribución — SmartPark Mobile

> Convenciones de Git, código y PR para el equipo Los Yucas.

---

## Ramas

### Estructura

```
main          ←  Producción / entregas finales al profesor
  └── develop ←  Integración continua entre sprints
        ├── carlos     ← Autenticación
        ├── felipe     ← Home + Detalle spot
        ├── aldair     ← Pantalla información
        ├── jhonatan   ← Historial
        ├── ruben      ← Mapa
        └── cristian   ← Perfil + UI base
```

### Flujo por sprint (cada 2 semanas)

```
1. Trabajas en tu rama: <tu-nombre>
2. Al terminar una funcionalidad → abres Pull Request hacia develop
3. Otro integrante revisa y aprueba
4. Al final del sprint → develop se fusiona a main
```

**Regla importante:** Nunca hagas push directo a `develop` ni a `main`.

---

## Commits

Formato: `<tipo>(<scope>): <descripción en español>`

### Tipos

| Tipo       | Cuándo usarlo                              |
|------------|--------------------------------------------|
| `feat`     | Nueva funcionalidad o pantalla             |
| `fix`      | Corrección de bug                          |
| `style`    | Cambios de UI/CSS sin lógica               |
| `refactor` | Refactor sin cambiar comportamiento        |
| `docs`     | Cambios en documentación                   |
| `chore`    | Dependencias, configuración, scripts       |
| `test`     | Pruebas unitarias o de integración         |

### Scopes del proyecto SmartPark

`auth` · `home` · `map` · `spot` · `info` · `history` · `profile` · `ui` · `store` · `services` · `supabase`

### Ejemplos reales del proyecto

```bash
feat(auth): agregar pantalla de login con validación de formulario
feat(home): implementar grid de cajones con estados libre/ocupado
fix(spot): corregir color de badge cuando cajón cambia de estado
feat(map): integrar react-native-maps con marcador del estacionamiento
feat(history): mostrar duración calculada por visita
style(profile): ajustar avatar circular y sección de configuración
feat(services): agregar suscripción realtime a parking_spots
chore: instalar react-native-maps y configurar permisos iOS/Android
```

---

## Código TypeScript

### Tipos — nunca usar `any`

```ts
// Bien
interface ParkingSpot {
  id: string;
  number: number;
  status: 'available' | 'occupied';
  section: string;
  level: number;
  hourly_rate: number;
}

// Mal
const spot: any = { ... }
```

### Componentes — un archivo, props tipadas

```tsx
// components/parking/SpotCard.tsx
interface SpotCardProps {
  spot: ParkingSpot;
  onPress: (id: string) => void;
}

export function SpotCard({ spot, onPress }: SpotCardProps) {
  const isAvailable = spot.status === 'available';

  return (
    <Pressable onPress={() => onPress(spot.id)}>
      {/* ... */}
    </Pressable>
  );
}
```

### Hook — useSpots (tiempo real)

```ts
// hooks/useSpots.ts
export function useSpots() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);

  useEffect(() => {
    // Carga inicial
    spotsService.getAll().then(setSpots);

    // Suscripción realtime (ESP32 actualiza → UI cambia automáticamente)
    const channel = supabase
      .channel('parking_spots')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'parking_spots' },
        (payload) => {
          // Actualizar el spot que cambió sin recargar toda la lista
          setSpots(prev => prev.map(s =>
            s.id === payload.new.id ? payload.new as ParkingSpot : s
          ));
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return { spots };
}
```

### Imports — orden y alias `@/`

```ts
// 1. React y librerías externas
import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';

// 2. Componentes propios
import { SpotCard } from '@/components/parking/SpotCard';
import { Button } from '@/components/ui/Button';

// 3. Hooks y servicios
import { useSpots } from '@/hooks/useSpots';

// 4. Tipos y constantes
import type { ParkingSpot } from '@/types/spot.types';
import { Colors } from '@/constants/Colors';
```

---

## Pull Requests

### Checklist antes de abrir un PR

- [ ] La app compila sin errores (`npx expo start`)
- [ ] No hay `console.log` olvidados
- [ ] Todos los props están tipados (sin `any`)
- [ ] El componente o pantalla sigue el diseño de Figma
- [ ] Si es pantalla nueva: incluir screenshot en la descripción del PR
- [ ] Si toca Supabase: probar que los datos cargan correctamente

### Título del PR

```
feat(home): mapa de cajones con estado en tiempo real
fix(auth): validación de correo en formulario de registro
```

### Revisión de código (para quien revisa)

1. ¿Sigue el diseño de Figma?
2. ¿Los tipos son correctos?
3. ¿Los nombres de variables/funciones son claros?
4. ¿Compilas y corre sin errores en tu máquina?

---

## Comandos frecuentes

```bash
# Iniciar el proyecto
npx expo start

# Ver tu rama actual
git branch

# Traer últimos cambios de develop a tu rama (hacer esto frecuente)
git pull origin develop

# Subir tu rama
git add .
git commit -m "feat(home): agregar grid de cajones"
git push origin tu-nombre

# Ver diferencias antes de commitear
git diff
```

---

## Etiquetas para GitHub Issues (errores)

Según el QA Plan del equipo, cada Issue debe tener:

| Label          | Cuándo usarla                           |
|----------------|-----------------------------------------|
| `bug`          | Comportamiento incorrecto               |
| `prioridad-alta` | Bloquea el funcionamiento principal   |
| `frontend`     | Error en la app móvil                   |
| `backend`      | Error en la API o Supabase              |
| `iot`          | Error en la comunicación con ESP32      |
| `ui`           | Error visual/diseño                     |
