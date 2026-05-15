# Arquitectura — SmartPark Mobile (App Cliente)

> Sistema IoT de monitoreo de estacionamiento inteligente  
> Stack: Expo React Native · Supabase · ESP32  
> Equipo: Los Yucas — Instituto Tecnológico Superior de Valladolid

---

## Visión general del sistema

SmartPark es un sistema de tres capas que trabajan en conjunto:

```
[ESP32 + Sensores]  ──MQTT/HTTP──▶  [API REST Laravel]  ──▶  [Supabase (PostgreSQL)]
                                                                      │
                                          ┌───────────────────────────┤
                                          │                           │
                                    [App Móvil]               [Panel Web Admin]
                                   (clientes)               (admin + empleados)
```

Este repositorio contiene **únicamente la App Móvil** para clientes.

---

## Pantallas definidas (Figma)

| Pantalla               | Archivo de ruta                      | Integrante |
|------------------------|--------------------------------------|------------|
| Login                  | `app/(auth)/login.tsx`               | #1         |
| Registro               | `app/(auth)/register.tsx`            | #1         |
| Recuperar contraseña   | `app/(auth)/forgot-password.tsx`     | #1         |
| Home (mapa de spots)   | `app/(tabs)/index.tsx`               | #2         |
| Detalle del sitio      | `app/spot/[id].tsx`                  | #2         |
| Mapa de estacionamiento| `app/(tabs)/map.tsx`                 | #3         |
| Información del parque | `app/(tabs)/info.tsx`                | #4         |
| Historial de visitas   | `app/(tabs)/history.tsx`             | #5         |
| Perfil de usuario      | `app/(tabs)/profile.tsx`             | #6         |

---

## Estructura de carpetas

```
/
├── app/                              # Rutas (Expo Router)
│   ├── (auth)/                       # Pantallas sin sesión
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   ├── (tabs)/                       # Navegación principal (bottom tabs)
│   │   ├── _layout.tsx               # Tab bar: Inicio, Mapa, Información, Historial, Perfil
│   │   ├── index.tsx                 # Home — mapa de spots (grid 2 columnas)
│   │   ├── map.tsx                   # Mapa de estacionamiento (geolocalización)
│   │   ├── info.tsx                  # Información del estacionamiento
│   │   ├── history.tsx               # Historial de visitas del usuario
│   │   └── profile.tsx               # Perfil y configuración
│   ├── spot/
│   │   └── [id].tsx                  # Detalle de un cajón específico
│   └── _layout.tsx                   # Root layout (providers, auth guard)
│
├── components/
│   ├── ui/                           # Átomos: Button, Input, Badge, Avatar, Tag
│   ├── layout/                       # Card, Section, ScreenWrapper
│   ├── parking/                      # SpotCard, SpotGrid, SpotStatus, SpotDetail
│   └── shared/                       # TabBar, Header, LoadingSpinner, EmptyState
│
├── hooks/
│   ├── useAuth.ts                    # Login, registro, logout, sesión activa
│   ├── useSpots.ts                   # Cajones en tiempo real (Supabase Realtime)
│   ├── useParking.ts                 # Info del estacionamiento
│   └── useHistory.ts                 # Historial de visitas del usuario
│
├── store/
│   ├── auth.store.ts                 # Usuario autenticado, token
│   └── parking.store.ts              # Estado global de cajones
│
├── services/
│   ├── supabase.ts                   # Cliente Supabase (singleton)
│   ├── auth.service.ts               # signIn, signUp, signOut, resetPassword
│   ├── spots.service.ts              # getSpots, getSpotById, subscribeToSpots
│   └── history.service.ts            # getHistory por usuario
│
├── types/
│   ├── supabase.ts                   # Tipos generados por Supabase CLI
│   ├── spot.types.ts                 # Spot, SpotStatus
│   └── user.types.ts                 # Profile, UserRole
│
├── constants/
│   ├── Colors.ts                     # Teal #0F6E56, Navy #1B2A4A (colores del diseño)
│   └── Routes.ts
│
└── utils/
    ├── date.ts                       # Formatear fechas del historial
    ├── duration.ts                   # Calcular duración de visitas (Xh Ym)
    └── validators.ts                 # Validaciones de formularios auth
```

---

## Capas y responsabilidades

### Regla de oro
```
Pantalla  ──llama──▶  Hook  ──llama──▶  Service  ──llama──▶  Supabase
```
Ninguna capa salta a otra que no le corresponde.

### `app/` — Pantallas
- Solo orquestan: importan hooks, renderizan componentes.
- No hacen fetch directo ni tienen lógica de negocio.

### `components/parking/` — Componentes de dominio SmartPark
- `SpotCard` — cajón individual con color verde/rojo según estado.
- `SpotGrid` — grid 2×5 del mapa de cajones.
- `SpotStatus` — badge de estado (Libre / Ocupado).
- `SpotDetail` — vista de detalle con ubicación y tarifa.

### `hooks/useSpots.ts` — Tiempo real
- Se suscribe a cambios en la tabla `parking_spots` via **Supabase Realtime**.
- Cuando el ESP32 actualiza un cajón, el hook propaga el cambio sin recargar pantalla.

### `services/` — Acceso a datos
- Toda lógica de Supabase vive aquí.
- Nunca importan componentes ni el store.

---

## Stack tecnológico

| Categoría       | Librería / Servicio               |
|-----------------|-----------------------------------|
| Framework       | Expo SDK 51 + Expo Router v3      |
| UI base         | React Native + NativeWind         |
| Mapa            | `react-native-maps`               |
| Estado global   | Zustand                           |
| Formularios     | react-hook-form + zod             |
| Backend/DB      | Supabase (Auth + DB + Realtime)   |
| API REST        | Laravel (consumo via `services/`) |
| Tipado          | TypeScript strict                 |
| Linting         | ESLint + Prettier                 |

---

## Asignación por integrante

| Integrante                     | Rol QA Plan     | Módulo app móvil                             |
|--------------------------------|-----------------|----------------------------------------------|
| Carlos Adrian Noh Caamal       | Responsable QA  | Autenticación (login, registro, recovery)    |
| Felipe Santiago Pool Tamay     | Líder / Dev     | Home — mapa de cajones + detalle de spot     |
| Jesus Aldair Cupul Ramirez     | Documentación   | Pantalla de información del estacionamiento  |
| Jhonatan Edgar Pamplona Hoil   | Tester          | Historial de visitas                         |
| Ruben Omar Canul Noh           | Tester          | Mapa (react-native-maps)                     |
| Cristian Gaspar Euan Cupul     | Dev             | Perfil + componentes UI base                 |

---

## Colores del sistema (del diseño Figma)

```ts
// constants/Colors.ts
export const Colors = {
  primary:    '#0F6E56',   // Teal principal (botones, tabs activos, badges)
  primaryDark:'#085041',   // Teal oscuro (hover, pressed)
  navy:       '#1B2A4A',   // Azul marino (botón Iniciar Sesión)
  available:  '#22C55E',   // Verde — cajón libre
  occupied:   '#EF4444',   // Rojo — cajón ocupado
  background: '#F5F7FA',   // Fondo general
  surface:    '#FFFFFF',   // Cards y modales
  textPrimary:'#111827',
  textMuted:  '#6B7280',
};
```

