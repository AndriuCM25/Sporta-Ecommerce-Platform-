# 🤖 Asistente Virtual con IA - SPORTA

Sistema de asistencia inteligente integrado en la plataforma SPORTA con dos modos: **Cliente** y **Administrador**.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Modos de Operación](#-modos-de-operación)
- [Base de Conocimiento](#-base-de-conocimiento)
- [Integración](#-integración)
- [Personalización](#-personalización)
- [Mejoras Futuras](#-mejoras-futuras)

---

## ✨ Características

### **Para Clientes**
- 🛍️ Ayuda con el proceso de compra
- 💳 Información sobre métodos de pago
- 🚚 Detalles de envío y entrega
- 📦 Seguimiento de pedidos
- 🔄 Política de devoluciones
- 📏 Guía de tallas
- ⚡ Ofertas y promociones
- 👤 Gestión de cuenta
- 📞 Información de contacto

### **Para Administradores**
- 📊 Ayuda con el dashboard
- 📦 Gestión de productos e inventario
- 🛍️ Gestión de pedidos y ventas
- 👥 Gestión de usuarios
- 📊 Reportes y exportación
- 📈 Interpretación de gráficos
- 🖼️ Gestión de imágenes
- 🔍 Uso de búsquedas y filtros
- 📚 Manual completo de administración
- ⚠️ Solución de problemas

### **Características Técnicas**
- ✅ Respuestas instantáneas basadas en keywords
- ✅ Interfaz de chat moderna y responsive
- ✅ Sugerencias rápidas contextuales
- ✅ Historial de conversación
- ✅ Animaciones suaves
- ✅ Botón flotante no intrusivo
- ✅ Auto-scroll a nuevos mensajes
- ✅ Indicador de "escribiendo..."
- ✅ Formato Markdown en respuestas

---

## 🎯 Modos de Operación

### **Modo Cliente** (`mode="customer"`)

**Ubicación:** Disponible en todas las páginas públicas de la aplicación

**Botón flotante:**
- Icono: ✨ Sparkles
- Posición: Esquina inferior derecha
- Color: Gradiente naranja (#FF4500)

**Base de conocimiento:**
- Proceso de compra paso a paso
- Métodos de pago disponibles
- Opciones de envío (delivery/recojo)
- Sistema de seguimiento
- Política de devoluciones (30 días)
- Guía de tallas (hombre/mujer)
- Ofertas flash y promociones
- Gestión de cuenta (registro/login)
- Información de contacto (WhatsApp, email, teléfono)
- Catálogo de productos y marcas

**Sugerencias rápidas:**
- "¿Cómo compro?"
- "Métodos de pago"
- "Seguir mi pedido"
- "Guía de tallas"

---

### **Modo Administrador** (`mode="admin"`)

**Ubicación:** Panel de administración (AdminDashboard)

**Botón flotante:**
- Icono: 📚 Book
- Posición: Esquina inferior derecha
- Color: Gradiente naranja (#FF4500)

**Base de conocimiento:**
- Dashboard y métricas
- Gestión completa de productos (CRUD)
- Gestión de pedidos y estados
- Gestión de usuarios (bloquear/desbloquear)
- Generación de reportes
- Interpretación de gráficos
- Subida de imágenes
- Búsquedas y filtros avanzados
- Manual de administración completo
- Solución de problemas comunes

**Sugerencias rápidas:**
- "Crear producto"
- "Cambiar estado de pedido"
- "Generar reporte"
- "Ver manual completo"

---

## 📚 Base de Conocimiento

### **Keywords y Respuestas**

El asistente utiliza un sistema de **detección de keywords** para identificar la intención del usuario y proporcionar respuestas relevantes.

#### **Ejemplo de estructura:**

```javascript
'comprar|compra|pedido|orden': {
  response: '🛍️ **Cómo realizar una compra:**\n\n1. Explora nuestro catálogo...'
}
```

#### **Keywords para Clientes:**

| Categoría | Keywords | Respuesta |
|-----------|----------|-----------|
| **Compras** | comprar, compra, pedido, orden | Proceso de compra paso a paso |
| **Pagos** | pago, pagar, tarjeta, yape, transferencia | Métodos de pago disponibles |
| **Envíos** | envío, envio, delivery, entrega | Opciones de entrega y costos |
| **Seguimiento** | seguimiento, rastreo, tracking, estado | Cómo rastrear pedidos |
| **Devoluciones** | devolución, devolucion, cambio, reembolso | Política de devoluciones |
| **Tallas** | talla, tallas, medida, tamaño | Guía de tallas completa |
| **Ofertas** | ofertas, descuento, promocion, flash | Promociones activas |
| **Cuenta** | cuenta, registro, login, contraseña | Gestión de cuenta |
| **Contacto** | contacto, ayuda, soporte, whatsapp | Información de contacto |
| **Productos** | productos, catalogo, zapatillas, modelos | Catálogo y marcas |

#### **Keywords para Administradores:**

| Categoría | Keywords | Respuesta |
|-----------|----------|-----------|
| **Dashboard** | dashboard, inicio, metricas, estadisticas | Métricas y gráficos |
| **Productos** | producto, productos, inventario, stock | Gestión de productos |
| **Pedidos** | pedido, pedidos, orden, ordenes, venta | Gestión de pedidos |
| **Usuarios** | usuario, usuarios, cliente, clientes | Gestión de usuarios |
| **Reportes** | reporte, reportes, exportar, csv, excel | Generación de reportes |
| **Gráficos** | grafico, graficos, chart, estadistica | Interpretación de gráficos |
| **Imágenes** | imagen, imagenes, foto, subir | Subida de imágenes |
| **Búsqueda** | buscar, busqueda, filtro, filtrar | Búsquedas y filtros |
| **Ayuda** | ayuda, manual, tutorial, guia | Manual completo |
| **Problemas** | problema, error, bug, falla | Solución de problemas |

---

## 🔧 Integración

### **1. Instalación de Dependencias**

El componente usa **Lucide React** para los iconos:

```bash
cd frontend
npm install lucide-react
```

### **2. Importar el Componente**

#### **En App.jsx (para clientes):**

```javascript
import AIAssistant from './components/AIAssistant'

// Dentro del return, antes del cierre de </div>
<AIAssistant mode="customer" user={user} />
```

#### **En AdminDashboard.jsx (para administradores):**

```javascript
import AIAssistant from './AIAssistant'

// Dentro del return, antes del cierre de </>
<AIAssistant mode="admin" user={user} />
```

### **3. Props del Componente**

```javascript
<AIAssistant 
  mode="customer"  // o "admin"
  user={user}      // Objeto de usuario (opcional)
/>
```

| Prop | Tipo | Requerido | Descripción |
|------|------|-----------|-------------|
| `mode` | `string` | Sí | Modo de operación: `"customer"` o `"admin"` |
| `user` | `object` | No | Objeto de usuario actual (para personalización futura) |

---

## 🎨 Personalización

### **Cambiar Colores**

Edita los estilos inline en `AIAssistant.jsx`:

```javascript
// Botón flotante
background: 'linear-gradient(135deg, #FF4500, #ff6a35)'

// Header del chat
background: 'linear-gradient(135deg, #FF4500, #ff6a35)'

// Mensajes del usuario
background: '#FF4500'

// Mensajes del bot
background: 'rgba(255, 255, 255, 0.05)'
```

### **Agregar Nuevas Keywords**

En `AIAssistant.jsx`, dentro de `knowledgeBase.keywords`:

```javascript
'nueva_keyword|sinonimo1|sinonimo2': {
  response: '🎯 **Título de la respuesta:**\n\nContenido de la respuesta...'
}
```

### **Modificar Sugerencias Rápidas**

```javascript
const quickSuggestions = mode === 'customer' ? [
  'Nueva sugerencia 1',
  'Nueva sugerencia 2',
  'Nueva sugerencia 3',
  'Nueva sugerencia 4'
] : [
  // Sugerencias para admin
]
```

### **Cambiar Posición del Botón**

```javascript
// En el botón flotante
style={{
  position: 'fixed',
  bottom: '20px',  // Cambiar aquí
  right: '20px',   // Cambiar aquí
  // ...
}}
```

---

## 🚀 Mejoras Futuras

### **Fase 1 - Inteligencia Básica** ✅ (Implementado)
- ✅ Sistema de keywords
- ✅ Respuestas predefinidas
- ✅ Sugerencias rápidas
- ✅ Historial de conversación

### **Fase 2 - Integración con Backend** (Próximamente)
- [ ] Consultar datos reales del usuario
- [ ] Mostrar estado de pedidos en tiempo real
- [ ] Verificar stock de productos
- [ ] Generar reportes desde el chat
- [ ] Crear tickets de soporte

### **Fase 3 - IA Real** (Futuro)
- [ ] Integración con OpenAI GPT-4
- [ ] Respuestas contextuales avanzadas
- [ ] Aprendizaje de conversaciones
- [ ] Análisis de sentimiento
- [ ] Recomendaciones personalizadas

### **Fase 4 - Funcionalidades Avanzadas** (Futuro)
- [ ] Búsqueda de productos por voz
- [ ] Soporte multiidioma
- [ ] Integración con WhatsApp
- [ ] Chatbot proactivo (saludos automáticos)
- [ ] Analytics de conversaciones

---

## 📊 Métricas y Analytics

### **Datos a Trackear** (Implementación futura)

**Para Clientes:**
- Preguntas más frecuentes
- Tasa de resolución
- Tiempo promedio de respuesta
- Satisfacción del usuario
- Conversiones desde el chat

**Para Administradores:**
- Consultas más comunes
- Tiempo de uso del asistente
- Funcionalidades más consultadas
- Problemas reportados
- Eficiencia operativa

---

## 🔒 Seguridad y Privacidad

### **Datos Almacenados**
- ❌ **NO se almacenan** conversaciones actualmente
- ❌ **NO se envían** datos a servidores externos
- ✅ Todo funciona **localmente** en el navegador

### **Implementación Futura con Backend**
- Encriptar conversaciones sensibles
- Anonimizar datos de usuarios
- Cumplir con GDPR y CCPA
- Permitir eliminación de historial
- Auditoría de accesos

---

## 🛠️ Solución de Problemas

### **El asistente no aparece**
1. Verifica que importaste el componente correctamente
2. Revisa que `lucide-react` esté instalado
3. Verifica la consola del navegador por errores

### **Las respuestas no son relevantes**
1. Revisa las keywords en `knowledgeBase`
2. Agrega sinónimos a las keywords existentes
3. Crea nuevas entradas para casos no cubiertos

### **El botón se superpone con otros elementos**
1. Ajusta el `z-index` del botón (actualmente 9998)
2. Modifica la posición `bottom` y `right`
3. Considera ocultar otros botones flotantes cuando el chat está abierto

---

## 📝 Ejemplos de Uso

### **Ejemplo 1: Cliente pregunta sobre envíos**

**Usuario:** "¿Cuánto cuesta el envío?"

**Asistente:**
```
🚚 **Opciones de entrega:**

**Delivery a domicilio:**
• Tiempo: 2-3 días hábiles
• Costo: S/15 (GRATIS en compras >S/150)
• Cobertura: 43 distritos de Lima

**Recojo en tienda:**
• Tiempo: 24-48 horas
• Costo: GRATIS
• Ubicación: Av. Principal 123, Lima

¿Quieres saber más sobre alguna opción?
```

### **Ejemplo 2: Admin pregunta sobre productos**

**Usuario:** "¿Cómo creo un producto?"

**Asistente:**
```
📦 **Gestión de Productos:**

**Crear producto:**
1. Ve a "Productos"
2. Clic en "+ Nuevo producto"
3. Completa los datos:
   - Nombre, precio, categoría
   - Stock, badge, descripción
   - Sube imagen (máx 5MB)
4. Marca como "destacado" si quieres
5. Guarda

**Editar/Eliminar:**
• Usa los botones en cada fila
• Los cambios son inmediatos

¿Necesitas ayuda con algún producto?
```

---

## 🎓 Manual de Uso

### **Para Clientes**

1. **Abrir el asistente:**
   - Haz clic en el botón flotante con el icono ✨ en la esquina inferior derecha

2. **Hacer una pregunta:**
   - Escribe tu pregunta en el campo de texto
   - Presiona Enter o haz clic en el botón de enviar

3. **Usar sugerencias rápidas:**
   - Haz clic en cualquiera de las sugerencias predefinidas
   - El asistente responderá automáticamente

4. **Cerrar el asistente:**
   - Haz clic en el botón X en el header del chat
   - O haz clic nuevamente en el botón flotante

### **Para Administradores**

1. **Acceder al asistente:**
   - Inicia sesión como administrador
   - El botón flotante aparecerá en el panel de administración

2. **Consultar el manual:**
   - Pregunta sobre cualquier funcionalidad del panel
   - Usa las sugerencias rápidas para acceso directo

3. **Solucionar problemas:**
   - Describe el problema que estás teniendo
   - El asistente te guiará paso a paso

---

## 📞 Soporte

Si necesitas ayuda adicional con el asistente virtual:

- **Email:** adminSporta@depor.pe
- **WhatsApp:** +51 925 841 052
- **Documentación:** Este archivo (ASISTENTE_VIRTUAL_IA.md)

---

## 📄 Licencia

Este componente es parte de la plataforma SPORTA E-Commerce.

---

**Última actualización:** Mayo 2026
**Versión:** 1.0.0
**Autor:** Equipo SPORTA
