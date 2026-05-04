# 🔧 Solución de Problemas CORS

## ❌ Error: "Not allowed by CORS"

Este error aparece cuando el frontend intenta conectarse al backend desde una URL no permitida.

---

## 🎯 Soluciones según el Escenario

### ⚠️ Escenario 0: Abriendo index.html directamente (file://)

**Síntomas:**
- Error: `Not allowed by CORS`
- En los logs del backend ves: `file:///C:/Users/...`
- Estás abriendo `index.html` directamente en el navegador

**Problema:**
No estás ejecutando el servidor de desarrollo de Vite. Estás abriendo el archivo HTML directamente.

**✅ SOLUCIÓN:**

1. **Abre una terminal en la carpeta del proyecto**

2. **Navega al frontend:**
   ```bash
   cd frontend
   ```

3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

4. **Abre el navegador en la URL que aparece:**
   ```
   ➜  Local:   http://localhost:5173/
   ```

5. **NO abras el archivo `index.html` directamente**

---

### Escenario 1: Desarrollo Local (localhost)

**Síntomas:**
- Frontend en `http://localhost:5173`
- Backend en `http://localhost:3001`
- Error CORS

**Solución:**

✅ **Ya está arreglado** en el código. Solo reinicia el servidor:

```bash
# Detén el backend (Ctrl+C)
cd backend
npm start
```

---

### Escenario 2: Desarrollo en Red Local (192.168.x.x)

**Síntomas:**
- Frontend en `http://192.168.x.x:5173`
- Backend en `http://192.168.x.x:3001`
- Error CORS

**Solución:**

✅ **Ya está arreglado** en el código. El backend ahora permite IPs locales automáticamente.

---

### Escenario 3: Producción (Vercel + Railway/Render)

**Síntomas:**
- Frontend desplegado en Vercel
- Backend desplegado en Railway/Render
- Error CORS

**Solución:**

1. **En Railway/Render**, agrega la variable de entorno:
   ```env
   FRONTEND_URL=https://tu-app.vercel.app
   ```

2. **Redeploy** el backend

3. **Verifica** que la URL sea exacta (sin `/` al final)

---

## 🔍 Diagnóstico

### Paso 1: Verificar qué URL está bloqueada

Revisa los logs del backend. Deberías ver:
```
⚠️ CORS bloqueado para origen: http://alguna-url
```

### Paso 2: Verificar configuración

**Backend (`backend/.env`):**
```env
FRONTEND_URL=https://tu-app.vercel.app
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=http://localhost:3001
```

O en producción:
```env
VITE_API_URL=https://tu-backend.railway.app
```

---

## ✅ Verificar que Funciona

### Desarrollo Local

1. **Inicia el backend**:
   ```bash
   cd backend
   npm start
   ```

2. **Inicia el frontend** (en otra terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Abre el navegador**: `http://localhost:5173`

4. **Abre la consola del navegador** (F12)

5. **Verifica que NO haya errores CORS**

---

## 🚀 Configuración para Producción

### Cuando despliegues:

1. **Despliega el backend primero** (Railway/Render)
   - Copia la URL: `https://tu-backend.railway.app`

2. **Configura el frontend** (Vercel)
   - Variable: `VITE_API_URL=https://tu-backend.railway.app`

3. **Configura el backend** (Railway/Render)
   - Variable: `FRONTEND_URL=https://tu-app.vercel.app`

4. **Redeploy ambos** si es necesario

---

## 🐛 Problemas Comunes

### Error persiste después de cambiar .env

**Solución:**
```bash
# Detén el servidor (Ctrl+C)
# Reinicia
npm start
```

### Error solo en producción

**Checklist:**
- [ ] `FRONTEND_URL` configurada en Railway/Render
- [ ] URL exacta (sin `/` al final)
- [ ] Backend redeployado después de cambiar variables
- [ ] Frontend tiene la URL correcta del backend

### Error en red local (192.168.x.x)

**Solución:**
✅ Ya está arreglado. El código ahora permite automáticamente:
- `192.168.x.x`
- `10.x.x.x`
- `172.16-31.x.x`
- `localhost`
- `127.0.0.1`

---

## 📝 Configuración Actual

El backend ahora permite:

1. ✅ `http://localhost:5173` (desarrollo)
2. ✅ `http://localhost:3000` (alternativo)
3. ✅ `http://127.0.0.1:5173` (alternativo)
4. ✅ Cualquier IP local (`192.168.x.x`, `10.x.x.x`, etc.)
5. ✅ `https://sporta-tawny.vercel.app` (producción actual)
6. ✅ Cualquier dominio `.vercel.app` (preview deployments)
7. ✅ La URL en `FRONTEND_URL` (variable de entorno)
8. ✅ Requests sin origin (Postman, apps móviles)

---

## 🎯 Próximos Pasos

1. **Reinicia el backend** si aún no lo has hecho
2. **Verifica que funcione** en desarrollo local
3. **Cuando despliegues**, sigue la guía de [DEPLOYMENT.md](DEPLOYMENT.md)

---

**Desarrollado con ❤️ para SPORTA**
