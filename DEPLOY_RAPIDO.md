# ⚡ Despliegue Rápido - SPORTA

Guía express para desplegar en 15 minutos.

---

## 🚀 Pasos Rápidos

### 1️⃣ Subir a GitHub (2 min)

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/sporta-ecommerce.git
git push -u origin main
```

---

### 2️⃣ Desplegar Backend en Railway (5 min)

1. Ve a https://railway.app
2. Login con GitHub
3. **New Project** → **Deploy from GitHub repo**
4. Selecciona tu repo
5. **Settings**:
   - Root Directory: `backend`
   - Start Command: `npm start`
6. **Variables** (copia y pega):
   ```env
   PORT=3001
   NODE_ENV=production
   SUPABASE_URL=https://avylpaegukxkobyvxzhq.supabase.co
   SUPABASE_ANON_KEY=tu_key
   JWT_SECRET=tu_secret
   GMAIL_USER=valentinocuen123@gmail.com
   GMAIL_APP_PASSWORD=klye jfsz gfzp qunz
   GMAIL_FROM=SPORTA <valentinocuen123@gmail.com>
   ```
7. **Deploy** → Espera 3 min
8. **Copia la URL**: `https://tu-backend.up.railway.app`

---

### 3️⃣ Desplegar Frontend en Vercel (5 min)

1. Ve a https://vercel.com
2. Login con GitHub
3. **Add New** → **Project**
4. Selecciona tu repo
5. **Settings**:
   - Framework: `Vite`
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Environment Variables**:
   ```env
   VITE_API_URL=https://tu-backend.up.railway.app
   VITE_SUPABASE_URL=https://avylpaegukxkobyvxzhq.supabase.co
   VITE_SUPABASE_ANON_KEY=tu_key
   VITE_GOOGLE_CLIENT_ID=tu_client_id
   ```
7. **Deploy** → Espera 2 min
8. **Copia la URL**: `https://tu-app.vercel.app`

---

### 4️⃣ Configurar CORS (1 min)

En Railway, agrega variable:
```env
FRONTEND_URL=https://tu-app.vercel.app
```

Redeploy el backend.

---

### 5️⃣ Configurar Supabase (2 min)

1. Ve a Supabase → **Settings** → **Authentication**
2. **Site URL**: `https://tu-app.vercel.app`
3. **Redirect URLs**: 
   ```
   https://tu-app.vercel.app
   https://tu-app.vercel.app/auth/callback
   ```

---

## ✅ Verificar

1. Abre `https://tu-app.vercel.app`
2. Regístrate
3. Agrega productos al carrito
4. Completa una compra
5. Verifica que llegue el email

---

## 🎉 ¡Listo!

Tu app está en producción.

**URLs**:
- App: `https://tu-app.vercel.app`
- API: `https://tu-backend.up.railway.app/api/health`

---

## 🐛 Problemas?

**Backend no funciona**:
- Revisa logs en Railway → Deployments → View Logs
- Verifica variables de entorno

**Frontend no conecta**:
- Verifica `VITE_API_URL` en Vercel
- Verifica `FRONTEND_URL` en Railway

**Emails no llegan**:
- Verifica variables `GMAIL_*` en Railway
- Revisa logs del backend

---

**Guía completa**: Ver [DEPLOYMENT.md](DEPLOYMENT.md)
