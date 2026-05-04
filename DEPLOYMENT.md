# 🚀 Guía de Despliegue - SPORTA E-Commerce

Guía completa para desplegar tu aplicación en producción.

---

## 📋 Tabla de Contenidos

1. [Preparación](#preparación)
2. [Desplegar Backend](#desplegar-backend)
3. [Desplegar Frontend](#desplegar-frontend)
4. [Configuración Final](#configuración-final)
5. [Verificación](#verificación)
6. [Mantenimiento](#mantenimiento)

---

## 🎯 Arquitectura de Despliegue

```
Frontend (Vercel)  →  Backend (Railway/Render)  →  Base de Datos (Supabase)
     ↓                        ↓                           ↓
  Usuarios              API REST                    PostgreSQL
```

---

## 📦 Preparación

### 1. Verificar que Todo Funciona Localmente

```bash
# Backend
cd backend
npm start
# Debe iniciar sin errores

# Frontend (en otra terminal)
cd frontend
npm run dev
# Debe abrir en http://localhost:5173
```

### 2. Crear Cuentas Necesarias

- ✅ **Vercel** (frontend): https://vercel.com - Gratis
- ✅ **Railway** (backend): https://railway.app - $5/mes (recomendado)
- ✅ **Render** (backend alternativo): https://render.com - Gratis
- ✅ **Supabase** (base de datos): Ya tienes cuenta

### 3. Preparar Repositorio Git

```bash
# Si no tienes Git inicializado
git init
git add .
git commit -m "Preparar para despliegue"

# Crear repositorio en GitHub
# Ve a https://github.com/new
# Crea un repositorio llamado "sporta-ecommerce"

# Conectar y subir
git remote add origin https://github.com/TU_USUARIO/sporta-ecommerce.git
git branch -M main
git push -u origin main
```

---

## 🔧 Desplegar Backend

### Opción A: Railway (Recomendado) 💎

**Ventajas:**
- ✅ Muy fácil de usar
- ✅ Variables de entorno simples
- ✅ Logs en tiempo real
- ✅ Dominio HTTPS automático
- ✅ $5/mes (500 horas gratis al mes)

**Pasos:**

1. **Ve a Railway**: https://railway.app
2. **Inicia sesión** con GitHub
3. **Clic en "New Project"**
4. **Selecciona "Deploy from GitHub repo"**
5. **Selecciona tu repositorio** `sporta-ecommerce`
6. **Configura el proyecto**:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

7. **Agregar Variables de Entorno**:

   Ve a **Variables** y agrega:

   ```env
   PORT=3001
   NODE_ENV=production
   
   # Supabase
   SUPABASE_URL=https://avylpaegukxkobyvxzhq.supabase.co
   SUPABASE_ANON_KEY=tu_supabase_key
   
   # JWT
   JWT_SECRET=tu_jwt_secret_super_seguro
   
   # Gmail
   GMAIL_USER=valentinocuen123@gmail.com
   GMAIL_APP_PASSWORD=klye jfsz gfzp qunz
   GMAIL_FROM=SPORTA <valentinocuen123@gmail.com>
   
   # Resend (opcional)
   RESEND_API_KEY=re_U263tAvD_2pUvHQj3h4863e3EeY3LzgDY
   RESEND_FROM_EMAIL=SPORTA <onboarding@resend.dev>
   
   # Frontend URL (lo agregarás después)
   FRONTEND_URL=https://tu-app.vercel.app
   ```

8. **Deploy**:
   - Railway desplegará automáticamente
   - Espera 2-3 minutos
   - Copia la URL generada (ej: `https://sporta-backend.up.railway.app`)

9. **Verificar**:
   ```
   https://tu-backend.railway.app/api/health
   ```
   Deberías ver: `{"status":"ok",...}`

---

### Opción B: Render (Gratis) 🆓

**Ventajas:**
- ✅ Completamente gratis
- ✅ Fácil de usar
- ✅ HTTPS automático

**Desventajas:**
- ⚠️ Se duerme después de 15 min de inactividad
- ⚠️ Primera carga lenta (30 segundos)

**Pasos:**

1. **Ve a Render**: https://render.com
2. **Inicia sesión** con GitHub
3. **Clic en "New +"** → **"Web Service"**
4. **Conecta tu repositorio** `sporta-ecommerce`
5. **Configura**:
   - Name: `sporta-backend`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**

6. **Variables de Entorno**:
   
   Clic en **"Advanced"** → **"Add Environment Variable"**
   
   Agrega las mismas variables que en Railway (ver arriba)

7. **Deploy**:
   - Clic en **"Create Web Service"**
   - Espera 5-10 minutos
   - Copia la URL (ej: `https://sporta-backend.onrender.com`)

8. **Verificar**:
   ```
   https://tu-backend.onrender.com/api/health
   ```

---

## 🎨 Desplegar Frontend

### Vercel (Recomendado) ⚡

**Ventajas:**
- ✅ Gratis ilimitado
- ✅ Súper rápido
- ✅ Dominio personalizado gratis
- ✅ HTTPS automático
- ✅ Deploy automático en cada push

**Pasos:**

1. **Ve a Vercel**: https://vercel.com
2. **Inicia sesión** con GitHub
3. **Clic en "Add New..."** → **"Project"**
4. **Importa tu repositorio** `sporta-ecommerce`
5. **Configura**:
   - Framework Preset: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Variables de Entorno**:

   Clic en **"Environment Variables"** y agrega:

   ```env
   VITE_API_URL=https://tu-backend.railway.app
   VITE_SUPABASE_URL=https://avylpaegukxkobyvxzhq.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_supabase_key
   VITE_GOOGLE_CLIENT_ID=tu_google_client_id
   ```

   **⚠️ IMPORTANTE**: Reemplaza `https://tu-backend.railway.app` con la URL real de tu backend

7. **Deploy**:
   - Clic en **"Deploy"**
   - Espera 2-3 minutos
   - Copia la URL (ej: `https://sporta-tawny.vercel.app`)

8. **Verificar**:
   - Abre la URL de Vercel
   - Deberías ver tu aplicación funcionando

---

## ⚙️ Configuración Final

### 1. Actualizar CORS en Backend

**En Railway/Render**, actualiza la variable de entorno:

```env
FRONTEND_URL=https://tu-app.vercel.app
```

Reemplaza con tu URL real de Vercel.

### 2. Verificar Supabase

1. Ve a tu proyecto en Supabase
2. **Settings** → **API**
3. Verifica que la URL y la key sean correctas
4. **Authentication** → **URL Configuration**
5. Agrega tu URL de Vercel a **Site URL**:
   ```
   https://tu-app.vercel.app
   ```
6. Agrega a **Redirect URLs**:
   ```
   https://tu-app.vercel.app
   https://tu-app.vercel.app/auth/callback
   ```

### 3. Configurar Google OAuth (si lo usas)

1. Ve a [Google Cloud Console](https://console.cloud.google.com)
2. **APIs & Services** → **Credentials**
3. Edita tu OAuth 2.0 Client ID
4. Agrega a **Authorized JavaScript origins**:
   ```
   https://tu-app.vercel.app
   ```
5. Agrega a **Authorized redirect URIs**:
   ```
   https://tu-app.vercel.app
   https://tu-app.vercel.app/auth/callback
   ```

---

## ✅ Verificación

### Checklist de Funcionalidades

Prueba cada una en producción:

- [ ] **Página principal** carga correctamente
- [ ] **Registro de usuario** funciona
- [ ] **Login** funciona
- [ ] **Google OAuth** funciona (si está configurado)
- [ ] **Catálogo de productos** se muestra
- [ ] **Agregar al carrito** funciona
- [ ] **Checkout** funciona
- [ ] **Email de confirmación** llega
- [ ] **Panel de admin** funciona
- [ ] **WhatsApp flotante** funciona

### Probar Compra Completa

1. Crea una cuenta nueva
2. Agrega productos al carrito
3. Completa el checkout
4. Verifica que llegue el email
5. Inicia sesión como admin
6. Verifica que el pedido aparezca

---

## 🔒 Seguridad en Producción

### 1. Cambiar Secretos

**⚠️ IMPORTANTE**: Genera nuevos secretos para producción:

```bash
# Generar nuevo JWT_SECRET
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Actualiza `JWT_SECRET` en Railway/Render.

### 2. Verificar Variables de Entorno

- ✅ Nunca subas el archivo `.env` a Git
- ✅ Usa variables de entorno en Railway/Render/Vercel
- ✅ Cambia contraseñas de producción

### 3. Configurar HTTPS

- ✅ Railway/Render/Vercel ya incluyen HTTPS
- ✅ Verifica que todas las URLs usen `https://`

---

## 📊 Monitoreo

### Railway

- **Logs**: Ve a tu proyecto → **Deployments** → **View Logs**
- **Métricas**: CPU, RAM, Network en tiempo real

### Render

- **Logs**: Ve a tu servicio → **Logs**
- **Eventos**: Ve a **Events** para ver deploys

### Vercel

- **Analytics**: Ve a tu proyecto → **Analytics**
- **Logs**: Ve a **Deployments** → Clic en un deploy → **Logs**

---

## 🔄 Actualizaciones

### Deploy Automático

Cada vez que hagas `git push`, se desplegará automáticamente:

```bash
# Hacer cambios
git add .
git commit -m "Descripción de cambios"
git push

# Railway/Render/Vercel detectarán el push y desplegarán automáticamente
```

### Deploy Manual

**Railway**:
- Ve a tu proyecto → **Deployments** → **Deploy**

**Render**:
- Ve a tu servicio → **Manual Deploy** → **Deploy latest commit**

**Vercel**:
- Ve a tu proyecto → **Deployments** → **Redeploy**

---

## 🐛 Solución de Problemas

### Backend no inicia

**Revisar logs**:
- Railway: Deployments → View Logs
- Render: Logs tab

**Errores comunes**:
- Variables de entorno faltantes
- Puerto incorrecto (debe ser el que Railway/Render asigna)
- Dependencias no instaladas

### Frontend no conecta con Backend

**Verificar**:
1. `VITE_API_URL` en Vercel apunta a la URL correcta del backend
2. CORS configurado en backend con la URL de Vercel
3. Backend está corriendo (visita `/api/health`)

### Emails no se envían

**Verificar**:
1. Variables `GMAIL_*` configuradas en Railway/Render
2. Contraseña de aplicación correcta
3. Revisar logs del backend

### Base de datos no conecta

**Verificar**:
1. `SUPABASE_URL` y `SUPABASE_ANON_KEY` correctas
2. Supabase no está pausado (plan gratuito)
3. Tablas creadas correctamente

---

## 💰 Costos Estimados

### Plan Inicial (Gratis - $5/mes)

- **Frontend (Vercel)**: Gratis ✅
- **Backend (Railway)**: $5/mes 💎
- **Backend (Render)**: Gratis (con limitaciones) 🆓
- **Base de Datos (Supabase)**: Gratis ✅
- **Gmail**: Gratis ✅

**Total**: $0 - $5/mes

### Plan Crecimiento ($20-50/mes)

- **Frontend (Vercel Pro)**: $20/mes
- **Backend (Railway)**: $10-20/mes
- **Base de Datos (Supabase Pro)**: $25/mes
- **Resend con dominio**: Gratis hasta 3,000 emails

**Total**: $55-65/mes

---

## 📞 Soporte

### Documentación Oficial

- **Railway**: https://docs.railway.app
- **Render**: https://render.com/docs
- **Vercel**: https://vercel.com/docs
- **Supabase**: https://supabase.com/docs

### Comunidades

- **Railway Discord**: https://discord.gg/railway
- **Render Community**: https://community.render.com
- **Vercel Discord**: https://vercel.com/discord

---

## ✅ Checklist Final

Antes de considerar el despliegue completo:

- [ ] Backend desplegado y funcionando
- [ ] Frontend desplegado y funcionando
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Supabase configurado
- [ ] Google OAuth configurado (si aplica)
- [ ] Emails funcionando
- [ ] Compra de prueba exitosa
- [ ] Panel de admin accesible
- [ ] Dominio personalizado (opcional)
- [ ] Monitoreo configurado

---

## 🎉 ¡Felicidades!

Tu aplicación SPORTA está ahora en producción y lista para recibir clientes reales.

**URLs de tu aplicación**:
- Frontend: `https://tu-app.vercel.app`
- Backend: `https://tu-backend.railway.app`
- Admin: `https://tu-app.vercel.app` (login con cuenta admin)

---

**Desarrollado con ❤️ para SPORTA**
**Fecha**: 4 de mayo de 2026
