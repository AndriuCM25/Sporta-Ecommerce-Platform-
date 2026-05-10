# 🏃‍♂️ SPORTA E-Commerce Platform

Plataforma de e-commerce moderna y completa para venta de zapatillas deportivas, desarrollada con React, Node.js y Supabase. Incluye sistema de autenticación, carrito persistente, múltiples métodos de pago, panel de administración avanzado, **sistema de seguimiento automático**, **ofertas flash estilo Temu/Shein**, **newsletter con ofertas por email**, **footer funcional con páginas de información** y **botón flotante de WhatsApp**.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [API Endpoints](#-api-endpoints)
- [Funcionalidades](#-funcionalidades)
- [Credenciales](#-credenciales)
- [Scripts Disponibles](#-scripts-disponibles)

---

## ✨ Características

### Para Clientes
- 🛍️ **Catálogo de productos** con filtros por categoría y búsqueda
- 🔍 **Visualización detallada** de productos con imágenes, tallas y colores
- 🛒 **Carrito de compras persistente** en base de datos (sincronizado entre sesiones)
- 👤 **Autenticación dual**: Email/password y Google OAuth 2.0
- 💳 **Múltiples métodos de pago**:
  - Tarjeta de crédito/débito
  - Yape/Plin (billeteras digitales)
  - Transferencia bancaria
  - Pago contra entrega
- 📦 **Sistema de checkout completo** con validación de formularios
- 🚚 **Dos modalidades de entrega**:
  - **Delivery a domicilio**: Entrega en 2-3 días hábiles
  - **Recojo en tienda**: Listo en 24-48 horas
- 📍 **Gestión de direcciones** con 43 distritos de Lima
- 📧 **Email automático con comprobante** al completar compra (Gmail/Resend)
- 📄 **Descarga de comprobantes** en formato TXT
- 🎯 **Sistema de seguimiento automático** (NUEVO):
  - Avance automático cada 5 segundos por 4 etapas
  - Timeline visual con iconos profesionales animados
  - Barra de progreso con gradiente
  - Estados diferenciados por tipo de entrega (Delivery/Recojo)
  - Animación de confeti al completar
  - Modal con factura completa al finalizar
  - Responsive (horizontal/vertical)
- ⚡ **Ofertas Flash estilo Temu/Shein** (NUEVO):
  - Banner animado con gradiente en movimiento
  - Contador regresivo en tiempo real (HH:MM:SS)
  - Sparkles flotantes y animaciones llamativas
  - Tarjetas de productos con badges pulsantes
  - Barra de progreso de ventas
  - Descuentos de hasta 50% OFF
  - Página dedicada con filtros y ordenamiento
- 📧 **Newsletter con ofertas exclusivas** (NUEVO):
  - Formulario de suscripción en footer
  - Envío automático de email con 4 ofertas
  - Diseño profesional y responsive
  - Integrado con Gmail/Resend
- 📄 **Páginas de información completas** (NUEVO):
  - Envíos y Entregas (métodos, costos, tiempos)
  - Devoluciones y Cambios (política de 30 días)
  - Guía de Tallas (tablas para hombre y mujer)
  - Preguntas Frecuentes (25 preguntas en 6 categorías)
- 🦶 **Footer funcional** (NUEVO):
  - Navegación real a todas las páginas
  - Redes sociales activas con hover effects
  - Newsletter integrado
  - Información de contacto clickeable
  - Métodos de pago visuales
  - 6 marcas afiliadas (Nike, Adidas, Jordan, Puma, New Balance, Converse)
- 💬 **WhatsApp en página de Contacto**:
  - Diseño destacado con gradiente verde
  - Dos botones directos (Ventas: +51 987 145 336, Consultas: +51 960 056 600)
  - Enlaces directos a WhatsApp Web con mensajes pre-escritos
  - Horario de atención visible
  - Números de teléfono clickeables
  - **Nota**: No hay botón flotante de WhatsApp, solo en la página de Contacto
- 🤖 **Asistente Virtual con IA**:
  - **Modo Cliente**: Ayuda con compras, pagos, envíos, seguimiento, devoluciones, tallas, ofertas
  - **Modo Admin**: Manual interactivo del dashboard, productos, pedidos, reportes, gráficos
  - Respuestas instantáneas basadas en keywords (20+ categorías)
  - Sugerencias rápidas contextuales (4 por modo)
  - Interfaz de chat moderna con animaciones suaves
  - **Botón flotante simple** en la esquina inferior derecha (56x56px)
  - **Botón de cerrar (X)** en el header del chat
  - Sin auto-open (el usuario debe hacer clic para abrir)
  - Diseño limpio sin animaciones complejas
- 🎨 **Diseño moderno y responsivo** con animaciones suaves
- 🚚 **Envío gratis** en compras mayores a S/150
- 🎨 **Iconos profesionales** (Lucide React) en lugar de emojis

### Para Administradores
- 📊 **Dashboard completo** con estadísticas en tiempo real
- 📈 **Gráficos interactivos** (Chart.js):
  - Ventas por período (diario/mensual/anual)
  - Distribución por categorías (gráfico de dona)
  - Tendencias de ventas
- 👥 **Gestión de usuarios**:
  - Ver lista completa con roles
  - Bloquear/desbloquear usuarios
  - Ver historial de compras por usuario
- 📦 **Gestión completa de productos** (CRUD):
  - Crear, editar y eliminar productos
  - Subir imágenes (Supabase Storage)
  - Control de stock en tiempo real
  - Gestión de tallas y colores
  - Productos destacados
- 🛍️ **Gestión de pedidos**:
  - Ver todos los pedidos con filtros
  - Cambiar estados (pending → paid → shipped)
  - Ver detalles completos de cada pedido
  - Filtrar por estado y fecha
- 📊 **Reportes exportables** a CSV
- 🔐 **Panel protegido** con autenticación JWT

---

## 🛠️ Tecnologías

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Lucide React** - Iconos
- **Chart.js** - Gráficos y estadísticas
- **Google OAuth** - Autenticación social
- **Formspree** - Respaldo de formularios

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Supabase** - Base de datos PostgreSQL
- **JWT** - Autenticación con tokens
- **bcrypt** - Hash de contraseñas
- **CORS** - Manejo de peticiones cross-origin
- **Nodemailer** - Envío de correos con Gmail
- **Resend** - Alternativa para envío de correos
- **Formspree** - Respaldo de notificaciones

### Base de Datos
- **PostgreSQL** (via Supabase)
- **Row Level Security (RLS)**
- **Triggers automáticos**
- **Índices optimizados**

---

## 📦 Requisitos Previos

- **Node.js** 16+ y npm
- **Cuenta de Supabase** (gratuita)
- **Cuenta de Gmail** (para envío de emails - recomendado)
- **Cuenta de Resend** (alternativa - 3,000 emails/mes)
- **Cuenta de Google Cloud** (para OAuth - opcional)
- **Cuenta de Formspree** (opcional, para respaldo de notificaciones)

---

## 🚀 Instalación

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd Sporta-Ecommerce-Platform-
```

### 2. Instalar dependencias del backend
```bash
cd backend
npm install
```

### 3. Instalar dependencias del frontend
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuración

### 1. Configurar Supabase

#### a) Crear proyecto en Supabase
1. Ve a [supabase.com](https://supabase.com)
2. Crea un nuevo proyecto
3. Guarda la URL y la API Key (anon/public)

#### b) Ejecutar script SQL
1. Ve a SQL Editor en Supabase
2. Copia y pega el contenido de `backend/supabase_setup_complete.sql`
3. Ejecuta el script completo
4. Verifica que se crearon 8 tablas

### 2. Configurar variables de entorno

#### Backend (`backend/.env`)
```env
PORT=3001
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_KEY=tu-supabase-anon-key
JWT_SECRET=tu-secreto-jwt-super-seguro-cambiar-en-produccion

# Gmail (para envío de emails - RECOMENDADO)
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_FROM=SPORTA <tu-email@gmail.com>

# Resend (alternativa)
RESEND_API_KEY=re_tu_api_key_aqui
RESEND_FROM_EMAIL=SPORTA <onboarding@resend.dev>

# URLs del Frontend (para CORS)
FRONTEND_URL=http://localhost:5173
```

**Configurar Gmail (Recomendado - Envía a cualquier email):**

1. **Habilita verificación en dos pasos:**
   - Ve a https://myaccount.google.com/security
   - Activa "Verificación en dos pasos"

2. **Genera contraseña de aplicación:**
   - Ve a https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Otro (nombre personalizado)"
   - Escribe "SPORTA Backend"
   - Copia la contraseña de 16 caracteres

3. **Configura en `.env`:**
   ```env
   GMAIL_USER=tu-email@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

📖 **Guías completas**: 
- [backend/GMAIL_SETUP.md](backend/GMAIL_SETUP.md) - Configuración de Gmail
- [backend/RESEND_SETUP.md](backend/RESEND_SETUP.md) - Configuración de Resend

#### Frontend (`frontend/.env`)
```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-supabase-anon-key
VITE_GOOGLE_CLIENT_ID=tu-google-client-id.apps.googleusercontent.com
```

### 3. Configurar Google OAuth (Opcional)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. Crea un nuevo proyecto
3. Habilita Google+ API
4. Crea credenciales OAuth 2.0
5. Agrega orígenes autorizados:
   - `http://localhost:5173` (desarrollo)
   - Tu dominio de producción
6. Copia el Client ID al archivo `.env` del frontend

### 4. Configurar Formspree (Opcional)

1. Ve a [formspree.io](https://formspree.io)
2. Crea formularios para:
   - Contacto: Actualiza el ID en `frontend/src/pages/Contact.jsx`
   - Pedidos: Actualiza el ID en `backend/src/routes/orders.js`

**Nota**: Formspree es opcional y se usa como respaldo final.

### 5. Configurar Sistema de Emails

El sistema soporta **3 métodos** de envío de emails (en orden de prioridad):

#### Opción A: Gmail (RECOMENDADO) ⭐

**Ventajas:**
- ✅ Envía a **cualquier dirección de email**
- ✅ Fácil de configurar (5 minutos)
- ✅ 500 emails por día (suficiente para empezar)
- ✅ Gratis

**Configuración:**

1. **Habilita verificación en dos pasos:**
   - Ve a https://myaccount.google.com/security
   - Activa "Verificación en dos pasos"

2. **Genera contraseña de aplicación:**
   - Ve a https://myaccount.google.com/apppasswords
   - Selecciona "Correo" y "Otro"
   - Escribe "SPORTA Backend"
   - Copia la contraseña de 16 caracteres

3. **Agrega a `backend/.env`:**
   ```env
   GMAIL_USER=tu-email@gmail.com
   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
   GMAIL_FROM=SPORTA <tu-email@gmail.com>
   ```

📖 **Guía completa**: [backend/GMAIL_SETUP.md](backend/GMAIL_SETUP.md)

#### Opción B: Resend (Alternativa)

**Ventajas:**
- ✅ Más profesional
- ✅ Dashboard completo
- ✅ 3,000 emails/mes

**Desventaja:**
- ❌ Requiere verificar un dominio propio para enviar a cualquier email

**Configuración:**

1. Ve a [resend.com](https://resend.com) y crea una cuenta
2. Ve a **API Keys** → **Create API Key**
3. Copia la key que empieza con `re_`
4. Agrega a `backend/.env`:
   ```env
   RESEND_API_KEY=re_tu_api_key_aqui
   RESEND_FROM_EMAIL=SPORTA <onboarding@resend.dev>
   ```

📖 **Guía completa**: [backend/RESEND_SETUP.md](backend/RESEND_SETUP.md)

#### Opción C: Formspree (Respaldo automático)

Si Gmail y Resend fallan, el sistema usa Formspree automáticamente como respaldo.

---

## 📁 Estructura del Proyecto

```
Sporta-Ecommerce-Platform-/
├── .git/                        # Control de versiones
├── .vscode/                     # Configuración del editor
├── .gitignore                   # Archivos ignorados por Git
│
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js          # Middleware de autenticación JWT
│   │   ├── routes/
│   │   │   ├── admin.js         # Endpoints de administración
│   │   │   ├── auth.js          # Autenticación y registro
│   │   │   ├── cart.js          # Carrito de compras
│   │   │   ├── contact.js       # Formulario de contacto
│   │   │   ├── googleAuth.js    # Autenticación con Google
│   │   │   ├── newsletter.js    # Newsletter con ofertas (NUEVO)
│   │   │   ├── orders.js        # Gestión de pedidos
│   │   │   └── products.js      # Catálogo de productos
│   │   ├── services/
│   │   │   └── emailService.js  # Servicio de envío de emails (Gmail/Resend)
│   │   ├── db.js                # Conexión a Supabase
│   │   └── index.js             # Servidor Express
│   ├── .env                     # Variables de entorno
│   ├── .env.example             # Ejemplo de variables
│   ├── .gitignore               # Archivos ignorados
│   ├── package.json             # Dependencias del backend
│   ├── start.bat                # Script de inicio (Windows)
│   ├── restart.bat              # Script de reinicio (Windows)
│   ├── GMAIL_SETUP.md           # Guía de configuración de Gmail (NUEVO)
│   ├── RESEND_SETUP.md          # Guía de configuración de Resend
│   └── supabase_setup_complete.sql  # Setup completo de BD
│
├── frontend/
│   ├── public/
│   │   ├── sporta.svg           # Logo
│   │   ├── shoe1-6.jpg          # Imágenes de productos
│   │   ├── modelo1-5.png        # Imágenes de modelos
│   │   └── SportaVideoPublicitario.mp4
│   ├── src/
│   │   ├── assets/              # Imágenes de productos
│   │   │   ├── modelo1-5.png    # Imágenes de modelos
│   │   │   ├── shoe1-6.jpg      # Imágenes de zapatillas
│   │   │   └── Sporta_BLACK-logo.png
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx       # Panel de administración (ACTUALIZADO)
│   │   │   ├── AIAssistant.jsx          # Asistente Virtual con IA (NUEVO)
│   │   │   ├── Auth.jsx                 # Modal de login/registro
│   │   │   ├── BrandPartners.jsx        # Marcas afiliadas (NUEVO)
│   │   │   ├── Cart.jsx                 # Carrito lateral
│   │   │   ├── ConfettiAnimation.jsx    # Animación de confeti (NUEVO)
│   │   │   ├── DealProductCard.jsx      # Tarjeta de oferta (NUEVO)
│   │   │   ├── DeliveryTypeSelector.jsx # Selector delivery/recojo (NUEVO)
│   │   │   ├── FlashSaleBanner.jsx      # Banner de ofertas (NUEVO)
│   │   │   ├── Footer.jsx               # Pie de página funcional (ACTUALIZADO)
│   │   │   ├── Hero.jsx                 # Banner principal
│   │   │   ├── InvoicePreview.jsx       # Vista de factura (NUEVO)
│   │   │   ├── Navbar.jsx               # Barra de navegación
│   │   │   ├── OrderTracking.jsx        # Seguimiento de pedidos (NUEVO)
│   │   │   ├── ProductCard.jsx          # Tarjeta de producto
│   │   │   ├── Stats.jsx                # Estadísticas (ACTUALIZADO)
│   │   │   └── WhatsAppButton.jsx       # Botón flotante de WhatsApp (NO USADO)
│   │   ├── pages/
│   │   │   ├── About.jsx            # Página Nosotros
│   │   │   ├── Checkout.jsx         # Proceso de pago (ACTUALIZADO)
│   │   │   ├── Contact.jsx          # Formulario de contacto
│   │   │   ├── FAQ.jsx              # Preguntas frecuentes (NUEVO)
│   │   │   ├── FlashDeals.jsx       # Página de ofertas (NUEVO)
│   │   │   ├── Home.jsx             # Página principal
│   │   │   ├── OrderTrackingPage.jsx # Página de seguimiento (NUEVO)
│   │   │   ├── ProductDetail.jsx    # Detalle de producto
│   │   │   ├── Products.jsx         # Catálogo
│   │   │   ├── ReturnsInfo.jsx      # Información de devoluciones (NUEVO)
│   │   │   ├── ShippingInfo.jsx     # Información de envíos (NUEVO)
│   │   │   └── SizeGuide.jsx        # Guía de tallas (NUEVO)
│   │   ├── api.js               # Cliente API
│   │   ├── App.jsx              # Componente principal (ACTUALIZADO)
│   │   ├── App.css              # Estilos globales
│   │   ├── index.css            # Estilos base
│   │   └── main.jsx             # Punto de entrada
│   ├── .env                     # Variables de entorno
│   ├── .env.example             # Ejemplo de variables
│   ├── eslint.config.js         # Configuración de ESLint
│   ├── index.html               # HTML principal
│   ├── package.json             # Dependencias del frontend
│   ├── vite.config.js           # Configuración de Vite
│   ├── GOOGLE_OAUTH_SETUP.md    # Guía de configuración OAuth
│   ├── VERCEL_DEPLOYMENT.md     # Guía de despliegue en Vercel (NUEVO)
│   └── README.md                # Documentación del frontend
│
├── DEPLOYMENT.md                # Guía completa de despliegue
├── DEPLOY_RAPIDO.md             # Despliegue rápido en 15 minutos
├── ASISTENTE_VIRTUAL_IA.md      # Documentación del Asistente IA (NUEVO)
├── GUIA_RAPIDA_ASISTENTE.md     # Guía rápida del Asistente IA (NUEVO)
├── MEJORAS_ASISTENTE_IA.md      # Historial de mejoras del asistente (NUEVO)
├── SOLUCION_ERRORES_ASISTENTE.md # Solución de errores del asistente (NUEVO)
├── ASISTENTE_BIENVENIDA_AUTOMATICA.md # Sistema de bienvenida (revertido) (NUEVO)
├── BOTONES_FLOTANTES_ORGANIZADOS.md # Organización de botones (NUEVO)
├── FOOTER_FUNCIONAL.md          # Documentación del footer (NUEVO)
├── INTEGRACION_OFERTAS_MARCAS.md # Documentación de ofertas y marcas (NUEVO)
├── SISTEMA_EMAILS.md            # Documentación del sistema de emails
├── SISTEMA_NEWSLETTER.md        # Documentación del newsletter (NUEVO)
├── SISTEMA_OFERTAS_FLASH.md     # Documentación de ofertas flash (NUEVO)
├── SISTEMA_SEGUIMIENTO_PEDIDOS.md # Documentación de seguimiento (NUEVO)
├── SOLUCION_CORS.md             # Solución de problemas CORS
├── TRACKING_AUTOMATICO.md       # Documentación de tracking automático (NUEVO)
├── vercel.json                  # Configuración de Vercel (NUEVO)
└── README.md                    # Este archivo (documentación principal)
```

---

## 🗄️ Base de Datos

### Tablas Principales

#### `users`
Usuarios del sistema (clientes y administradores)
- `id`, `name`, `email`, `password`, `role`, `blocked`
- `google_id`, `picture` (para OAuth)
- `created_at`

#### `categories`
Categorías de productos
- `id`, `name`, `slug`, `description`
- Valores: Running, Lifestyle, Basketball

#### `products`
Catálogo de productos
- `id`, `name`, `category`, `category_id`, `slug`
- `price`, `stock`, `badge`, `description`, `image`
- `sizes[]`, `colors[]`, `features[]`
- `is_featured`, `status`

#### `cart_items`
Items del carrito de compras
- `id`, `user_id`, `product_id`, `quantity`
- `selected_size`, `selected_color`

#### `orders`
Pedidos realizados
- `id`, `user_id`, `name`, `email`, `phone`
- `address`, `district`, `reference`, `delivery_notes`
- `payment_method`, `subtotal`, `shipping`, `total`
- `status` (pending, paid, shipped, cancelled)

#### `order_items`
Items de cada pedido
- `id`, `order_id`, `product_id`
- `name`, `price`, `quantity`, `image`
- `selected_size`, `selected_color`

#### `contacts`
Mensajes del formulario de contacto
- `id`, `name`, `email`, `subject`, `message`

#### `addresses`
Direcciones guardadas (opcional, no implementado aún)
- `id`, `user_id`, `name`, `address`, `district`
- `reference`, `phone`, `is_default`

---

## 🔌 API Endpoints

### Autenticación (`/api/auth`)
- `POST /register` - Registrar nuevo usuario
- `POST /login` - Iniciar sesión
- `POST /google` - Login con Google (usuarios existentes)
- `POST /google/register` - Registro con Google
- `GET /me` - Obtener usuario actual

### Productos (`/api/products`)
- `GET /` - Listar productos (con filtros)
- `GET /:id` - Obtener producto por ID

### Carrito (`/api/cart`)
- `GET /` - Obtener carrito del usuario
- `POST /` - Agregar producto al carrito
- `PATCH /:id` - Actualizar cantidad
- `DELETE /:id` - Eliminar item
- `DELETE /` - Vaciar carrito

### Pedidos (`/api/orders`)
- `POST /` - Crear nuevo pedido
- `GET /` - Listar pedidos del usuario
- `GET /:id` - Obtener pedido específico

### Newsletter (`/api/newsletter`) 🆕
- `POST /` - Suscribirse al newsletter (envía 4 ofertas por email)

### Contacto (`/api/contact`)
- `POST /` - Enviar mensaje de contacto

### Admin (`/api/admin`) 🔒
Requiere autenticación y rol de administrador

#### Estadísticas
- `GET /stats` - Estadísticas generales

#### Usuarios
- `GET /users` - Listar usuarios
- `PATCH /users/:id` - Actualizar usuario
- `DELETE /users/:id` - Eliminar usuario

#### Productos
- `POST /products` - Crear producto
- `PATCH /products/:id` - Actualizar producto
- `DELETE /products/:id` - Eliminar producto

#### Pedidos
- `GET /orders` - Listar todos los pedidos
- `PATCH /orders/:id` - Actualizar estado de pedido

---

## 🎯 Funcionalidades

### Sistema de Autenticación
- Registro con email y contraseña
- Login tradicional
- Google OAuth (Sign in with Google)
- Tokens JWT con expiración de 7 días
- Protección de rutas privadas

### Carrito de Compras
- Persistencia en base de datos
- Selección de talla y color
- Actualización de cantidades
- Cálculo automático de envío (gratis >S/150)
- Sincronización entre sesiones

### Sistema de Pedidos
- Múltiples métodos de pago:
  - **Tarjeta de crédito/débito**: Pago inmediato (estado: `paid`)
  - **Yape/Plin**: Pago inmediato con billeteras digitales (estado: `paid`)
  - **Transferencia bancaria**: Requiere verificación manual (estado: `pending`)
  - **Contra entrega**: Pago al recibir (estado: `pending`)
- Estados automáticos según método de pago
- Generación de comprobantes únicos (formato: `COMP-timestamp-ID`)
- **Email automático con comprobante** al completar compra
  - Sistema principal: Gmail (envía a cualquier email)
  - Sistema alternativo: Resend
  - Sistema de respaldo: Formspree
- Descarga de comprobantes en formato TXT
- Protección contra doble envío de pedidos
- Cálculo automático de envío (gratis >S/150)

### Sistema de Seguimiento Automático 🆕
- **Avance automático cada 5 segundos** por 4 etapas
- **Dos flujos diferenciados**:
  - Delivery: Pedido Recibido → En Preparación → En Camino → Entregado
  - Recojo: Pedido Recibido → En Preparación → Listo para Recoger → Entregado
- **Animación de confeti** al completar (50 piezas cayendo)
- **Modal con factura completa** al finalizar
- Timeline visual con iconos profesionales
- Barra de progreso animada
- Diseño responsive

### Sistema de Ofertas Flash 🆕
- **Banner animado** con gradiente en movimiento
- **Contador regresivo** en tiempo real (HH:MM:SS)
- **Sparkles flotantes** y rayas diagonales animadas
- **Tarjetas de productos** con:
  - Badges de descuento pulsantes
  - Barra de progreso de ventas
  - Hover effects con shimmer
  - Botones CTA animados
- **Página dedicada** (`/ofertas`) con:
  - Filtros por categoría
  - Ordenamiento por precio/descuento
  - Estadísticas de ofertas
- Descuentos de hasta 50% OFF
- Integrado en Home entre Stats y Products

### Sistema de Newsletter 🆕
- **Formulario de suscripción** en footer
- **Envío automático de email** con 4 ofertas exclusivas:
  - Nike Air Max 270 React (50% OFF)
  - Adidas Ultraboost 21 (40% OFF)
  - Puma RS-X³ Puzzle (50% OFF)
  - Jordan Retro High OG (30% OFF)
- **Email profesional** con:
  - Banner de bienvenida
  - Tarjetas de productos con imágenes
  - Precios originales y con descuento
  - Ahorro calculado
  - Botones CTA
  - Beneficios (envío gratis, pago seguro, calidad)
  - Redes sociales
- Integrado con Gmail/Resend
- Validación de email
- Confirmación visual con animación

### Footer Funcional 🆕
- **12 enlaces funcionales** a páginas de información
- **4 páginas nuevas**:
  - **Envíos y Entregas**: Métodos, costos, tiempos, zonas de cobertura
  - **Devoluciones y Cambios**: Política de 30 días, proceso, reembolsos
  - **Guía de Tallas**: Tablas para hombre y mujer, cómo medir
  - **Preguntas Frecuentes**: 25 preguntas en 6 categorías con acordeón
- **Redes sociales activas**:
  - Facebook, Instagram, Twitter, YouTube
  - Hover effects con colores de marca
  - Animación de elevación
- **Newsletter integrado** con formulario funcional
- **Información de contacto** clickeable
- **Métodos de pago** visuales (VISA, Mastercard, Yape)
- **6 marcas afiliadas**: Nike, Adidas, Jordan, Puma, New Balance, Converse
- Diseño responsive y profesional

### Panel de Administración
- Dashboard con métricas en tiempo real:
  - Total de ventas (hoy, mes, año)
  - Número de pedidos y usuarios
  - Productos más vendidos
  - Ingresos totales
- Gráficos de ventas (Chart.js):
  - Ventas por período (diario/mensual/anual)
  - Distribución por categorías (gráfico de dona)
  - Tendencias y comparativas
- Gestión de usuarios:
  - Ver lista completa con roles y estado
  - Bloquear/desbloquear usuarios
  - Ver historial de compras por usuario
  - Eliminar usuarios (con confirmación)
- Gestión de productos:
  - Crear, editar, eliminar productos
  - Subir imágenes (Supabase Storage)
  - Control de stock en tiempo real
  - Gestión de tallas y colores
  - Marcar productos como destacados
  - Estados: activo/inactivo
- Gestión de pedidos:
  - Ver todos los pedidos con detalles
  - Cambiar estados manualmente
  - Filtrar por estado y fecha
  - Ver información completa del cliente
  - Reenviar notificaciones por email
- Reportes:
  - Exportar datos a CSV
  - Filtros por fecha y categoría
  - Gráficos de tendencias

### Características Adicionales
- **WhatsApp en página de Contacto** con dos opciones:
  - 🛍️ Ventas (+51 987 145 336): Para consultas de productos y compras
  - 💬 Consultas (+51 960 056 600): Para dudas generales
  - **Nota**: No hay botón flotante de WhatsApp, solo en la página de Contacto
- **Asistente Virtual con IA**:
  - Único botón flotante en la aplicación
  - Botón simple de 56x56px sin animaciones complejas
  - Botón de cerrar (X) en el header del chat
  - Sin auto-open (requiere clic del usuario)
  - Respuestas inteligentes para clientes y administradores
- **Iconos profesionales** (Lucide React) en toda la app
- **Animaciones suaves** con transiciones CSS
- **Diseño responsivo** para todos los dispositivos
- **Optimización de imágenes** con lazy loading
- **SEO optimizado** con meta tags
- **Accesibilidad** (ARIA labels, contraste de colores)
- **Protección CSRF** en formularios

---

## 🔑 Credenciales

### Usuario Administrador
```
Email: adminSporta@depor.pe
Password: admin123
```

### Productos de Ejemplo
El script SQL incluye 6 productos de ejemplo:
1. Air Sprint Pro (Running) - S/449.99
2. Urban Pulse NMD (Lifestyle) - S/399.99
3. Classic Strike (Lifestyle) - S/349.99
4. Court Force Low (Basketball) - S/379.99
5. ZX Boost Radical (Running) - S/419.99
6. Stan Legend (Lifestyle) - S/329.99

---

## 📜 Scripts Disponibles

### Backend
```bash
# Desarrollo (con nodemon)
npm run dev

# Producción
npm start

# Windows
start.bat
restart.bat
```

### Frontend
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

---

## 🚦 Flujo de Estados de Pedidos

```
pending → paid → shipped
   ↓
cancelled
```

### Estados Automáticos
- **Tarjeta/Yape**: `paid` (pago inmediato)
- **Transferencia/Efectivo**: `pending` (requiere verificación)

### Cambios Manuales (Admin)
- `pending` → `paid` (verificar pago)
- `paid` → `shipped` (enviar pedido)
- Cualquier estado → `cancelled` (cancelar)

---

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt (10 rounds)
- Tokens JWT con expiración
- Row Level Security (RLS) en Supabase
- Validación de datos en backend
- Protección contra inyección SQL
- CORS configurado
- Variables de entorno para secretos
- Protección contra doble envío de pedidos

---

## 🌐 Despliegue

### Backend
Recomendado: **Railway** ($5/mes) o **Render** (gratis)

1. Sube tu código a GitHub
2. Conecta con Railway/Render
3. Configura variables de entorno
4. Deploy automático

### Frontend
Recomendado: **Vercel** (gratis)

1. Conecta tu repositorio de GitHub
2. Configura variables de entorno
3. Deploy automático en cada push

### Base de Datos
Ya está en **Supabase** (cloud)

📖 **Guías completas**:
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía completa paso a paso
- [DEPLOY_RAPIDO.md](DEPLOY_RAPIDO.md) - Despliegue en 15 minutos

---

## 📝 Notas Importantes

1. **Carrito**: Se guarda en `cart_items` (base de datos), NO en localStorage
2. **Imágenes**: Actualmente usan rutas locales. Para producción, subir a Supabase Storage
3. **Emails**: Sistema triple con Gmail (principal), Resend (alternativa) y Formspree (respaldo)
4. **Gmail vs Resend**: 
   - Gmail: Envía a cualquier email, 500/día, fácil de configurar
   - Resend: Requiere dominio verificado, 3,000/mes, más profesional
5. **Google OAuth**: Opcional, el sistema funciona con email/password
6. **Tabla addresses**: Existe pero no está implementada (funcionalidad futura)
7. **WhatsApp**: Solo en página de Contacto con dos números (Ventas: +51 987 145 336, Consultas: +51 960 056 600). **No hay botón flotante de WhatsApp**.
8. **Asistente IA**: Botón flotante simple (56x56px) con botón de cerrar en el header. Sin auto-open ni animaciones complejas.
9. **Comprobantes**: Se generan automáticamente y se envían por email
9. **Seguridad**: Contraseñas hasheadas, JWT con expiración, RLS en Supabase
10. **Tracking Automático** 🆕: Avanza cada 5 segundos, muestra confeti y factura al finalizar
11. **Ofertas Flash** 🆕: Contador regresivo real, animaciones estilo Temu/Shein
12. **Newsletter** 🆕: Envía 4 ofertas exclusivas automáticamente al suscribirse
13. **Footer Funcional** 🆕: 12 enlaces a páginas de información completas
14. **Iconos** 🆕: Toda la app usa Lucide React en lugar de emojis
15. **Marcas Afiliadas** 🆕: 6 marcas con logos de alta calidad (Nike, Adidas, Jordan, Puma, New Balance, Converse)
16. **Asistente IA** 🆕: Botón flotante simple con chat inteligente para clientes y administradores. Sin auto-open, requiere clic del usuario.

---

## 🐛 Solución de Problemas

### Error: "Failed to resolve import @supabase/supabase-js"
```bash
cd frontend
npm install @supabase/supabase-js
```

### Error: "401 Unauthorized" en login
- Verificar que el usuario admin existe en la BD
- Ejecutar `backend/supabase_setup_complete.sql` completo

### Pedidos duplicados
- Protección implementada contra doble clic
- Si hay duplicados, usar script de limpieza en SQL Editor

### Carrito no persiste
- Verificar que la tabla `cart_items` existe
- Verificar que las columnas `selected_size` y `selected_color` existen

---

## 📞 Contacto

Para soporte o consultas sobre el proyecto:
- Email: adminSporta@depor.pe
- Teléfono: +51 925 841 052
- WhatsApp Ventas: +51 987 145 336
- WhatsApp Consultas: +51 960 056 600

### Configurar Números de WhatsApp

Para cambiar los números de WhatsApp en la página de Contacto, edita `frontend/src/pages/Contact.jsx`:

```javascript
// Busca la sección de WhatsApp y actualiza los números:
<a
  href="https://wa.me/51987145336?text=..."  // Cambia este número (Ventas)
  className="..."
>
  <Phone className="..." />
  Ventas: +51 987 145 336
</a>

<a
  href="https://wa.me/51960056600?text=..."  // Cambia este número (Consultas)
  className="..."
>
  <MessageCircle className="..." />
  Consultas: +51 960 056 600
</a>
```

**Formato del número**: Código de país + número sin espacios ni símbolos
- Ejemplo Perú: `51987654321`
- Ejemplo México: `525512345678`
- Ejemplo España: `34612345678`

**Nota**: El componente `WhatsAppButton.jsx` existe en el proyecto pero no se usa. WhatsApp solo está disponible en la página de Contacto.

---

## 📚 Documentación Adicional

### Configuración
- **[backend/GMAIL_SETUP.md](backend/GMAIL_SETUP.md)** - Configuración de Gmail para emails
- **[backend/RESEND_SETUP.md](backend/RESEND_SETUP.md)** - Configuración de Resend (alternativa)
- **[frontend/GOOGLE_OAUTH_SETUP.md](frontend/GOOGLE_OAUTH_SETUP.md)** - Configuración de Google OAuth

### Despliegue
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de despliegue paso a paso
- **[DEPLOY_RAPIDO.md](DEPLOY_RAPIDO.md)** - Despliegue rápido en 15 minutos
- **[frontend/VERCEL_DEPLOYMENT.md](frontend/VERCEL_DEPLOYMENT.md)** - Despliegue en Vercel

### Sistemas y Funcionalidades 🆕
- **[ASISTENTE_VIRTUAL_IA.md](ASISTENTE_VIRTUAL_IA.md)** - Asistente Virtual con IA (Cliente y Admin)
- **[GUIA_RAPIDA_ASISTENTE.md](GUIA_RAPIDA_ASISTENTE.md)** - Guía rápida del Asistente IA
- **[MEJORAS_ASISTENTE_IA.md](MEJORAS_ASISTENTE_IA.md)** - Historial de mejoras del asistente
- **[SOLUCION_ERRORES_ASISTENTE.md](SOLUCION_ERRORES_ASISTENTE.md)** - Solución de errores del asistente
- **[ASISTENTE_BIENVENIDA_AUTOMATICA.md](ASISTENTE_BIENVENIDA_AUTOMATICA.md)** - Sistema de bienvenida automática (revertido)
- **[BOTONES_FLOTANTES_ORGANIZADOS.md](BOTONES_FLOTANTES_ORGANIZADOS.md)** - Organización de botones flotantes
- **[SISTEMA_EMAILS.md](SISTEMA_EMAILS.md)** - Documentación del sistema de emails
- **[SISTEMA_NEWSLETTER.md](SISTEMA_NEWSLETTER.md)** - Sistema de newsletter con ofertas
- **[SISTEMA_OFERTAS_FLASH.md](SISTEMA_OFERTAS_FLASH.md)** - Ofertas flash estilo Temu/Shein
- **[SISTEMA_SEGUIMIENTO_PEDIDOS.md](SISTEMA_SEGUIMIENTO_PEDIDOS.md)** - Sistema de seguimiento
- **[TRACKING_AUTOMATICO.md](TRACKING_AUTOMATICO.md)** - Tracking automático cada 5 segundos
- **[FOOTER_FUNCIONAL.md](FOOTER_FUNCIONAL.md)** - Footer con páginas de información
- **[INTEGRACION_OFERTAS_MARCAS.md](INTEGRACION_OFERTAS_MARCAS.md)** - Ofertas y marcas afiliadas
- **[SOLUCION_CORS.md](SOLUCION_CORS.md)** - Solución de problemas CORS

### Frontend
- **[frontend/README.md](frontend/README.md)** - Documentación específica del frontend

---

## �📄 Licencia

Este proyecto es privado y confidencial.

---

**Desarrollado con ❤️ para SPORTA**
