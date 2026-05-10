import { RotateCcw, CheckCircle, XCircle, AlertCircle, Package, Truck as TruckIcon } from 'lucide-react'

const ReturnsInfo = () => {
  return (
    <>
      <style>{`
        .returns-page {
          background: #080808;
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          font-family: 'DM Sans', sans-serif;
        }
        .returns-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .returns-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .returns-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 3px;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .returns-title span {
          color: #FF4500;
        }
        .returns-subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 1.1rem;
          margin: 0;
        }
        .returns-section {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }
        .returns-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .returns-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .returns-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .returns-list li:last-child {
          border-bottom: none;
        }
        .returns-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .highlight-box {
          background: rgba(255,69,0,0.1);
          border-left: 4px solid #FF4500;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1.5rem;
        }
        .highlight-box p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .highlight-box strong {
          color: #FF4500;
        }
        .success-box {
          background: rgba(74,222,128,0.1);
          border-left: 4px solid #4ade80;
          padding: 1.5rem;
          border-radius: 8px;
          margin-top: 1.5rem;
        }
        .success-box p {
          margin: 0;
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .success-box strong {
          color: #4ade80;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }
        .step-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 1.5rem;
          text-align: center;
        }
        .step-number {
          width: 40px;
          height: 40px;
          background: #FF4500;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          color: #fff;
        }
        .step-title {
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-size: 0.95rem;
        }
        .step-desc {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          margin: 0;
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .returns-page {
            padding: 5rem 1.5rem 3rem;
          }
          .returns-section {
            padding: 1.5rem;
          }
        }
      `}</style>

      <div className="returns-page">
        <div className="returns-container">
          {/* Header */}
          <div className="returns-header">
            <h1 className="returns-title">
              DEVOLUCIONES Y <span>CAMBIOS</span>
            </h1>
            <p className="returns-subtitle">
              Política de devoluciones y cambios de SPORTA
            </p>
          </div>

          {/* Política general */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <RotateCcw size={24} />
              Política de Devoluciones
            </h2>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              En SPORTA queremos que estés 100% satisfecho con tu compra. Si por alguna razón no estás 
              conforme con tu pedido, aceptamos devoluciones y cambios dentro de los <strong style={{ color: '#FF4500' }}>30 días</strong> posteriores 
              a la recepción del producto.
            </p>

            <div className="success-box">
              <p>
                <CheckCircle size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#4ade80" />
                <strong>Garantía de Satisfacción:</strong> Si el producto no cumple con tus expectativas, 
                te devolvemos el 100% de tu dinero o realizamos el cambio sin costo adicional.
              </p>
            </div>
          </div>

          {/* Condiciones */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <CheckCircle size={24} />
              Condiciones para Devoluciones
            </h2>
            
            <ul className="returns-list">
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  El producto debe estar en <strong>perfectas condiciones</strong>, sin uso y con todas 
                  sus etiquetas originales.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Debe incluir el <strong>empaque original</strong> y todos los accesorios que venían 
                  con el producto.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  La solicitud debe realizarse dentro de los <strong>30 días</strong> posteriores a la 
                  recepción del pedido.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Debes presentar el <strong>comprobante de compra</strong> (boleta o factura) y el 
                  código de pedido.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Los productos en <strong>oferta o liquidación</strong> también pueden ser devueltos 
                  bajo las mismas condiciones.
                </span>
              </li>
            </ul>
          </div>

          {/* Productos no retornables */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <XCircle size={24} />
              Productos No Retornables
            </h2>
            
            <ul className="returns-list">
              <li>
                <XCircle size={20} color="#ff6b6b" />
                <span>
                  Productos <strong>personalizados</strong> o hechos a medida.
                </span>
              </li>
              <li>
                <XCircle size={20} color="#ff6b6b" />
                <span>
                  Productos con <strong>signos de uso</strong>, manchas, olores o daños.
                </span>
              </li>
              <li>
                <XCircle size={20} color="#ff6b6b" />
                <span>
                  Productos sin <strong>etiquetas originales</strong> o con etiquetas dañadas.
                </span>
              </li>
              <li>
                <XCircle size={20} color="#ff6b6b" />
                <span>
                  Productos <strong>higiénicos</strong> como plantillas, calcetines o ropa interior 
                  (si el empaque ha sido abierto).
                </span>
              </li>
            </ul>

            <div className="highlight-box">
              <p>
                <AlertCircle size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Importante:</strong> Los productos que no cumplan con las condiciones de 
                devolución serán devueltos al cliente sin reembolso.
              </p>
            </div>
          </div>

          {/* Proceso de devolución */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <Package size={24} />
              Proceso de Devolución
            </h2>
            
            <div className="steps-grid">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3 className="step-title">Solicita la Devolución</h3>
                <p className="step-desc">
                  Contáctanos por email o WhatsApp con tu número de pedido
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">2</div>
                <h3 className="step-title">Confirmación</h3>
                <p className="step-desc">
                  Revisaremos tu solicitud y te enviaremos las instrucciones
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">3</div>
                <h3 className="step-title">Envía el Producto</h3>
                <p className="step-desc">
                  Empaca el producto y envíalo a nuestra dirección
                </p>
              </div>

              <div className="step-card">
                <div className="step-number">4</div>
                <h3 className="step-title">Reembolso</h3>
                <p className="step-desc">
                  Procesaremos tu reembolso en 5-7 días hábiles
                </p>
              </div>
            </div>

            <div className="success-box">
              <p>
                <TruckIcon size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#4ade80" />
                <strong>Recojo Gratuito:</strong> En Lima Metropolitana, podemos recoger el producto 
                en tu domicilio sin costo adicional.
              </p>
            </div>
          </div>

          {/* Cambios */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <RotateCcw size={24} />
              Cambios de Producto
            </h2>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Si deseas cambiar tu producto por otro (diferente talla, color o modelo), el proceso es 
              el mismo que para devoluciones. Una vez recibamos el producto original, te enviaremos el 
              nuevo sin costo adicional de envío.
            </p>

            <ul className="returns-list">
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Cambio de talla:</strong> Sin costo adicional si el producto está en perfectas 
                  condiciones.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Cambio de color:</strong> Sujeto a disponibilidad de stock.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Cambio de modelo:</strong> Si hay diferencia de precio, se cobrará o reembolsará 
                  la diferencia.
                </span>
              </li>
            </ul>
          </div>

          {/* Reembolsos */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <AlertCircle size={24} />
              Reembolsos
            </h2>
            
            <ul className="returns-list">
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Los reembolsos se procesan en <strong>5-7 días hábiles</strong> después de recibir 
                  el producto.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  El reembolso se realizará al <strong>mismo método de pago</strong> utilizado en la compra.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Si pagaste con tarjeta, el reembolso aparecerá en tu estado de cuenta en 
                  <strong> 7-14 días hábiles</strong>.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Si pagaste con Yape/Plin o transferencia, el reembolso se realizará en 
                  <strong> 2-3 días hábiles</strong>.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  El <strong>costo de envío original</strong> no es reembolsable, excepto en casos de 
                  productos defectuosos.
                </span>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="returns-section">
            <h2 className="returns-section-title">
              <Package size={24} />
              ¿Necesitas Ayuda?
            </h2>
            
            <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              Si tienes alguna duda sobre nuestras políticas de devolución o necesitas ayuda con tu 
              solicitud, no dudes en contactarnos:
            </p>

            <ul className="returns-list">
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>Email:</strong> adminSporta@depor.pe
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>WhatsApp:</strong> +51 925 841 052
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>Horario:</strong> Lunes a Sábado de 9:00 AM a 7:00 PM
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReturnsInfo
