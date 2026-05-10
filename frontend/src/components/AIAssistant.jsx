import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, User, Bot, Book, HelpCircle } from 'lucide-react'

const AIAssistant = ({ mode = 'customer', user = null }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Base de conocimiento según el modo
  const knowledgeBase = mode === 'customer' ? {
    // CONOCIMIENTO PARA CLIENTES
    greeting: '¡Hola! 👋 Soy el asistente virtual de SPORTA. ¿En qué puedo ayudarte hoy?',
    
    keywords: {
      // Compras y pedidos
      'comprar|compra|pedido|orden': {
        response: '🛍️ **Cómo realizar una compra:**\n\n1. Explora nuestro catálogo de zapatillas\n2. Selecciona el producto que te guste\n3. Elige tu talla y color\n4. Agrégalo al carrito\n5. Ve al carrito y haz clic en "Proceder al pago"\n6. Completa tus datos de envío\n7. Selecciona tu método de pago\n8. ¡Confirma tu pedido!\n\n¿Necesitas ayuda con algún paso específico?'
      },
      'pago|pagar|tarjeta|yape|transferencia': {
        response: '💳 **Métodos de pago disponibles:**\n\n• **Tarjeta de crédito/débito** - Pago inmediato\n• **Yape/Plin** - Pago instantáneo con billeteras digitales\n• **Transferencia bancaria** - Requiere verificación (24-48h)\n• **Contra entrega** - Paga al recibir tu pedido\n\nTodos los pagos son 100% seguros. ¿Tienes dudas sobre algún método?'
      },
      'envío|envio|delivery|entrega': {
        response: '🚚 **Opciones de entrega:**\n\n**Delivery a domicilio:**\n• Tiempo: 2-3 días hábiles\n• Costo: S/15 (GRATIS en compras >S/150)\n• Cobertura: 43 distritos de Lima\n\n**Recojo en tienda:**\n• Tiempo: 24-48 horas\n• Costo: GRATIS\n• Ubicación: Av. Principal 123, Lima\n\n¿Quieres saber más sobre alguna opción?'
      },
      'seguimiento|rastreo|tracking|estado': {
        response: '📦 **Seguimiento de pedido:**\n\nPuedes rastrear tu pedido de 2 formas:\n\n1. **Desde tu cuenta:** Ve a "Mis Pedidos" y haz clic en el pedido\n2. **Página de seguimiento:** Ve a "Seguimiento" en el menú\n\nVerás el estado en tiempo real:\n• Pedido Recibido\n• En Preparación\n• En Camino / Listo para Recoger\n• Entregado\n\n¿Necesitas ayuda para encontrar tu pedido?'
      },
      'devolución|devolucion|cambio|reembolso': {
        response: '🔄 **Política de devoluciones:**\n\n• **Plazo:** 30 días desde la recepción\n• **Condición:** Producto sin usar, con etiquetas\n• **Proceso:**\n  1. Ve a "Mis Pedidos"\n  2. Selecciona el producto\n  3. Solicita devolución\n  4. Espera aprobación (24-48h)\n  5. Envía el producto\n  6. Recibe tu reembolso (7-10 días)\n\n¿Quieres iniciar una devolución?'
      },
      'talla|tallas|medida|tamaño': {
        response: '📏 **Guía de tallas:**\n\nEncuentra tu talla perfecta:\n\n**Hombre:** 38-45\n**Mujer:** 35-41\n\n**Cómo medir tu pie:**\n1. Coloca una hoja en el suelo\n2. Párate sobre ella\n3. Marca el punto más largo\n4. Mide en centímetros\n\nVe a nuestra **Guía de Tallas** completa en el footer para ver la tabla detallada.\n\n¿Necesitas ayuda para elegir tu talla?'
      },
      'ofertas|descuento|promocion|flash': {
        response: '⚡ **Ofertas y promociones:**\n\n• **Ofertas Flash:** Descuentos de hasta 50% OFF con tiempo limitado\n• **Envío gratis:** En compras mayores a S/150\n• **Newsletter:** Suscríbete y recibe ofertas exclusivas\n• **Primera compra:** Descuento especial para nuevos clientes\n\nVe a la sección "Ofertas" para ver todas las promociones activas.\n\n¿Te interesa alguna oferta en particular?'
      },
      'cuenta|registro|login|contraseña': {
        response: '👤 **Gestión de cuenta:**\n\n**Crear cuenta:**\n• Haz clic en "Iniciar sesión"\n• Selecciona "Registrarse"\n• Completa tus datos\n• O usa "Continuar con Google"\n\n**Recuperar contraseña:**\n• Haz clic en "¿Olvidaste tu contraseña?"\n• Ingresa tu email\n• Revisa tu correo\n\n**Ventajas de tener cuenta:**\n• Seguimiento de pedidos\n• Historial de compras\n• Checkout más rápido\n\n¿Necesitas ayuda con tu cuenta?'
      },
      'contacto|ayuda|soporte|whatsapp': {
        response: '📞 **Contáctanos:**\n\n**WhatsApp:**\n• Ventas: +51 987 145 336\n• Consultas: +51 960 056 600\n\n**Email:** adminSporta@depor.pe\n**Teléfono:** +51 925 841 052\n\n**Horario de atención:**\nLun-Vie: 9:00 AM - 6:00 PM\nSáb: 9:00 AM - 1:00 PM\n\n¿Prefieres que te contactemos?'
      },
      'productos|catalogo|zapatillas|modelos': {
        response: '👟 **Nuestro catálogo:**\n\n**Categorías:**\n• **Running:** Zapatillas para correr y entrenar\n• **Lifestyle:** Estilo urbano y casual\n• **Basketball:** Para la cancha\n\n**Marcas disponibles:**\nNike, Adidas, Jordan, Puma, New Balance, Converse\n\n**Filtros disponibles:**\n• Por categoría\n• Por precio\n• Por talla\n• Por color\n\nExplora nuestro catálogo completo en "Productos".\n\n¿Buscas algo específico?'
      }
    }
  } : {
    // CONOCIMIENTO PARA ADMINISTRADORES
    greeting: '👋 ¡Hola Admin! Soy tu asistente para el panel de administración. ¿Necesitas ayuda con algo?',
    
    keywords: {
      'dashboard|inicio|metricas|estadisticas': {
        response: '📊 **Dashboard Principal:**\n\n**Métricas disponibles:**\n• Ingresos totales\n• Número de pedidos\n• Total de usuarios\n• Productos activos\n\n**Gráficos:**\n• Ventas por período (diario/mensual/anual)\n• Distribución por categorías\n\n**Cambiar período:**\nUsa el selector en la esquina superior derecha.\n\n¿Necesitas ayuda para interpretar alguna métrica?'
      },
      'producto|productos|inventario|stock': {
        response: '📦 **Gestión de Productos:**\n\n**Crear producto:**\n1. Ve a "Productos"\n2. Clic en "+ Nuevo producto"\n3. Completa los datos:\n   - Nombre, precio, categoría\n   - Stock, badge, descripción\n   - Sube imagen (máx 5MB)\n4. Marca como "destacado" si quieres\n5. Guarda\n\n**Editar/Eliminar:**\n• Usa los botones en cada fila\n• Los cambios son inmediatos\n\n**Filtros:**\n• Buscar por nombre\n• Filtrar por categoría\n\n**Estados:**\n• Activo: Stock disponible\n• Bajo stock: <10 unidades\n• Sin stock: 0 unidades\n\n¿Necesitas ayuda con algún producto?'
      },
      'pedido|pedidos|orden|ordenes|venta|ventas': {
        response: '🛍️ **Gestión de Pedidos:**\n\n**Ver pedidos:**\n1. Ve a "Ventas"\n2. Usa las pestañas: Todos/Pendientes/Pagados/Enviados\n3. Busca por cliente o ID de pedido\n\n**Cambiar estado:**\n1. Haz clic en "Ver detalle"\n2. Usa los botones:\n   - Pendiente → Pagado (verificar pago)\n   - Pagado → Enviado (marcar envío)\n\n**Estados:**\n• **Pending:** Esperando confirmación de pago\n• **Paid:** Pago confirmado, listo para enviar\n• **Shipped:** Pedido enviado al cliente\n\n**Filtros:**\n• Por estado\n• Por fecha\n• Por cliente\n\n¿Necesitas procesar algún pedido?'
      },
      'usuario|usuarios|cliente|clientes': {
        response: '👥 **Gestión de Usuarios:**\n\n**Ver usuarios:**\n1. Ve a "Usuarios"\n2. Busca por nombre o email\n3. Filtra por estado (Activo/Bloqueado)\n\n**Ver detalles:**\n• Haz clic en "Ver"\n• Verás: pedidos, total gastado, fecha de registro\n\n**Acciones:**\n• **Bloquear:** Impide que el usuario inicie sesión\n• **Desbloquear:** Restaura el acceso\n• **Eliminar:** Elimina permanentemente (¡cuidado!)\n\n**Métricas por usuario:**\n• Total de pedidos\n• Total gastado\n• Fecha de registro\n\n¿Necesitas gestionar algún usuario?'
      },
      'reporte|reportes|exportar|csv|excel': {
        response: '📊 **Reportes y Exportación:**\n\n**Generar reporte:**\n1. Ve a "Reportes"\n2. Selecciona:\n   - Fecha inicio y fin\n   - Tipo: Ventas/Usuarios/Productos\n3. Haz clic en "Exportar PDF" o "Exportar Excel"\n\n**Tipos de reportes:**\n• **Ventas:** Pedidos con totales\n• **Usuarios:** Lista con estadísticas\n• **Productos:** Inventario completo\n\n**Vista previa:**\nVe los datos antes de exportar en la tabla.\n\n**Gráfico de tendencias:**\nMuestra ingresos mensuales del año.\n\n¿Necesitas un reporte específico?'
      },
      'grafico|graficos|chart|estadistica': {
        response: '📈 **Gráficos y Estadísticas:**\n\n**Dashboard:**\n• **Gráfico de barras:** Ventas por período\n  - Muestra ingresos y pedidos\n  - Cambia entre diario/mensual/anual\n• **Gráfico de dona:** Distribución por categorías\n  - Running, Lifestyle, Basketball\n  - Porcentajes del catálogo\n\n**Reportes:**\n• **Gráfico de línea:** Tendencia de ventas\n  - Ingresos mensuales 2025\n  - Identifica patrones\n\n**Cambiar período:**\nUsa el selector en la parte superior.\n\n¿Necesitas analizar algún dato específico?'
      },
      'imagen|imagenes|foto|subir': {
        response: '🖼️ **Gestión de Imágenes:**\n\n**Subir imagen de producto:**\n1. Al crear/editar producto\n2. Haz clic en "Seleccionar archivo"\n3. Elige imagen (JPG, PNG, WebP)\n4. Máximo 5MB\n5. Se sube automáticamente a Supabase Storage\n\n**Requisitos:**\n• Formato: JPG, PNG, WebP\n• Tamaño máximo: 5MB\n• Recomendado: 800x800px\n• Fondo blanco preferible\n\n**Vista previa:**\nVerás la imagen antes de guardar.\n\n¿Tienes problemas subiendo imágenes?'
      },
      'buscar|busqueda|filtro|filtrar': {
        response: '🔍 **Búsqueda y Filtros:**\n\n**Productos:**\n• Buscar por nombre\n• Filtrar por categoría\n\n**Usuarios:**\n• Buscar por nombre o email\n• Filtrar por estado (Activo/Bloqueado)\n\n**Ventas:**\n• Buscar por cliente o ID de pedido\n• Filtrar por estado\n• Pestañas: Todos/Pendientes/Pagados/Enviados\n\n**Reportes:**\n• Filtrar por rango de fechas\n• Seleccionar tipo de reporte\n\n**Tip:** Los filtros se aplican en tiempo real.\n\n¿Buscas algo específico?'
      },
      'ayuda|manual|tutorial|guia': {
        response: '📚 **Manual de Administración:**\n\n**Primeros pasos:**\n1. Familiarízate con el Dashboard\n2. Revisa los productos existentes\n3. Aprende a cambiar estados de pedidos\n\n**Tareas diarias:**\n• Revisar pedidos pendientes\n• Confirmar pagos de transferencias\n• Actualizar estados a "Enviado"\n• Responder consultas de clientes\n\n**Tareas semanales:**\n• Revisar stock bajo\n• Analizar productos más vendidos\n• Generar reportes de ventas\n\n**Mejores prácticas:**\n• Actualiza estados rápidamente\n• Mantén el inventario actualizado\n• Responde a clientes en <24h\n• Revisa métricas regularmente\n\n¿Necesitas ayuda con alguna tarea específica?'
      },
      'problema|error|bug|falla': {
        response: '⚠️ **Solución de Problemas:**\n\n**Problemas comunes:**\n\n**No puedo subir imagen:**\n• Verifica que sea <5MB\n• Usa formato JPG o PNG\n• Revisa tu conexión\n\n**No se actualiza el stock:**\n• Refresca la página (F5)\n• Verifica que guardaste los cambios\n\n**No veo los gráficos:**\n• Espera unos segundos a que carguen\n• Verifica que hay datos en el período\n\n**Pedido no aparece:**\n• Verifica el filtro de estado\n• Busca por ID o nombre de cliente\n\n**Si el problema persiste:**\n• Cierra sesión y vuelve a entrar\n• Limpia caché del navegador\n• Contacta a soporte técnico\n\n¿Qué problema estás teniendo?'
      }
    }
  }

  // Inicializar con mensaje de bienvenida
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        type: 'bot',
        text: knowledgeBase.greeting,
        timestamp: new Date()
      }])
    }
  }, [isOpen])

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Procesar mensaje del usuario
  const handleSend = () => {
    if (!input.trim()) return

    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simular delay de respuesta
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase())
      setMessages(prev => [...prev, {
        type: 'bot',
        text: response,
        timestamp: new Date()
      }])
      setIsTyping(false)
    }, 800)
  }

  // Generar respuesta basada en keywords
  const generateResponse = (userInput) => {
    // Buscar coincidencias en la base de conocimiento
    for (const [keywords, data] of Object.entries(knowledgeBase.keywords)) {
      const keywordList = keywords.split('|')
      if (keywordList.some(keyword => userInput.includes(keyword))) {
        return data.response
      }
    }

    // Respuesta por defecto si no hay coincidencia
    if (mode === 'customer') {
      return '🤔 No estoy seguro de entender tu pregunta.\n\n**Puedo ayudarte con:**\n• Cómo comprar\n• Métodos de pago\n• Envíos y entregas\n• Seguimiento de pedidos\n• Devoluciones\n• Guía de tallas\n• Ofertas y promociones\n• Gestión de cuenta\n\n¿Sobre qué tema necesitas ayuda?'
    } else {
      return '🤔 No encontré información sobre eso.\n\n**Puedo ayudarte con:**\n• Dashboard y métricas\n• Gestión de productos\n• Gestión de pedidos\n• Gestión de usuarios\n• Reportes y exportación\n• Gráficos y estadísticas\n• Solución de problemas\n\n¿Qué necesitas saber?'
    }
  }

  // Sugerencias rápidas
  const quickSuggestions = mode === 'customer' ? [
    '¿Cómo compro?',
    'Métodos de pago',
    'Seguir mi pedido',
    'Guía de tallas'
  ] : [
    'Crear producto',
    'Cambiar estado de pedido',
    'Generar reporte',
    'Ver manual completo'
  ]

  const handleSuggestion = (suggestion) => {
    setInput(suggestion)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: isOpen ? '420px' : '20px',
          right: '20px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FF4500, #ff6a35)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(255, 69, 0, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          transition: 'all 0.3s ease',
          zIndex: 9998
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)'
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 69, 0, 0.5)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 69, 0, 0.4)'
        }}
        aria-label={isOpen ? 'Cerrar asistente' : 'Abrir asistente'}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '90px',
          right: '20px',
          width: '380px',
          height: '500px',
          background: '#111',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 9999,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            padding: '16px 20px',
            background: 'linear-gradient(135deg, #FF4500, #ff6a35)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {mode === 'customer' ? <Bot size={22} color="#fff" /> : <Book size={22} color="#fff" />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.95rem' }}>
                {mode === 'customer' ? 'Asistente SPORTA' : 'Asistente Admin'}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                {mode === 'customer' ? 'Siempre disponible para ayudarte' : 'Manual y soporte técnico'}
              </div>
            </div>
            {/* Botón de cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
                flexShrink: 0
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'
                e.currentTarget.style.transform = 'rotate(90deg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'
                e.currentTarget.style.transform = 'rotate(0deg)'
              }}
              aria-label="Cerrar chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start',
                flexDirection: msg.type === 'user' ? 'row-reverse' : 'row'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: msg.type === 'user' ? '#FF4500' : 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {msg.type === 'user' ? <User size={18} color="#fff" /> : <Bot size={18} color="#FF4500" />}
                </div>
                <div style={{
                  maxWidth: '75%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: msg.type === 'user' ? '#FF4500' : 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{
                display: 'flex',
                gap: '10px',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Bot size={18} color="#FF4500" />
                </div>
                <div style={{
                  padding: '10px 14px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  gap: '4px'
                }}>
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0s' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0.4s' }}>●</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {messages.length === 1 && (
            <div style={{
              padding: '0 16px 12px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              {quickSuggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestion(suggestion)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 69, 0, 0.3)',
                    background: 'rgba(255, 69, 0, 0.1)',
                    color: '#FF4500',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 69, 0, 0.2)'
                    e.currentTarget.style.borderColor = '#FF4500'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 69, 0, 0.1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 69, 0, 0.3)'
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{
            padding: '12px 16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '8px'
          }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escribe tu pregunta..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#fff',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: 'none',
                background: input.trim() ? '#FF4500' : 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                cursor: input.trim() ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s'
              }}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  )
}

export default AIAssistant
