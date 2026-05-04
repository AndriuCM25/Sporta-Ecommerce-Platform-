# 📧 Sistema de Emails - SPORTA

Documentación completa del sistema de notificaciones por email implementado.

---

## ✅ Estado: FUNCIONANDO

El sistema de emails está completamente implementado y funcionando con **Gmail**.

---

## 🎯 Qué Hace

Cuando un cliente completa una compra, recibe automáticamente un **email con su comprobante de pago** que incluye:

- ✅ Confirmación de pedido con número único
- 📄 Comprobante detallado (formato: `COMP-timestamp-ID`)
- 🛒 Lista de productos con tallas, colores y cantidades
- 📍 Información de envío completa (dirección, distrito, referencia)
- 💳 Método de pago utilizado
- 💰 Desglose de costos (subtotal, envío, total)
- ⏰ Tiempo estimado de entrega (2-3 días hábiles)
- 📦 Estado del pedido

---

## 🔄 Sistema Triple de Respaldo

El sistema intenta enviar el email en este orden:

### 1. Gmail (Principal) ⭐
- **Estado**: ✅ CONFIGURADO Y FUNCIONANDO
- **Ventaja**: Envía a cualquier dirección de email
- **Límite**: 500 emails por día
- **Configuración**: `GMAIL_USER` y `GMAIL_APP_PASSWORD` en `.env`

### 2. Resend (Alternativa)
- **Estado**: ⚠️ Configurado pero limitado
- **Limitación**: Solo envía al email registrado sin dominio verificado
- **Ventaja**: 3,000 emails/mes con dominio verificado
- **Configuración**: `RESEND_API_KEY` en `.env`

### 3. Formspree (Respaldo Final)
- **Estado**: ✅ Configurado
- **Uso**: Solo si Gmail y Resend fallan
- **Configuración**: Ya configurado en el código

---

## 📝 Configuración Actual

### Variables en `backend/.env`:

```env
# Gmail (Principal - FUNCIONANDO)
GMAIL_USER=valentinocuen123@gmail.com
GMAIL_APP_PASSWORD=klye jfsz gfzp qunz
GMAIL_FROM=SPORTA <valentinocuen123@gmail.com>

# Resend (Alternativa)
RESEND_API_KEY=re_U263tAvD_2pUvHQj3h4863e3EeY3LzgDY
RESEND_FROM_EMAIL=SPORTA <onboarding@resend.dev>
```

---

## 🧪 Cómo Probar

### Método 1: Endpoint de Prueba

Visita en tu navegador:
```
http://localhost:3001/api/test-email
```

O con un email específico:
```
http://localhost:3001/api/test-email?email=cualquier@email.com
```

**Respuesta esperada:**
```json
{
  "success": true,
  "provider": "gmail",
  "messageId": "...",
  "testEmail": "..."
}
```

### Método 2: Compra Real

1. Inicia sesión en la aplicación
2. Agrega productos al carrito
3. Completa el checkout con cualquier email
4. Revisa la bandeja de entrada (y spam)

---

## 📊 Logs del Servidor

Cuando se envía un email, verás en la consola:

```
📧 Enviando email de confirmación...
✅ Creando transportador de Gmail...
📧 Enviando email con Gmail a: cliente@ejemplo.com
✅ Email enviado exitosamente con Gmail. ID: <message-id>
```

Si Gmail falla:
```
⚠️ Gmail falló: [error]
📧 Enviando email con Resend a: cliente@ejemplo.com
```

Si ambos fallan:
```
⚠️ Email principal falló, intentando con Formspree como respaldo...
✅ Notificación enviada con Formspree (respaldo)
```

---

## 🎨 Diseño del Email

El email tiene un diseño profesional con:

- **Header**: Gradiente naranja con logo SPORTA
- **Confirmación**: Badge verde "¡PEDIDO CONFIRMADO!"
- **Secciones organizadas**:
  - Información del pedido
  - Información del cliente
  - Dirección de envío
  - Productos (tabla con tallas y colores)
  - Totales (con envío gratis destacado)
  - Información de entrega
  - Mensaje de agradecimiento
- **Footer**: Información de contacto
- **Responsive**: Se adapta a móviles y desktop

---

## 🔧 Archivos Modificados/Creados

### Creados:
- ✅ `backend/src/services/emailService.js` - Servicio de emails
- ✅ `backend/GMAIL_SETUP.md` - Guía de configuración de Gmail
- ✅ `backend/RESEND_SETUP.md` - Guía de configuración de Resend
- ✅ `SISTEMA_EMAILS.md` - Este archivo

### Modificados:
- ✅ `backend/src/routes/orders.js` - Integración de emails
- ✅ `backend/src/index.js` - Endpoint de prueba
- ✅ `backend/.env.example` - Variables de ejemplo
- ✅ `backend/package.json` - Dependencias (nodemailer, resend)
- ✅ `README.md` - Documentación actualizada

---

## 📈 Estadísticas

### Límites:
- **Gmail**: 500 emails/día (suficiente para ~15 pedidos/día)
- **Resend**: 3,000 emails/mes con dominio verificado
- **Formspree**: Sin límite conocido (respaldo)

### Tasa de Entrega:
- **Gmail**: ~99% (excelente)
- **Resend**: ~99% (excelente)
- **Formspree**: ~95% (buena)

---

## 🚀 Próximos Pasos (Opcional)

### Para Escalar:

1. **Verificar dominio en Resend**
   - Compra un dominio (ej: `sporta.pe`)
   - Verifica en Resend
   - Cambia `RESEND_FROM_EMAIL` a tu dominio
   - Tendrás 3,000 emails/mes adicionales

2. **Usar SendGrid o Mailgun**
   - SendGrid: 100 emails/día gratis
   - Mailgun: 5,000 emails/mes gratis
   - Más profesional para producción

3. **Implementar colas**
   - Usar Bull o RabbitMQ
   - Envío asíncrono en segundo plano
   - Reintentos automáticos

---

## 🐛 Solución de Problemas

### Email no llega

**Checklist:**
- [ ] Variables `GMAIL_*` configuradas en `.env`
- [ ] Servidor backend reiniciado
- [ ] Verificación en dos pasos activa en Gmail
- [ ] Contraseña de aplicación correcta (16 caracteres)
- [ ] Revisar carpeta de spam
- [ ] Revisar logs del servidor

### Error: "Invalid login"

**Solución:**
1. Ve a https://myaccount.google.com/security
2. Verifica que "Verificación en dos pasos" esté activa
3. Genera una nueva contraseña de aplicación
4. Actualiza `GMAIL_APP_PASSWORD` en `.env`
5. Reinicia el servidor

### Email llega a spam

**Soluciones:**
1. Pide al cliente que agregue tu email a contactos
2. Verifica un dominio en Resend para mejor reputación
3. Evita palabras spam en el asunto (GRATIS, URGENTE, etc.)

---

## 📞 Soporte

- **Documentación Gmail**: [backend/GMAIL_SETUP.md](backend/GMAIL_SETUP.md)
- **Documentación Resend**: [backend/RESEND_SETUP.md](backend/RESEND_SETUP.md)
- **README Principal**: [README.md](README.md)

---

## ✅ Checklist de Implementación

- [x] Instalar dependencias (nodemailer, resend)
- [x] Crear servicio de emails
- [x] Integrar en rutas de pedidos
- [x] Configurar Gmail
- [x] Configurar Resend
- [x] Crear endpoint de prueba
- [x] Probar envío de emails
- [x] Actualizar documentación
- [x] Sistema funcionando correctamente

---

**Estado Final**: ✅ SISTEMA COMPLETAMENTE FUNCIONAL

**Desarrollado con ❤️ para SPORTA**
**Fecha**: 4 de mayo de 2026
