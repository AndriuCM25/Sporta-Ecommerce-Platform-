# ⚡ Sistema de Ofertas Flash - Estilo Temu/Shein

## 🎯 Descripción

Sistema completo de ofertas relámpago con **animaciones llamativas**, **contador regresivo**, **barras de progreso** y **efectos visuales impactantes** inspirado en Temu, Shein y AliExpress.

---

## 🎨 Componentes Creados

### 1️⃣ **FlashSaleBanner** - Banner Principal con Contador
📁 `frontend/src/components/FlashSaleBanner.jsx`

#### Características Visuales:
- ✅ **Gradiente animado** que se mueve constantemente
- ✅ **Rayas diagonales** en movimiento de fondo
- ✅ **Badge pulsante** "OFERTA RELÁMPAGO"
- ✅ **Título con bounce** "¡GRAN DESCUENTO!"
- ✅ **Descuento gigante** con animación de pop
- ✅ **Contador regresivo** con cajas brillantes
- ✅ **Sparkles flotantes** decorativos
- ✅ **Iconos animados** (llama parpadeante, rayo)

#### Animaciones Implementadas:

**1. Gradiente en Movimiento:**
```css
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**2. Rayas Diagonales:**
```css
@keyframes stripeMove {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, 50px); }
}
```

**3. Título Bounce:**
```css
@keyframes titleBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
```

**4. Descuento Pop:**
```css
@keyframes discountPop {
  0% { transform: scale(1) rotate(-2deg); }
  100% { transform: scale(1.1) rotate(2deg); }
}
```

**5. Shimmer en Cajas:**
```css
@keyframes shimmer {
  0% { left: -100%; }
  100% { left: 100%; }
}
```

**6. Separadores Parpadeantes:**
```css
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3%; }
}
```

**7. Sparkles Flotantes:**
```css
@keyframes sparkleFloat {
  0%, 100% {
    transform: translateY(0) scale(0);
    opacity: 0;
  }
  50% {
    transform: translateY(-30px) scale(1);
    opacity: 1;
  }
}
```

#### Props:

| Prop | Tipo | Requerido | Default | Descripción |
|------|------|-----------|---------|-------------|
| `endTime` | `string` | ✅ | - | Fecha/hora de fin (ISO string) |
| `discount` | `number` | ❌ | `50` | Porcentaje de descuento |

#### Uso:
```jsx
import FlashSaleBanner from '../components/FlashSaleBanner'

// Oferta que termina en 24 horas
const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

<FlashSaleBanner endTime={endTime} discount={50} />
```

---

### 2️⃣ **DealProductCard** - Tarjeta de Producto en Oferta
📁 `frontend/src/components/DealProductCard.jsx`

#### Características Visuales:
- ✅ **Borde brillante animado** en la parte superior
- ✅ **Badge de descuento** con pulso
- ✅ **Badge "¡SE AGOTA!"** cuando quedan pocas unidades
- ✅ **Botones de acción** (corazón, ojo) al hacer hover
- ✅ **Barra de progreso** de ventas con brillo
- ✅ **Precios comparativos** (antes/después)
- ✅ **Badge de ahorro** en verde
- ✅ **Botón CTA** con efecto de onda
- ✅ **Imagen con zoom** al hover

#### Animaciones Implementadas:

**1. Borde Brillante:**
```css
@keyframes borderGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

**2. Badge de Descuento:**
```css
@keyframes badgePulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}
```

**3. Badge "Se Agota":**
```css
@keyframes hotBadgeShake {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
```

**4. Barra de Progreso:**
```css
@keyframes progressShine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
```

**5. Botón CTA (Onda):**
```css
.deal-cta::before {
  /* Círculo que se expande al hover */
  width: 0 → 300px;
  height: 0 → 300px;
}
```

#### Props:

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `product` | `object` | ✅ | Datos del producto |
| `onAddToCart` | `function` | ✅ | Callback al agregar al carrito |
| `onViewDetail` | `function` | ✅ | Callback al ver detalles |
| `user` | `object` | ❌ | Usuario actual |
| `onShowAuth` | `function` | ❌ | Mostrar login si no autenticado |

#### Estructura del Producto:
```javascript
{
  id: 1,
  name: 'Nike Air Max 270',
  category: 'Running',
  price: 450,              // Precio original
  discountPrice: 225,      // Precio con descuento
  discount: 50,            // Porcentaje de descuento
  image: '/shoe1.jpg',
  stock: 100,              // Stock total
  sold: 75                 // Unidades vendidas
}
```

---

### 3️⃣ **FlashDeals** - Página Completa de Ofertas
📁 `frontend/src/pages/FlashDeals.jsx`

#### Características:
- ✅ **Título con gradiente animado**
- ✅ **Banner de oferta flash**
- ✅ **Tarjetas de estadísticas** (productos, descuento, tiempo)
- ✅ **Filtros por categoría** con botones activos
- ✅ **Ordenamiento** (descuento, precio, popularidad)
- ✅ **Toggle de vista** (grid/lista)
- ✅ **Grid responsive** de productos
- ✅ **Estado vacío** cuando no hay resultados

#### Secciones:

**1. Header:**
- Título con gradiente animado
- Subtítulo descriptivo

**2. Banner Flash:**
- Componente FlashSaleBanner
- Contador regresivo
- Descuento destacado

**3. Estadísticas:**
- Número de productos
- Descuento máximo
- Tiempo restante

**4. Controles:**
- Filtros por categoría
- Ordenamiento
- Vista (grid/lista)

**5. Grid de Productos:**
- Tarjetas DealProductCard
- Responsive (1-4 columnas)
- Animación de entrada

#### Uso:
```jsx
import FlashDeals from './pages/FlashDeals'

<FlashDeals
  onAddToCart={handleAddToCart}
  onViewDetail={handleViewDetail}
  user={currentUser}
  onShowAuth={showAuthModal}
/>
```

---

## 🎨 Paleta de Colores

### Colores Principales:
```css
--orange-primary: #FF4500    /* Naranja SPORTA */
--orange-light: #ff6a35      /* Naranja claro */
--green-success: #4ade80     /* Verde para ahorros */
--bg-dark: #080808           /* Fondo oscuro */
--surface: #111              /* Superficie */
```

### Gradientes:
```css
/* Banner principal */
background: linear-gradient(135deg, #FF4500 0%, #ff6a35 50%, #FF4500 100%);

/* Botones CTA */
background: linear-gradient(135deg, #FF4500, #ff6a35);

/* Barra de progreso */
background: linear-gradient(90deg, #FF4500, #ff6a35);
```

---

## 🎯 Efectos Visuales Destacados

### 1. **Urgencia Visual:**
- ⏰ Contador regresivo parpadeante
- 🔥 Badge "¡SE AGOTA!" cuando quedan pocas unidades
- 📊 Barra de progreso mostrando % vendido
- ⚡ Animaciones constantes

### 2. **Llamadas a la Acción:**
- 💥 Descuento gigante con animación
- 🎯 Botones con efectos de hover
- 💰 Ahorro destacado en verde
- 🛒 CTA con efecto de onda

### 3. **Movimiento Constante:**
- 🌊 Gradientes en movimiento
- ✨ Sparkles flotantes
- 💫 Shimmer en elementos
- 🔄 Rotaciones y escalas

### 4. **Feedback Visual:**
- ❤️ Corazón que se llena al dar like
- 👁️ Botones que aparecen al hover
- 📈 Barra de progreso animada
- ✅ Estados activos destacados

---

## 📱 Responsive Design

### Desktop (> 1200px):
- Grid de 4 columnas
- Banner completo horizontal
- Todos los controles visibles

### Tablet (768px - 1200px):
- Grid de 2-3 columnas
- Banner adaptado
- Controles en 2 filas

### Móvil (< 768px):
- Grid de 1 columna
- Banner vertical
- Controles apilados
- Botones de ancho completo

---

## 🚀 Integración en el Proyecto

### Paso 1: Agregar Ruta

En `App.jsx`:

```jsx
import FlashDeals from './pages/FlashDeals'

// En el router
<Route path="/ofertas" element={
  <FlashDeals
    onAddToCart={addToCart}
    onViewDetail={viewProductDetail}
    user={user}
    onShowAuth={() => setShowAuth(true)}
  />
} />
```

### Paso 2: Agregar Link en Navbar

En `Navbar.jsx`:

```jsx
<Link to="/ofertas" className="nav-link">
  <Zap size={18} />
  <span>Ofertas Flash</span>
</Link>
```

### Paso 3: Agregar Banner en Home

En `Home.jsx`:

```jsx
import FlashSaleBanner from '../components/FlashSaleBanner'

// Dentro del componente
const flashEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

<FlashSaleBanner endTime={flashEndTime} discount={50} />
```

---

## 🎮 Funcionalidades Interactivas

### 1. **Contador Regresivo:**
- Actualización cada segundo
- Formato HH:MM:SS
- Desaparece cuando expira
- Animación de parpadeo en separadores

### 2. **Barra de Progreso:**
- Muestra % de unidades vendidas
- Animación de llenado suave
- Efecto shimmer constante
- Cambia color según urgencia

### 3. **Filtros y Ordenamiento:**
- Filtro por categoría (instantáneo)
- Ordenar por:
  - Mayor descuento
  - Menor precio
  - Más popular (% vendido)
- Toggle vista grid/lista

### 4. **Botones de Acción:**
- ❤️ Like (guarda en wishlist)
- 👁️ Ver detalles (modal/página)
- 🛒 Agregar al carrito

---

## 💡 Mejoras Futuras Sugeridas

### 1. **Notificaciones Push:**
```javascript
// Notificar cuando quedan 1 hora
if (timeLeft.hours === 1 && timeLeft.minutes === 0) {
  showNotification('¡Solo queda 1 hora de oferta!')
}
```

### 2. **Sonidos:**
```javascript
// Sonido de tick-tock en últimos 10 segundos
if (timeLeft.seconds <= 10) {
  playTickSound()
}
```

### 3. **Confeti al Agregar:**
```javascript
// Confeti cuando agregas al carrito
onAddToCart={() => {
  addToCart(product)
  showConfetti()
}}
```

### 4. **Stock en Tiempo Real:**
```javascript
// WebSocket para actualizar stock
socket.on('stockUpdate', (productId, newStock) => {
  updateProductStock(productId, newStock)
})
```

### 5. **Ofertas Personalizadas:**
```javascript
// Basado en historial del usuario
const personalizedDeals = getDealsForUser(user.id)
```

### 6. **Compartir Oferta:**
```javascript
// Botón para compartir en redes
<ShareButton
  url={`/ofertas/${product.id}`}
  text={`¡${product.discount}% OFF en ${product.name}!`}
/>
```

---

## 📊 Métricas de Éxito

### KPIs a Medir:

1. **Tasa de Conversión:**
   - % de visitantes que compran
   - Comparar con páginas normales

2. **Tiempo en Página:**
   - Cuánto tiempo pasan en ofertas
   - Engagement con el contador

3. **Productos Más Vendidos:**
   - Qué ofertas funcionan mejor
   - Optimizar futuras ofertas

4. **Abandono de Carrito:**
   - % que agregan pero no compran
   - Implementar recuperación

5. **Compartidos Sociales:**
   - Cuántas veces se comparte
   - Alcance viral

---

## 🎯 Psicología de Ventas Aplicada

### Técnicas Implementadas:

1. **Escasez:**
   - "Solo quedan X unidades"
   - Barra de progreso mostrando stock
   - Badge "¡SE AGOTA!"

2. **Urgencia:**
   - Contador regresivo
   - "Termina en X horas"
   - Animaciones constantes

3. **Prueba Social:**
   - "X% ya vendido"
   - "Más popular"
   - Barra de progreso

4. **Anclaje de Precios:**
   - Precio original tachado
   - Descuento destacado
   - Ahorro en verde

5. **FOMO (Fear of Missing Out):**
   - Ofertas por tiempo limitado
   - Stock limitado
   - Animaciones llamativas

---

## 🔧 Configuración Avanzada

### Personalizar Duración de Oferta:

```javascript
// 24 horas
const endTime = new Date(Date.now() + 24 * 60 * 60 * 1000)

// 6 horas
const endTime = new Date(Date.now() + 6 * 60 * 60 * 1000)

// Fecha específica
const endTime = new Date('2024-12-31T23:59:59')
```

### Personalizar Colores:

```css
/* En FlashSaleBanner.jsx */
.flash-sale-banner {
  background: linear-gradient(135deg, #YOUR_COLOR_1, #YOUR_COLOR_2);
}

.flash-discount {
  background: #YOUR_ACCENT_COLOR;
  color: #YOUR_TEXT_COLOR;
}
```

### Personalizar Animaciones:

```css
/* Velocidad del gradiente */
@keyframes gradientShift {
  /* Cambiar duración: 3s → 5s para más lento */
  animation: gradientShift 5s ease infinite;
}

/* Velocidad del bounce */
@keyframes titleBounce {
  /* Cambiar duración: 1s → 2s para más lento */
  animation: titleBounce 2s ease-in-out infinite;
}
```

---

## 📚 Archivos Creados

### Componentes:
- ✅ `frontend/src/components/FlashSaleBanner.jsx`
- ✅ `frontend/src/components/DealProductCard.jsx`

### Páginas:
- ✅ `frontend/src/pages/FlashDeals.jsx`

### Documentación:
- ✅ `SISTEMA_OFERTAS_FLASH.md` (este archivo)

---

## 🎉 Resultado Final

Un sistema de ofertas flash completamente funcional con:

✅ **Animaciones llamativas** que capturan la atención  
✅ **Contador regresivo** que genera urgencia  
✅ **Barras de progreso** que muestran escasez  
✅ **Efectos visuales** profesionales y modernos  
✅ **Responsive design** para todos los dispositivos  
✅ **Interactividad** con filtros y ordenamiento  
✅ **Psicología de ventas** aplicada correctamente  

Todo diseñado para **maximizar conversiones** y crear una experiencia de compra emocionante similar a Temu, Shein y AliExpress! 🚀

---

**Desarrollado con ❤️ para SPORTA**
*Sistema de Ofertas Flash v1.0*
