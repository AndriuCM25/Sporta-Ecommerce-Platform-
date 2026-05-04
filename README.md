# 🏃‍♂️ SPORTA E-Commerce Platform

Plataforma de e-commerce moderna y completa para venta de zapatillas deportivas, desarrollada con React, Node.js y Supabase. Incluye sistema de autenticación, carrito persistente, múltiples métodos de pago, panel de administración avanzado y **botón flotante de WhatsApp**.

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
- 📍 **Gestión de direcciones** con 43 distritos de Lima
- 📧 **Email automático con comprobante** al completar compra (Resend)
- 📄 **Descarga de comprobantes** en formato TXT
- 💬 **WhatsApp flotante** con dos opciones (Ventas y Consultas)
- 🎨 **Diseño moderno y responsivo** con animaciones suaves
- 🚚 **Envío gratis** en compras mayores a S/150

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
│   │   │   ├── orders.js        # Gestión de pedidos
│   │   │   └── products.js      # Catálogo de productos
│   │   ├── services/
│   │   │   └── emailService.js  # Servicio de envío de emails (Resend)
│   │   ├── db.js                # Conexión a Supabase
│   │   └── index.js             # Servidor Express
│   ├── .env                     # Variables de entorno
│   ├── .env.example             # Ejemplo de variables
│   ├── .gitignore               # Archivos ignorados
│   ├── package.json             # Dependencias del backend
│   ├── start.bat                # Script de inicio (Windows)
│   ├── restart.bat              # Script de reinicio (Windows)
│   ├── RESEND_SETUP.md          # Guía de configuración de Resend
│   └── supabase_setup_complete.sql  # Setup completo de BD
│
├── frontend/
│   ├── public/
│   │   ├── sporta.svg           # Logo
│   │   └── SportaVideoPublicitario.mp4
│   ├── src/
│   │   ├── assets/              # Imágenes de productos
│   │   │   ├── modelo1-5.png    # Imágenes de modelos
│   │   │   ├── shoe1-6.jpg      # Imágenes de zapatillas
│   │   │   └── Sporta_BLACK-logo.png
│   │   ├── components/
│   │   │   ├── AdminDashboard.jsx   # Panel de administración
│   │   │   ├── Auth.jsx             # Modal de login/registro
│   │   │   ├── Cart.jsx             # Carrito lateral
│   │   │   ├── Footer.jsx           # Pie de página
│   │   │   ├── Hero.jsx             # Banner principal
│   │   │   ├── Navbar.jsx           # Barra de navegación
│   │   │   ├── ProductCard.jsx      # Tarjeta de producto
│   │   │   ├── Stats.jsx            # Estadísticas
│   │   │   └── WhatsAppButton.jsx   # Botón flotante de WhatsApp
│   │   ├── pages/
│   │   │   ├── About.jsx            # Página Nosotros
│   │   │   ├── Checkout.jsx         # Proceso de pago
│   │   │   ├── Contact.jsx          # Formulario de contacto
│   │   │   ├── Home.jsx             # Página principal
│   │   │   ├── ProductDetail.jsx    # Detalle de producto
│   │   │   └── Products.jsx         # Catálogo
│   │   ├── api.js               # Cliente API
│   │   ├── App.jsx              # Componente principal
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
│   └── README.md                # Documentación del frontend
│
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
- **WhatsApp flotante** con dos opciones:
  - 🛍️ Ventas: Para consultas de productos y compras
  - 💬 Información: Para dudas generales
- **Animaciones suaves** con Framer Motion
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
7. **WhatsApp**: Configurado con dos números (Ventas e Información)
8. **Comprobantes**: Se generan automáticamente y se envían por email
9. **Seguridad**: Contraseñas hasheadas, JWT con expiración, RLS en Supabase

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

Para cambiar los números de WhatsApp del botón flotante, edita `frontend/src/components/WhatsAppButton.jsx`:

```javascript
const WHATSAPP_OPTIONS = [
  {
    id: 1,
    name: 'Ventas',
    number: '51987145336',  // Cambia este número
    message: '¡Hola! Me gustaría realizar una compra...',
    icon: '🛍️'
  },
  {
    id: 2,
    name: 'Información / Consultas',
    number: '51960056600',  // Cambia este número
    message: '¡Hola! Tengo una consulta sobre Sporta.',
    icon: '💬'
  }
]
```

**Formato del número**: Código de país + número sin espacios ni símbolos
- Ejemplo Perú: `51987654321`
- Ejemplo México: `525512345678`
- Ejemplo España: `34612345678`

---

## 📚 Documentación Adicional

### Configuración
- **[backend/GMAIL_SETUP.md](backend/GMAIL_SETUP.md)** - Configuración de Gmail para emails
- **[backend/RESEND_SETUP.md](backend/RESEND_SETUP.md)** - Configuración de Resend (alternativa)
- **[frontend/GOOGLE_OAUTH_SETUP.md](frontend/GOOGLE_OAUTH_SETUP.md)** - Configuración de Google OAuth

### Despliegue
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Guía completa de despliegue paso a paso
- **[DEPLOY_RAPIDO.md](DEPLOY_RAPIDO.md)** - Despliegue rápido en 15 minutos

### Sistema
- **[SISTEMA_EMAILS.md](SISTEMA_EMAILS.md)** - Documentación del sistema de emails
- **[frontend/README.md](frontend/README.md)** - Documentación del frontend

---
- **[backend/EMAIL_PREVIEW.md](backend/EMAIL_PREVIEW.md)** - Vista previa del diseño de emails
- **[frontend/GOOGLE_OAUTH_SETUP.md](frontend/GOOGLE_OAUTH_SETUP.md)** - Guía para OAuth 2.0
- **[frontend/README.md](frontend/README.md)** - Documentación específica del frontend

---

## �📄 Licencia

Este proyecto es privado y confidencial.

---

**Desarrollado con ❤️ para SPORTA**
