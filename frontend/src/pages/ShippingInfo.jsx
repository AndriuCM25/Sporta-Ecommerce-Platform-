import { Truck, Clock, MapPin, Package, CheckCircle, AlertCircle, Gift, Zap } from 'lucide-react'

const ShippingInfo = () => {
  return (
    <>
      <style>{`
        .shipping-page {
          background: #080808;
          min-height: 100vh;
          padding: 6rem 2rem 4rem;
          font-family: 'DM Sans', sans-serif;
        }
        .shipping-container {
          max-width: 1000px;
          margin: 0 auto;
        }
        .shipping-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .shipping-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 3px;
          color: #fff;
          margin: 0 0 1rem 0;
        }
        .shipping-title span {
          color: #FF4500;
        }
        .shipping-subtitle {
          color: rgba(255,255,255,0.5);
          font-size: 1.1rem;
          margin: 0;
        }
        .shipping-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
          margin-bottom: 3rem;
        }
        .shipping-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
        }
        .shipping-card:hover {
          border-color: rgba(255,69,0,0.3);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .shipping-card-icon {
          width: 60px;
          height: 60px;
          background: rgba(255,69,0,0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: #FF4500;
        }
        .shipping-card-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 1px;
          color: #fff;
          margin: 0 0 0.75rem 0;
        }
        .shipping-card-desc {
          color: rgba(255,255,255,0.6);
          font-size: 0.95rem;
          line-height: 1.6;
          margin: 0;
        }
        .shipping-section {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 2.5rem;
          margin-bottom: 2rem;
        }
        .shipping-section-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.8rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 0 1.5rem 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .shipping-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .shipping-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.7);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .shipping-list li:last-child {
          border-bottom: none;
        }
        .shipping-list li svg {
          flex-shrink: 0;
          margin-top: 2px;
        }
        .shipping-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1.5rem;
        }
        .shipping-table th,
        .shipping-table td {
          padding: 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .shipping-table th {
          color: rgba(255,255,255,0.5);
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .shipping-table td {
          color: rgba(255,255,255,0.8);
          font-size: 0.95rem;
        }
        .shipping-table tr:last-child td {
          border-bottom: none;
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
        @media (max-width: 768px) {
          .shipping-page {
            padding: 5rem 1.5rem 3rem;
          }
          .shipping-section {
            padding: 1.5rem;
          }
          .shipping-table {
            font-size: 0.85rem;
          }
          .shipping-table th,
          .shipping-table td {
            padding: 0.75rem 0.5rem;
          }
        }
      `}</style>

      <div className="shipping-page">
        <div className="shipping-container">
          {/* Header */}
          <div className="shipping-header">
            <h1 className="shipping-title">
              ENVÍOS Y <span>ENTREGAS</span>
            </h1>
            <p className="shipping-subtitle">
              Información completa sobre nuestros métodos de envío
            </p>
          </div>

          {/* Cards de beneficios */}
          <div className="shipping-grid">
            <div className="shipping-card">
              <div className="shipping-card-icon">
                <Truck size={28} />
              </div>
              <h3 className="shipping-card-title">Envío Gratis</h3>
              <p className="shipping-card-desc">
                En compras mayores a S/ 150 en Lima Metropolitana
              </p>
            </div>

            <div className="shipping-card">
              <div className="shipping-card-icon">
                <Clock size={28} />
              </div>
              <h3 className="shipping-card-title">Entrega Rápida</h3>
              <p className="shipping-card-desc">
                2-3 días hábiles en Lima, 4-7 días en provincias
              </p>
            </div>

            <div className="shipping-card">
              <div className="shipping-card-icon">
                <Package size={28} />
              </div>
              <h3 className="shipping-card-title">Seguimiento</h3>
              <p className="shipping-card-desc">
                Rastrea tu pedido en tiempo real desde tu cuenta
              </p>
            </div>
          </div>

          {/* Métodos de envío */}
          <div className="shipping-section">
            <h2 className="shipping-section-title">
              <Truck size={24} />
              Métodos de Envío
            </h2>
            
            <table className="shipping-table">
              <thead>
                <tr>
                  <th>Método</th>
                  <th>Tiempo de Entrega</th>
                  <th>Costo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Envío Estándar</strong></td>
                  <td>2-3 días hábiles (Lima)</td>
                  <td>S/ 15.00</td>
                </tr>
                <tr>
                  <td><strong>Envío Express</strong></td>
                  <td>24 horas (Lima)</td>
                  <td>S/ 25.00</td>
                </tr>
                <tr>
                  <td><strong>Envío a Provincias</strong></td>
                  <td>4-7 días hábiles</td>
                  <td>S/ 20.00</td>
                </tr>
                <tr>
                  <td><strong>Recojo en Tienda</strong></td>
                  <td>Mismo día</td>
                  <td>GRATIS</td>
                </tr>
              </tbody>
            </table>

            <div className="highlight-box">
              <p>
                <Gift size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Envío Gratis:</strong> En compras mayores a S/ 150 en Lima Metropolitana. 
                Aplica solo para envío estándar.
              </p>
            </div>
          </div>

          {/* Zonas de cobertura */}
          <div className="shipping-section">
            <h2 className="shipping-section-title">
              <MapPin size={24} />
              Zonas de Cobertura
            </h2>
            
            <ul className="shipping-list">
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Lima Metropolitana:</strong> Todos los distritos. Envío estándar 2-3 días, 
                  Express 24 horas.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Callao:</strong> Cobertura completa. Mismo tiempo que Lima Metropolitana.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  <strong>Provincias:</strong> Arequipa, Cusco, Trujillo, Chiclayo, Piura, Iquitos y más. 
                  Tiempo de entrega 4-7 días hábiles.
                </span>
              </li>
              <li>
                <AlertCircle size={20} color="#FF4500" />
                <span>
                  <strong>Zonas remotas:</strong> Consultar disponibilidad y tiempo de entrega. 
                  Pueden aplicar costos adicionales.
                </span>
              </li>
            </ul>
          </div>

          {/* Proceso de envío */}
          <div className="shipping-section">
            <h2 className="shipping-section-title">
              <Package size={24} />
              Proceso de Envío
            </h2>
            
            <ul className="shipping-list">
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>1. Confirmación:</strong> Recibirás un email de confirmación con los detalles 
                  de tu pedido inmediatamente después de la compra.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>2. Preparación:</strong> Tu pedido será preparado y empaquetado en nuestro 
                  almacén en un plazo de 24 horas.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>3. Envío:</strong> Una vez despachado, recibirás un código de seguimiento 
                  para rastrear tu pedido.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#FF4500" />
                <span>
                  <strong>4. Entrega:</strong> El courier te contactará para coordinar la entrega. 
                  Asegúrate de estar disponible.
                </span>
              </li>
            </ul>

            <div className="highlight-box">
              <p>
                <Package size={16} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} color="#FF4500" />
                <strong>Empaque:</strong> Todos nuestros productos son empaquetados con materiales 
                de alta calidad para garantizar que lleguen en perfectas condiciones.
              </p>
            </div>
          </div>

          {/* Información adicional */}
          <div className="shipping-section">
            <h2 className="shipping-section-title">
              <AlertCircle size={24} />
              Información Importante
            </h2>
            
            <ul className="shipping-list">
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Los tiempos de entrega son estimados y pueden variar según la disponibilidad 
                  del courier y condiciones climáticas.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  El horario de entrega es de lunes a sábado de 9:00 AM a 7:00 PM.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Es necesario que alguien mayor de 18 años esté presente para recibir el pedido.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Si no hay nadie disponible, el courier dejará una nota y se coordinará una 
                  nueva entrega.
                </span>
              </li>
              <li>
                <CheckCircle size={20} color="#4ade80" />
                <span>
                  Revisa tu pedido al momento de recibirlo. Si hay algún problema, contáctanos 
                  inmediatamente.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShippingInfo
