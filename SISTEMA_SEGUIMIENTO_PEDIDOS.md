# 📦 Sistema de Seguimiento de Pedidos - SPORTA

## 🎯 Descripción General

Sistema completo de seguimiento de pedidos con dos modalidades de entrega: **Delivery a domicilio** y **Recojo en tienda**. Incluye interfaz visual moderna con iconos profesionales, animaciones y diseño responsive.

---

## 🚀 Componentes Implementados

### 1️⃣ **DeliveryTypeSelector** (`frontend/src/components/DeliveryTypeSelector.jsx`)

Selector visual para elegir el tipo de entrega en el checkout.

#### Características:
- ✅ Diseño de tarjetas interactivas con hover effects
- ✅ Iconos profesionales de Lucide React (Truck, Store)
- ✅ Animaciones suaves con CSS transitions
- ✅ Indicador visual de selección (checkmark animado)
- ✅ Información detallada de cada opción
- ✅ Responsive (grid en desktop, stack en móvil)

#### Opciones:

**Delivery a Domicilio:**
- 🚚 Entrega en 2-3 días hábiles
- 📦 Envío gratis en compras mayores a S/ 150
- 📍 Seguimiento en tiempo real

**Recojo en Tienda:**
- ⏱️ Listo en 24-48 horas
- 💰 Sin costo de envío
- 🏪 Horario: Lun-Sáb 10:00 AM - 8:00 PM

#### Uso:
```jsx
import DeliveryTypeSelector from '../components/DeliveryTypeSelector'

<DeliveryTypeSelector 
  selectedType={deliveryType}  // 'delivery' o 'pickup'
  onTypeChange={setDeliveryType} 
/>
```

---

### 2️⃣ **OrderTracking** (`frontend/src/components/OrderTracking.jsx`)

Componente de seguimiento visual del estado del pedido con barra de progreso animada.

#### Características:
- ✅ Timeline horizontal con 4 etapas
- ✅ Barra de progreso animada con gradiente
- ✅ Iconos profesionales que cambian según el tipo de entrega
- ✅ Animaciones de pulso en la etapa activa
- ✅ Estados: pendiente, activo, completado
- ✅ Información contextual según el tipo de entrega
- ✅ Responsive (horizontal en desktop, vertical en móvil)

#### Etapas para Delivery:

| Etapa | Icono | Título | Descripción |
|-------|-------|--------|-------------|
| 1 | 📦 Package | Pedido Recibido | Tu pedido ha sido confirmado |
| 2 | ⏰ Clock | En Preparación | Estamos preparando tu pedido |
| 3 | 🚚 Truck | En Camino | Tu pedido está en ruta |
| 4 | ✅ CheckCircle | Entregado | Pedido entregado exitosamente |

#### Etapas para Recojo en Tienda:

| Etapa | Icono | Título | Descripción |
|-------|-------|--------|-------------|
| 1 | 📦 Package | Pedido Recibido | Tu pedido ha sido confirmado |
| 2 | ⏰ Clock | En Preparación | Preparando tu pedido |
| 3 | ✔️ PackageCheck | Listo para Recoger | Tu pedido está listo |
| 4 | ✅ CheckCircle | Recogido | Pedido retirado de tienda |

#### Uso:
```jsx
import OrderTracking from '../components/OrderTracking'

<OrderTracking 
  deliveryType="delivery"  // 'delivery' o 'pickup'
  currentStage={2}         // 1, 2, 3, o 4
/>
```

---

### 3️⃣ **OrderTrackingPage** (`frontend/src/pages/OrderTrackingPage.jsx`)

Página independiente para que los clientes rastreen sus pedidos.

#### Características:
- ✅ Buscador de pedidos por número o comprobante
- ✅ Controles de demostración para testing
- ✅ Integración con OrderTracking component
- ✅ Diseño consistente con el resto de la app

#### Uso:
```jsx
import OrderTrackingPage from './pages/OrderTrackingPage'

<OrderTrackingPage onBack={() => navigate('/')} />
```

---

### 4️⃣ **Checkout Actualizado** (`frontend/src/pages/Checkout.jsx`)

Checkout mejorado con selección de tipo de entrega y tracking integrado.

#### Cambios Implementados:

1. **Nuevo estado:**
   ```javascript
   const [deliveryType, setDeliveryType] = useState('delivery')
   const [savedDeliveryType, setSavedDeliveryType] = useState('delivery')
   ```

2. **Selector de tipo de entrega:**
   - Se muestra al inicio del checkout
   - Ocupa todo el ancho (gridColumn: '1 / -1')

3. **Campos condicionales:**
   - **Delivery:** Muestra dirección, distrito, referencia, notas
   - **Pickup:** Solo muestra nombre, email, teléfono + info de tienda

4. **Validación adaptativa:**
   ```javascript
   if (deliveryType === 'delivery') {
     if (!customerInfo.address.trim()) e.address = 'La dirección es requerida'
     if (!customerInfo.district) e.district = 'Selecciona un distrito'
   }
   ```

5. **Datos enviados al backend:**
   ```javascript
   const orderData = {
     // ... otros campos
     address: deliveryType === 'delivery' ? customerInfo.address : 'Recojo en tienda',
     district: deliveryType === 'delivery' ? customerInfo.district : 'Tienda SPORTA',
     delivery_type: deliveryType, // NUEVO CAMPO
   }
   ```

6. **Pantalla de éxito mejorada:**
   - Muestra información según el tipo de entrega
   - Incluye componente OrderTracking
   - Tracking inicia en etapa 2 (En Preparación)

---

## 🎨 Diseño y Estilo

### Paleta de Colores:
- **Primario:** `#FF4500` (Naranja SPORTA)
- **Secundario:** `#ff6a35` (Naranja claro)
- **Fondo:** `#080808` (Negro profundo)
- **Superficie:** `#111111` (Gris oscuro)
- **Texto:** `rgba(255,255,255,0.85)` (Blanco semi-transparente)
- **Éxito:** `#4ade80` (Verde)

### Tipografía:
- **Display:** `'Bebas Neue'` (Títulos)
- **Body:** `'DM Sans'` (Texto general)

### Animaciones:
```css
/* Pulso en etapa activa */
@keyframes pulse-stage {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Anillo de pulso */
@keyframes pulse-ring {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0; }
}
```

---

## 📱 Responsive Design

### Desktop (> 768px):
- Timeline horizontal
- Grid de 2 columnas para selector
- Iconos grandes (64px)

### Mobile (≤ 768px):
- Timeline vertical
- Selector en 1 columna
- Iconos medianos (56px)
- Formulario adaptado

---

## 🔧 Integración con Backend

### Nuevo campo en la base de datos:

Agregar columna `delivery_type` a la tabla `orders`:

```sql
ALTER TABLE orders 
ADD COLUMN delivery_type VARCHAR(10) DEFAULT 'delivery' 
CHECK (delivery_type IN ('delivery', 'pickup'));
```

### Actualizar el endpoint de órdenes:

```javascript
// backend/src/routes/orders.js
router.post('/', authenticate, async (req, res) => {
  const {
    name, email, phone, address, district,
    reference, delivery_notes, delivery_type, // NUEVO
    payment_method, items
  } = req.body

  // Validación condicional
  if (delivery_type === 'delivery') {
    if (!address || !district) {
      return res.status(400).json({ 
        error: 'Dirección y distrito son requeridos para delivery' 
      })
    }
  }

  // Guardar en la BD
  const { data: order, error } = await supabase
    .from('orders')
    .insert({
      user_id: req.user.id,
      name, email, phone, address, district,
      reference, delivery_notes,
      delivery_type, // NUEVO CAMPO
      payment_method,
      subtotal, shipping, total, status
    })
    .select().single()

  // ... resto del código
})
```

---

## 🧪 Testing

### Probar el Selector:
1. Ir al checkout
2. Hacer clic en "Delivery a Domicilio"
3. Verificar que aparecen campos de dirección
4. Hacer clic en "Recojo en Tienda"
5. Verificar que desaparecen campos de dirección
6. Verificar que aparece info de la tienda

### Probar el Tracking:
1. Completar una compra
2. Verificar que aparece el tracking en la pantalla de éxito
3. Verificar que muestra las etapas correctas según el tipo
4. Verificar animaciones (pulso, barra de progreso)

### Probar la Página de Tracking:
1. Ir a `/tracking` (si está configurada la ruta)
2. Usar los controles de demostración
3. Cambiar entre delivery y pickup
4. Cambiar entre etapas 1-4
5. Verificar responsive en móvil

---

## 🚀 Próximas Mejoras

### Funcionalidades Sugeridas:

1. **API de Tracking Real:**
   ```javascript
   // Endpoint para obtener estado del pedido
   GET /api/orders/:id/tracking
   
   // Respuesta:
   {
     orderId: 123,
     deliveryType: 'delivery',
     currentStage: 2,
     stages: [
       { id: 1, completed: true, timestamp: '2024-05-21 20:01' },
       { id: 2, completed: false, timestamp: null },
       // ...
     ],
     estimatedDelivery: '2024-05-24'
   }
   ```

2. **Notificaciones en Tiempo Real:**
   - WebSockets para actualizaciones en vivo
   - Push notifications cuando cambia el estado
   - Email automático en cada etapa

3. **Mapa de Seguimiento:**
   - Integración con Google Maps API
   - Mostrar ubicación del repartidor en tiempo real
   - Ruta estimada de entrega

4. **Código QR:**
   - Generar QR para recojo en tienda
   - Escanear en tienda para confirmar entrega
   - Validación de identidad

5. **Historial de Pedidos:**
   - Página con todos los pedidos del usuario
   - Filtros por estado, fecha, tipo
   - Reordenar pedidos anteriores

6. **Calificación de Servicio:**
   - Permitir calificar la entrega
   - Comentarios sobre el servicio
   - Sistema de recompensas

---

## 📚 Documentación de Componentes

### Props de DeliveryTypeSelector:

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `selectedType` | `'delivery' \| 'pickup'` | ✅ | Tipo de entrega seleccionado |
| `onTypeChange` | `(type: string) => void` | ✅ | Callback al cambiar selección |

### Props de OrderTracking:

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `deliveryType` | `'delivery' \| 'pickup'` | ❌ | `'delivery'` | Tipo de entrega |
| `currentStage` | `1 \| 2 \| 3 \| 4` | ❌ | `1` | Etapa actual del pedido |

### Props de OrderTrackingPage:

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `onBack` | `() => void` | ❌ | Callback para botón de volver |

---

## 🎯 Beneficios del Sistema

### Para el Cliente:
- ✅ Transparencia total del proceso
- ✅ Reducción de ansiedad por el pedido
- ✅ Flexibilidad en el método de entrega
- ✅ Experiencia visual atractiva
- ✅ Información clara y accesible

### Para el Negocio:
- ✅ Reducción de consultas de "¿dónde está mi pedido?"
- ✅ Mayor confianza del cliente
- ✅ Diferenciación competitiva
- ✅ Datos para optimizar logística
- ✅ Mejor experiencia de usuario = más ventas

---

## 📞 Soporte

Para dudas o problemas con el sistema de seguimiento:
- 📧 Email: adminSporta@depor.pe
- 📱 WhatsApp: +51 925 841 052
- 🏪 Tienda: Av. Principal 123, Miraflores, Lima

---

**Desarrollado con ❤️ para SPORTA**
*Sistema de Seguimiento de Pedidos v1.0*
