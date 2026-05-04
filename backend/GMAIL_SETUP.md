# 📧 Configuración de Gmail para Envío de Emails

Guía rápida para configurar Gmail y enviar emails a **cualquier dirección**.

---

## 🚀 Configuración en 3 Pasos

### Paso 1: Habilitar Verificación en Dos Pasos

1. Ve a https://myaccount.google.com/security
2. Busca **"Verificación en dos pasos"**
3. Haz clic en **"Comenzar"**
4. Sigue las instrucciones (necesitarás tu teléfono)

### Paso 2: Generar Contraseña de Aplicación

1. Ve a https://myaccount.google.com/apppasswords
2. En "Seleccionar app", elige **"Correo"**
3. En "Seleccionar dispositivo", elige **"Otro (nombre personalizado)"**
4. Escribe: **"SPORTA Backend"**
5. Haz clic en **"Generar"**
6. **Copia la contraseña de 16 caracteres** (formato: `xxxx xxxx xxxx xxxx`)

### Paso 3: Configurar en `.env`

Edita `backend/.env` y agrega:

```env
# Gmail Configuration
GMAIL_USER=tu-email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
GMAIL_FROM=SPORTA <tu-email@gmail.com>
```

**Reinicia el servidor:**
```bash
cd backend
npm start
```

---

## ✅ ¡Listo!

Ahora puedes enviar emails a **cualquier dirección**, no solo a la tuya.

### Prioridad de Envío:

1. **Gmail** (si está configurado) ← Permite enviar a cualquier email
2. **Resend** (si Gmail falla) ← Solo a tu email en plan gratuito
3. **Formspree** (respaldo final)

---

## 🧪 Probar

1. Realiza una compra con **cualquier email**
2. El comprobante llegará a ese email
3. Revisa los logs del servidor:

```
📧 Enviando email de confirmación...
📧 Enviando email con Gmail a: cliente@ejemplo.com
✅ Email enviado exitosamente con Gmail
```

---

## 🔒 Seguridad

- ✅ Usa contraseña de aplicación, NO tu contraseña normal
- ✅ La contraseña de aplicación es específica para esta app
- ✅ Puedes revocarla en cualquier momento
- ✅ No compartas el archivo `.env`

---

## 📊 Límites de Gmail

**Gmail Gratuito:**
- 500 emails por día
- 100 destinatarios por email

**Suficiente para:**
- Tiendas pequeñas y medianas
- Desarrollo y pruebas
- Primeros clientes

---

## 🚀 Para Producción

Si necesitas enviar más emails:

1. **Verifica un dominio en Resend** (recomendado)
2. **Usa SendGrid** (100 emails/día gratis)
3. **Usa Mailgun** (5,000 emails/mes gratis)
4. **Actualiza a Gmail Workspace** (sin límites)

---

**Desarrollado con ❤️ para SPORTA**
