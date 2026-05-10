# 🎯 Integración de Ofertas Flash y Marcas Afiliadas

## 📋 Resumen de Cambios

Se han integrado dos nuevas secciones en la página principal:

1. **Sección de Ofertas Flash** - En el área de productos del Home
2. **Marcas Afiliadas** - En la parte baja del Footer

---

## 🏠 Sección de Ofertas Flash en Home

### Ubicación:
Insertada **después de las estadísticas** y **antes de los nuevos lanzamientos**.

### Componentes Utilizados:
- `FlashSaleBanner` - Banner principal con contador
- `DealProductCard` - Tarjetas de productos en oferta

### Estructura:
```
Home
├── Hero
├── Stats
├── ⚡ OFERTAS FLASH (NUEVO)
│   ├── FlashSaleBanner
│   └── Grid de DealProductCard (3 productos)
├── Nuevos Lanzamientos
├── Perks
└── CTA
```

### Características:
- ✅ Banner animado con contador regresivo de 24 horas
- ✅ 3 productos en oferta destacados
- ✅ Botón "Ver todas las ofertas" que navega a `/ofertas`
- ✅ Grid responsive (1-3 columnas)
- ✅ Animaciones y efectos visuales

### Props Necesarios en Home:
```jsx
<Home
  onNavigate={navigate}
  user={user}
  onShowAuth={showAuth}
  onAddToCart={addToCart}        // NUEVO
  onViewDetail={viewProductDetail} // NUEVO
/>
```

---

## 🏢 Sección de Marcas Afiliadas

### Ubicación:
**Antes del footer principal**, como una sección independiente.

### Componente Creado:
📁 `frontend/src/components/BrandPartners.jsx`

### Marcas Incluidas (7):
1. **Nike** - Líder mundial en calzado deportivo
2. **Adidas** - Innovación y rendimiento
3. **Jordan** - Icono del basketball
4. **Puma** - Estilo y velocidad
5. **Reebok** - Fitness y training
6. **New Balance** - Comodidad premium
7. **Converse** - Clásico atemporal

### Características:
- ✅ Logos oficiales de Wikipedia (alta calidad)
- ✅ Grid responsive (7 → 4 → 3 → 2 columnas)
- ✅ Animación de entrada escalonada
- ✅ Hover effects elegantes
- ✅ Filtros de color para consistencia visual
- ✅ Lazy loading de imágenes

### Diseño:
```
┌─────────────────────────────────────────┐
│     MARCAS AFILIADAS                    │
│  Trabajamos con las mejores marcas...  │
├─────────────────────────────────────────┤
│  [Nike] [Adidas] [Jordan] [Puma]       │
│  [Reebok] [New Balance] [Converse]     │
└─────────────────────────────────────────┘
```

---

## 🎨 Estilos y Animaciones

### Ofertas Flash:

**Fondo:**
```css
background: #0a0a0a; /* Ligeramente diferente del fondo principal */
```

**Grid:**
```css
grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
gap: 2rem;
```

### Marcas Afiliadas:

**Tarjetas:**
```css
background: rgba(255,255,255,0.02);
border: 1px solid rgba(255,255,255,0.05);
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

**Hover Effect:**
```css
transform: translateY(-4px);
box-shadow: 0 8px 24px rgba(0,0,0,0.3);
border-color: rgba(255,69,0,0.2);
```

**Logos:**
```css
/* Estado normal: gris claro */
filter: brightness(0) invert(1) opacity(0.4);

/* Hover: blanco brillante */
filter: brightness(0) invert(1) opacity(0.8);
transform: scale(1.1);
```

**Animación de Entrada:**
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Delay escalonado */
.brand-partner-item:nth-child(1) { animation-delay: 0.1s; }
.brand-partner-item:nth-child(2) { animation-delay: 0.2s; }
/* ... hasta 7 */
```

---

## 📱 Responsive Design

### Ofertas Flash:

| Breakpoint | Columnas | Gap |
|------------|----------|-----|
| Desktop (>1200px) | 3 | 2rem |
| Tablet (768-1200px) | 2 | 2rem |
| Móvil (<768px) | 1 | 1.5rem |

### Marcas Afiliadas:

| Breakpoint | Columnas | Altura | Logo |
|------------|----------|--------|------|
| Desktop (>1200px) | 7 | 80px | 50px |
| Tablet (768-1200px) | 4 | 80px | 50px |
| Móvil (480-768px) | 3 | 70px | 40px |
| Móvil (<480px) | 2 | 60px | 35px |

---

## 🔧 Configuración de Productos en Oferta

### Datos Actuales (Ejemplo):
```javascript
const dealProducts = [
  {
    id: 101,
    name: 'Nike Air Max 270 React',
    category: 'Running',
    price: 450,              // Precio original
    discountPrice: 225,      // Precio con descuento
    discount: 50,            // Porcentaje
    image: '/shoe1.jpg',
    stock: 100,
    sold: 75                 // Para barra de progreso
  },
  // ... más productos
]
```

### Integración con API (Producción):

En `Home.jsx`, reemplazar el array estático por:

```javascript
const [dealProducts, setDealProducts] = useState([])

useEffect(() => {
  loadDealProducts()
}, [])

const loadDealProducts = async () => {
  try {
    const res = await api.getProducts()
    if (res.products) {
      // Filtrar productos en oferta
      const deals = res.products
        .filter(p => p.discount && p.discount > 0)
        .slice(0, 3) // Tomar solo 3 para el home
        .map(p => ({
          id: p.id,
          name: p.name,
          category: p.category,
          price: p.price,
          discountPrice: p.price * (1 - p.discount / 100),
          discount: p.discount,
          image: p.image_url || p.image,
          stock: p.stock || 100,
          sold: p.sold || Math.floor(Math.random() * 80)
        }))
      
      setDealProducts(deals)
    }
  } catch (err) {
    console.error('Error cargando ofertas:', err)
  }
}
```

### Agregar Campo `discount` en la Base de Datos:

```sql
-- Agregar columna de descuento a la tabla products
ALTER TABLE products 
ADD COLUMN discount INTEGER DEFAULT 0 
CHECK (discount >= 0 AND discount <= 100);

-- Agregar columna de unidades vendidas
ALTER TABLE products 
ADD COLUMN sold INTEGER DEFAULT 0;

-- Actualizar algunos productos con descuento
UPDATE products 
SET discount = 50, sold = 75 
WHERE id = 1;

UPDATE products 
SET discount = 40, sold = 60 
WHERE id = 2;
```

---

## 🌐 URLs de Logos (CDN de Wikipedia)

Las URLs utilizadas son permanentes y de alta calidad:

```javascript
const brands = [
  { 
    name: 'Nike', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' 
  },
  { 
    name: 'Adidas', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' 
  },
  { 
    name: 'Jordan', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg' 
  },
  { 
    name: 'Puma', 
    logo: 'https://upload.wikimedia.org/wikipedia/en/4/49/Puma_logo.svg' 
  },
  { 
    name: 'Reebok', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Reebok_logo.svg' 
  },
  { 
    name: 'New Balance', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/New_Balance_logo.svg' 
  },
  { 
    name: 'Converse', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg' 
  }
]
```

**Ventajas:**
- ✅ Gratuitas y de dominio público
- ✅ Alta resolución (SVG)
- ✅ CDN rápido y confiable
- ✅ No requieren descarga local

---

## 🚀 Integración en App.jsx

### Actualizar Props de Home:

```jsx
import Home from './pages/Home'

// En el componente App
<Route path="/" element={
  <Home
    onNavigate={(page) => navigate(`/${page}`)}
    user={user}
    onShowAuth={() => setShowAuth(true)}
    onAddToCart={addToCart}
    onViewDetail={viewProductDetail}
  />
} />
```

### Agregar Ruta de Ofertas:

```jsx
import FlashDeals from './pages/FlashDeals'

<Route path="/ofertas" element={
  <FlashDeals
    onAddToCart={addToCart}
    onViewDetail={viewProductDetail}
    user={user}
    onShowAuth={() => setShowAuth(true)}
  />
} />
```

---

## 📊 Métricas de Éxito

### KPIs a Medir:

1. **Tasa de Clics en Ofertas:**
   - % de usuarios que hacen clic en productos en oferta
   - Comparar con productos normales

2. **Conversión de Ofertas:**
   - % de ofertas que terminan en compra
   - Valor promedio de pedido con ofertas

3. **Tiempo en Sección:**
   - Cuánto tiempo pasan en ofertas flash
   - Engagement con el contador

4. **Reconocimiento de Marca:**
   - Impacto de mostrar marcas afiliadas
   - Confianza del usuario

5. **Navegación a Página de Ofertas:**
   - % que hace clic en "Ver todas las ofertas"
   - Tasa de rebote en página de ofertas

---

## 🎯 Mejoras Futuras

### Ofertas Flash:

1. **Rotación Automática:**
   ```javascript
   // Cambiar productos cada 6 horas
   useEffect(() => {
     const interval = setInterval(() => {
       loadDealProducts()
     }, 6 * 60 * 60 * 1000)
     return () => clearInterval(interval)
   }, [])
   ```

2. **Ofertas Personalizadas:**
   ```javascript
   // Basado en historial del usuario
   const personalizedDeals = await api.getPersonalizedDeals(user.id)
   ```

3. **Notificaciones:**
   ```javascript
   // Notificar cuando quedan 1 hora
   if (timeLeft.hours === 1) {
     showNotification('¡Solo queda 1 hora!')
   }
   ```

### Marcas Afiliadas:

1. **Links a Colecciones:**
   ```jsx
   <a href={`/productos?marca=${brand.name}`}>
     <img src={brand.logo} alt={brand.name} />
   </a>
   ```

2. **Tooltip con Info:**
   ```jsx
   <div className="brand-tooltip">
     {brand.description}
   </div>
   ```

3. **Contador de Productos:**
   ```jsx
   <span className="brand-count">
     {brand.productCount} productos
   </span>
   ```

---

## 📚 Archivos Modificados/Creados

### Modificados:
- ✅ `frontend/src/pages/Home.jsx`
  - Agregado imports de FlashSaleBanner y DealProductCard
  - Agregado array de dealProducts
  - Agregado sección de ofertas flash
  - Agregado estilos para la sección

- ✅ `frontend/src/components/Footer.jsx`
  - Agregado import de BrandPartners
  - Integrado componente antes del footer

### Creados:
- ✅ `frontend/src/components/BrandPartners.jsx`
  - Componente completo de marcas afiliadas
  - Grid responsive
  - Animaciones y efectos

- ✅ `INTEGRACION_OFERTAS_MARCAS.md` (este archivo)

---

## ✅ Checklist de Producción

Antes de desplegar a producción:

- [ ] Verificar que las imágenes de productos existen en `/public`
- [ ] Configurar productos con descuento en la base de datos
- [ ] Actualizar `dealProducts` para usar API real
- [ ] Probar responsive en todos los dispositivos
- [ ] Verificar que los logos de marcas cargan correctamente
- [ ] Probar navegación a `/ofertas`
- [ ] Verificar que `onAddToCart` y `onViewDetail` funcionan
- [ ] Probar con usuario autenticado y no autenticado
- [ ] Verificar contador regresivo funciona correctamente
- [ ] Optimizar imágenes para web
- [ ] Configurar lazy loading
- [ ] Probar en diferentes navegadores
- [ ] Verificar accesibilidad (alt texts, aria-labels)

---

## 🎉 Resultado Final

### Home Page:
```
┌─────────────────────────────────────┐
│           HERO SECTION              │
├─────────────────────────────────────┤
│           ESTADÍSTICAS              │
├─────────────────────────────────────┤
│      ⚡ OFERTAS FLASH ⚡            │
│  [Banner con Contador Regresivo]   │
│  [Producto 1] [Producto 2] [Prod 3]│
├─────────────────────────────────────┤
│       NUEVOS LANZAMIENTOS           │
├─────────────────────────────────────┤
│         ¿POR QUÉ SPORTA?            │
├─────────────────────────────────────┤
│            CTA FINAL                │
└─────────────────────────────────────┘
```

### Footer:
```
┌─────────────────────────────────────┐
│        MARCAS AFILIADAS             │
│  [Nike] [Adidas] [Jordan] [Puma]   │
│  [Reebok] [New Balance] [Converse] │
├─────────────────────────────────────┤
│         FOOTER PRINCIPAL            │
│  [Links] [Info] [Contacto]         │
└─────────────────────────────────────┘
```

---

**Desarrollado con ❤️ para SPORTA**
*Integración de Ofertas Flash y Marcas Afiliadas v1.0*
