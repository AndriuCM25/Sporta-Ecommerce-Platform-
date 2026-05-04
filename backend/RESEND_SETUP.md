# 📧 Configuración de Resend para Envío de Emails

Guía rápida para configurar Resend y enviar emails automáticos cuando un cliente realiza una compra.

---

## 🚀 Configuración en 3 Pasos

### Paso 1: Obtener API Key de Resend

1. Ve a [resend.com](https://resend.com)
2. Crea una cuenta gratuita (o inicia sesión)
3. Ve a **API Keys** en el dashboard
4. Haz clic en **Create API Key**
5. Dale un nombre (ej: "SPORTA Backend")
6. Copia la API key que empieza con `re_`

**Plan Gratuito de Resend:**
- ✅ 100 emails por día
- ✅ 3,000 emails por mes
- ✅ Sin tarjeta de crédito requerida

### Paso 2: Configurar Variables de Entorno

Edita el archivo `backend/.env` y agrega:

```env
# Resend Configuration
RESEND_API_KEY=re_U263tAvD_2pUvHQj3h4863e3EeY3LzgDY
RESEND_FROM_EMAIL=SPORTA <onboarding@resend.dev>
```

**Notas importantes:**
- La API key que proporcionaste ya está lista para usar
- El email `onboarding@resend.dev` es el dominio de prueba de Resend
- Para producción, deberás verificar tu propio dominio

### Paso 3: Reiniciar el Servidor

```bash
cd backend
npm start
```

¡Listo! El sistema ya está configurado para enviar emails.

---

## 🧪 Probar el Sistema

### Realizar una Compra de Prueba

1. Inicia sesión en la aplicación
2. Agrega productos al carrito
3. Completa el checkout con tu email real
4. Revisa tu bandeja de entrada

**Logs esperados en la consola:**
```
📧 Enviando email de confirmación con Resend...
✅ Email enviado exitosamente con Resend
```

---

## 📧 Contenido del Email

El email incluye:

- ✅ Confirmación de pedido con número único
- 📄 Comprobante detallado
- 🛒 Lista de productos con tallas y colores
- 📍 Información de envío completa
- 💳 Método de pago
- 💰 Desglose de costos (subtotal, envío, total)
- ⏰ Tiempo estimado de entrega

---

## 🎨 Personalizar el Email

### Cambiar el Remitente

En `backend/.env`:
```env
RESEND_FROM_EMAIL=Tu Tienda <noreply@tudominio.com>
```

**Nota**: Para usar tu propio dominio, debes verificarlo en Resend:
1. Ve a **Domains** en el dashboard de Resend
2. Agrega tu dominio
3. Configura los registros DNS (SPF, DKIM, DMARC)
4. Espera la verificación

### Modificar el Diseño

Edita `backend/src/services/emailService.js`, función `generateReceiptHTML()`:

```javascript
// Cambiar colores
style="background: linear-gradient(135deg, #FF4500 0%, #e03d00 100%);"
// Por tu color:
style="background: linear-gradient(135deg, #TU_COLOR 0%, #TU_COLOR_2 100%);"

// Agregar logo
<img src="https://tudominio.com/logo.png" alt="SPORTA" style="width: 150px;">
```

---

## 🔧 Solución de Problemas

### Error: "API key not configured"

**Solución:**
1. Verifica que `RESEND_API_KEY` esté en `backend/.env`
2. Reinicia el servidor backend
3. La API key debe empezar con `re_`

### Email no llega

**Checklist:**
- [ ] API key configurada correctamente
- [ ] Servidor backend reiniciado
- [ ] Email del cliente es válido
- [ ] Revisar carpeta de spam
- [ ] Verificar logs del servidor

**Revisar logs:**
```bash
cd backend
npm start
# Busca mensajes que empiecen con 📧 o ❌
```

### Email llega a spam

**Soluciones:**
1. **Verifica tu dominio** en Resend (recomendado para producción)
2. **Configura SPF, DKIM y DMARC** en tu dominio
3. **Usa el dominio de prueba** (`onboarding@resend.dev`) solo para desarrollo

### Límite de emails alcanzado

**Plan Gratuito:**
- 100 emails/día
- 3,000 emails/mes

**Solución:**
- Espera 24 horas para que se reinicie el límite diario
- O actualiza a un plan de pago en Resend

---

## 🚀 Producción

### Verificar tu Dominio

Para usar tu propio dominio en producción:

1. **Agregar dominio en Resend:**
   - Ve a [Domains](https://resend.com/domains)
   - Clic en **Add Domain**
   - Ingresa tu dominio (ej: `tudominio.com`)

2. **Configurar DNS:**
   Resend te dará registros DNS para agregar:
   ```
   TXT  @  v=spf1 include:resend.com ~all
   TXT  resend._domainkey  [valor proporcionado]
   TXT  _dmarc  v=DMARC1; p=none
   ```

3. **Esperar verificación:**
   - Puede tomar hasta 48 horas
   - Resend verificará automáticamente

4. **Actualizar .env:**
   ```env
   RESEND_FROM_EMAIL=SPORTA <noreply@tudominio.com>
   ```

### Monitoreo

Resend proporciona:
- 📊 Dashboard con estadísticas
- 📧 Logs de emails enviados
- ❌ Errores y rebotes
- 📈 Tasas de entrega

Accede en: [resend.com/emails](https://resend.com/emails)

---

## 💡 Ventajas de Resend

✅ **Fácil de usar**: API simple y directa
✅ **Confiable**: Alta tasa de entrega
✅ **Rápido**: Envío en milisegundos
✅ **Plan gratuito generoso**: 3,000 emails/mes
✅ **Sin configuración compleja**: No necesitas SMTP
✅ **Dashboard completo**: Monitoreo en tiempo real
✅ **Soporte de React Email**: Para plantillas avanzadas

---

## 📚 Recursos

- [Documentación de Resend](https://resend.com/docs)
- [API Reference](https://resend.com/docs/api-reference)
- [Verificar Dominio](https://resend.com/docs/dashboard/domains/introduction)
- [Límites y Precios](https://resend.com/pricing)

---

## 🆘 Soporte

Si tienes problemas:

1. Revisa los logs del servidor
2. Verifica la configuración en `.env`
3. Consulta la [documentación de Resend](https://resend.com/docs)
4. Contacta al soporte de Resend: [resend.com/support](https://resend.com/support)

---

**Desarrollado con ❤️ para SPORTA**
