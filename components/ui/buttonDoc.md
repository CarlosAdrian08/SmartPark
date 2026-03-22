# Button Component

Componente de botón reutilizable para React Native (Expo) con múltiples variantes, soporte para iconos, imágenes, estado de carga y más.

Esta guía incluye:

- Documentación completa de todas las props
- Ejemplos para cada variante
- Casos de uso con iconos e imágenes
- Estados de carga y deshabilitado
- Ejemplos prácticos combinados
- Consideraciones de accesibilidad

## Instalación

Asegúrate de tener instalada la dependencia de iconos:

```bash
npx expo install @expo/vector-icons
```

## Uso Básico

```tsx
import Button from './components/Button';

// Botón simple
<Button title="Presionar" onPress={() => console.log('click')} />

// Botón primario (por defecto)
<Button
  title="Continuar"
  variant="primary"
  onPress={handleContinue}
/>
```

## Props

| Prop           | Tipo                                                           | Default       | Descripción                                      |
| -------------- | -------------------------------------------------------------- | ------------- | ------------------------------------------------ |
| `title`        | `string`                                                       | **Requerido** | Texto del botón                                  |
| `onPress`      | `(event: GestureResponderEvent) => void`                       | `undefined`   | Función a ejecutar al presionar                  |
| `variant`      | `'primary' \| 'secondary' \| 'outline' \| 'danger' \| 'ghost'` | `'primary'`   | Estilo visual del botón                          |
| `iconName`     | `string`                                                       | `undefined`   | Nombre del icono (MaterialIcons)                 |
| `iconPosition` | `'left' \| 'right'`                                            | `'left'`      | Posición del icono                               |
| `iconColor`    | `string`                                                       | `undefined`   | Color personalizado del icono                    |
| `iconSize`     | `number`                                                       | `18`          | Tamaño del icono                                 |
| `imageSource`  | `ImageSourcePropType`                                          | `undefined`   | Imagen para mostrar en lugar de icono            |
| `loading`      | `boolean`                                                      | `false`       | Muestra indicador de carga                       |
| `disabled`     | `boolean`                                                      | `false`       | Deshabilita el botón                             |
| `style`        | `StyleProp<ViewStyle>`                                         | `undefined`   | Estilos personalizados para el contenedor        |
| `textStyle`    | `StyleProp<TextStyle>`                                         | `undefined`   | Estilos personalizados para el texto             |
| `fullWidth`    | `boolean`                                                      | `false`       | Hace que el botón ocupe todo el ancho disponible |

## Variantes

> Es posible que tengas que agregar el prop `iconColor` en caso de querer personalizar el color del icono
>
> ```tsx
> <Button
>   title="Cerrar Sesión"
>   variant="danger"
>   iconName="logout"
>   iconColor="red"
> />
> ```

### Primary

Botón principal, color de acento.

```tsx
<Button title="Primary" variant="primary" onPress={() => {}} />
```

### Secondary

Botón secundario, color navy.

```tsx
<Button title="Secondary" variant="secondary" onPress={() => {}} />
```

### Outline

Botón con borde y fondo transparente.

```tsx
<Button title="Outline" variant="outline" onPress={() => {}} />
```

### Danger

Botón para acciones peligrosas o destructivas.

```tsx
<Button title="Eliminar" variant="danger" onPress={() => {}} />
```

### Ghost

Botón sin fondo ni borde, solo texto.

```tsx
<Button title="Ghost" variant="ghost" onPress={() => {}} />
```

## Iconos

Puedes agregar iconos de MaterialIcons usando la propiedad `iconName`:

```tsx
// Icono a la izquierda (por defecto)
<Button
  title="Iniciar"
  iconName="play-arrow"
  onPress={() => {}}
/>

// Icono a la derecha
<Button
  title="Siguiente"
  iconName="arrow-forward"
  iconPosition="right"
  onPress={() => {}}
/>

// Icono con colores personalizados
<Button
  title="Custom Icon"
  iconName="star"
  iconColor="#FFD700"
  iconSize={24}
  onPress={() => {}}
/>
```

## Imágenes

También puedes usar imágenes en lugar de iconos:

```tsx
<Button
  title="Login with Google"
  imageSource={require("./assets/google-icon.png")}
  variant="outline"
  onPress={handleGoogleLogin}
/>
```

## Estado de Carga

El botón muestra un indicador de actividad cuando `loading={true}`:

```tsx
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  setIsLoading(true);
  await someAsyncOperation();
  setIsLoading(false);
};

<Button title="Enviar" loading={isLoading} onPress={handleSubmit} />;
```

## Botón Deshabilitado

```tsx
<Button title="Deshabilitado" disabled={true} onPress={() => {}} />
```

## Ancho Completo

El botón ocupa todo el ancho disponible cuando `fullWidth={true}`:

```tsx
<Button title="Botón Ancho" fullWidth={true} onPress={() => {}} />
```

## Estilos Personalizados

Puedes sobrescribir los estilos usando `style` y `textStyle`:

```tsx
<Button
  title="Custom Style"
  style={{ borderRadius: 25, paddingVertical: 16 }}
  textStyle={{ fontSize: 18, fontWeight: "bold" }}
  onPress={() => {}}
/>
```

## Ejemplos Combinados

### Botón de inicio de sesión con icono y carga

```tsx
const LoginButton = ({ isLoading, onPress }) => (
  <Button
    title="Iniciar Sesión"
    variant="primary"
    iconName="login"
    iconPosition="right"
    loading={isLoading}
    fullWidth
    onPress={onPress}
  />
);
```

### Botón de navegación con icono

```tsx
<Button
  title="Ver Detalles"
  variant="outline"
  iconName="info"
  iconColor="#007AFF"
  onPress={() => navigation.navigate("Details")}
/>
```

### Grupo de botones en fila

```tsx
<View style={{ flexDirection: "row", gap: 12 }}>
  <Button title="Cancelar" variant="ghost" onPress={handleCancel} />
  <Button title="Aceptar" variant="primary" onPress={handleAccept} />
</View>
```

## Accesibilidad

El componente incluye `accessibilityRole="button"` para mejorar la accesibilidad en dispositivos móviles.

## Notas

- Los iconos utilizan `MaterialIcons` de `@expo/vector-icons`
- El componente maneja automáticamente los colores de los iconos según la variante
- Cuando `loading={true}`, el botón se deshabilita automáticamente
- El tamaño mínimo del botón es de 48px (altura) para cumplir con las pautas de accesibilidad
