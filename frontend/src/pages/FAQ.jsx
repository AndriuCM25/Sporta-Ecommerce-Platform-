import { useState } from 'react'
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Mail } from 'lucide-react'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Pedidos y Compras',
      questions: [
        {
          q: '¿Cómo puedo realizar un pedido?',
          a: 'Navega por nuestro catálogo, selecciona los productos que desees, elige talla y color, agrégalos al carrito y procede al checkout. Puedes pagar con tarjeta, Yape, transferencia o contra entrega.'
        },
        {
          q: '¿Puedo modificar o cancelar mi pedido?',
          a: 'Sí, puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. Contáctanos inmediatamente por WhatsApp o email con tu número de pedido.'
        },
        {
          q: '¿Necesito crear una cuenta para comprar?',
          a: 'Sí, necesitas crear una cuenta para realizar compras. Esto te permite hacer seguimiento de tus pedidos, guardar direcciones y acceder a ofertas exclusivas.'
        },
        {
          q: '¿Los precios incluyen IGV?',
          a: 'Sí, todos nuestros precios incluyen IGV (18%). El precio que ves es el precio final que pagarás.'
        }
      ]
    },
    {
      category: 'Envíos y Entregas',
      questions: [
        {
          q: '¿Cuánto tiempo tarda el envío?',
          a: 'En Lima Metropolitana: 2-3 días hábiles (estándar) o 24 horas (express). En provincias: 4-7 días hábiles. El tiempo puede variar según disponibilidad del courier.'
        },
        {
          q: '¿Cuánto cuesta el envío?',
          a: 'Envío estándar en Lima: S/ 15. Envío express: S/ 25. Provincias: S/ 20. ¡ENVÍO GRATIS en compras mayores a S/ 150 en Lima!'
        },
        {
          q: '¿Puedo recoger mi pedido en tienda?',
          a: 'Sí, ofrecemos recojo en tienda GRATIS. Selecciona esta opción al momento del checkout y podrás recoger tu pedido el mismo día en nuestra tienda de Miraflores.'
        },
        {
          q: '¿Cómo puedo rastrear mi pedido?',
          a: 'Una vez que tu pedido sea despachado, recibirás un email con el código de seguimiento. También puedes ver el estado de tu pedido en tu cuenta.'
        },
        {
          q: '¿Qué pasa si no estoy en casa al momento de la entrega?',
          a: 'El courier dejará una nota y se coordinará una nueva entrega. También puedes contactarnos para reprogramar la entrega a tu conveniencia.'
        }
      ]
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard), Yape, Plin, transferencia bancaria y pago contra entrega (efectivo).'
        },
        {
          q: '¿Es seguro pagar con tarjeta?',
          a: 'Sí, totalmente seguro. Utilizamos encriptación SSL y no almacenamos información de tarjetas. Todos los pagos son procesados de forma segura.'
        },
        {
          q: '¿Puedo pagar en cuotas?',
          a: 'Sí, si pagas con tarjeta de crédito, puedes diferir el pago en cuotas según las opciones que ofrezca tu banco.'
        },
        {
          q: '¿Emiten factura?',
          a: 'Sí, emitimos boletas y facturas. Si necesitas factura, proporciona tu RUC y razón social al momento de la compra.'
        }
      ]
    },
    {
      category: 'Devoluciones y Cambios',
      questions: [
        {
          q: '¿Puedo devolver un producto?',
          a: 'Sí, aceptamos devoluciones dentro de los 30 días posteriores a la recepción. El producto debe estar sin uso, con etiquetas originales y en su empaque.'
        },
        {
          q: '¿Cómo solicito un cambio de talla?',
          a: 'Contáctanos por WhatsApp o email con tu número de pedido. Te enviaremos las instrucciones para el cambio. En Lima, podemos recoger el producto en tu domicilio.'
        },
        {
          q: '¿Cuánto tarda el reembolso?',
          a: 'Procesamos reembolsos en 5-7 días hábiles después de recibir el producto. Si pagaste con tarjeta, el reembolso aparecerá en tu estado de cuenta en 7-14 días.'
        },
        {
          q: '¿El envío de devolución tiene costo?',
          a: 'En Lima Metropolitana, recogemos el producto GRATIS. En provincias, el costo de envío de devolución corre por cuenta del cliente, excepto si el producto es defectuoso.'
        }
      ]
    },
    {
      category: 'Productos',
      questions: [
        {
          q: '¿Los productos son originales?',
          a: 'Sí, todos nuestros productos son 100% originales y vienen con garantía de autenticidad. Trabajamos directamente con distribuidores autorizados.'
        },
        {
          q: '¿Cómo sé qué talla elegir?',
          a: 'Consulta nuestra Guía de Tallas donde encontrarás tablas detalladas y consejos para medir tu pie correctamente. Si tienes dudas, contáctanos.'
        },
        {
          q: '¿Tienen garantía los productos?',
          a: 'Sí, todos los productos tienen garantía contra defectos de fabricación. La duración varía según la marca, generalmente de 3 a 6 meses.'
        },
        {
          q: '¿Cuándo reponen stock?',
          a: 'Reponemos stock regularmente. Si un producto está agotado, puedes suscribirte a notificaciones para recibir un email cuando vuelva a estar disponible.'
        }
      ]
    },
    {
      category: 'Cuenta y Seguridad',
      questions: [
        {
          q: '¿Cómo creo una cuenta?',
          a: 'Haz clic en "Iniciar Sesión" en la parte superior derecha, luego en "Registrarse". Completa el formulario con tu información y listo.'
        },
        {
          q: '¿Olvidé mi contraseña, qué hago?',
          a: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?". Te enviaremos un email con instrucciones para restablecerla.'
        },
        {
          q: '¿Cómo actualizo mi información personal?',
          a: 'Inicia sesión en tu cuenta y ve a "Mi Perfil". Ahí podrás actualizar tu información personal, direcciones y preferencias.'
        },
        {
          q: '¿Es segura mi información personal?',
          a: 'Sí, protegemos tu información con encriptación y nunca la compartimos con terceros. Lee nuestra Política de Privacidad para más detalles.'
        }
      ]
    }
  ]

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <style>{`
        .faq-page {
          background: #080808;
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          font-family: 'DM Sans', sans-serif;
        }
        .faq-container {
          max-width: 900px;
          margin: 0 auto;
        }
        .faq-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .faq-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 3px;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .faq-title span {
          color: #FF4500;
        }
        .faq-subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 1.1rem;
          margin: 0;
        }
        .faq-category {
          margin-bottom: 3rem;
        }
        .faq-category-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 2px;
          color: #FF4500;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .faq-item {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          margin-bottom: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .faq-item:hover {
          border-color: rgba(255,69,0,0.3);
        }
        .faq-question {
          padding: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          transition: background 0.2s ease;
        }
        .faq-question:hover {
          background: rgba(255,255,255,0.02);
        }
        .faq-question-text {
          font-weight: 600;
          color: #fff;
          font-size: 1rem;
          margin: 0;
          flex: 1;
        }
        .faq-icon {
          flex-shrink: 0;
          color: #FF4500;
          transition: transform 0.3s ease;
        }
        .faq-icon.open {
          transform: rotate(180deg);
        }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }
        .faq-answer.open {
          max-height: 500px;
          padding: 0 1.5rem 1.5rem;
        }
        .faq-answer-text {
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          line-height: 1.7;
          margin: 0;
        }
        .faq-contact {
          background: linear-gradient(135deg, rgba(255,69,0,0.1), rgba(255,69,0,0.05));
          border: 1px solid rgba(255,69,0,0.2);
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          margin-top: 4rem;
        }
        .faq-contact-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .faq-contact-text {
          color: rgba(255,255,255,0.7);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
        }
        .faq-contact-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .faq-contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 0.85rem 1.75rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.95rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .faq-contact-btn.primary {
          background: #FF4500;
          color: #fff;
        }
        .faq-contact-btn.primary:hover {
          background: #e03d00;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,69,0,0.3);
        }
        .faq-contact-btn.secondary {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
        }
        .faq-contact-btn.secondary:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }
        @media (max-width: 768px) {
          .faq-page {
            padding: 5rem 1.5rem 3rem;
          }
          .faq-contact {
            padding: 2rem 1.5rem;
          }
          .faq-contact-buttons {
            flex-direction: column;
          }
          .faq-contact-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="faq-page">
        <div className="faq-container">
          {/* Header */}
          <div className="faq-header">
            <h1 className="faq-title">
              PREGUNTAS <span>FRECUENTES</span>
            </h1>
            <p className="faq-subtitle">
              Encuentra respuestas a las preguntas más comunes
            </p>
          </div>

          {/* FAQ Categories */}
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="faq-category">
              <h2 className="faq-category-title">
                <HelpCircle size={24} />
                {category.category}
              </h2>

              {category.questions.map((item, questionIndex) => {
                const index = `${categoryIndex}-${questionIndex}`
                const isOpen = openIndex === index

                return (
                  <div key={questionIndex} className="faq-item">
                    <div
                      className="faq-question"
                      onClick={() => toggleQuestion(categoryIndex, questionIndex)}
                    >
                      <h3 className="faq-question-text">{item.q}</h3>
                      <div className={`faq-icon ${isOpen ? 'open' : ''}`}>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                    <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                      <p className="faq-answer-text">{item.a}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          ))}

          {/* Contact Section */}
          <div className="faq-contact">
            <h2 className="faq-contact-title">¿No encontraste tu respuesta?</h2>
            <p className="faq-contact-text">
              Nuestro equipo de soporte está listo para ayudarte. Contáctanos por WhatsApp o email 
              y te responderemos lo más pronto posible.
            </p>
            <div className="faq-contact-buttons">
              <a
                href="https://wa.me/51925841052"
                target="_blank"
                rel="noopener noreferrer"
                className="faq-contact-btn primary"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <a
                href="mailto:adminSporta@depor.pe"
                className="faq-contact-btn secondary"
              >
                <Mail size={18} />
                Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ
