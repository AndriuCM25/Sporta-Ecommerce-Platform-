import { useState } from 'react'
import { ArrowLeft, Package } from 'lucide-react'
import OrderTracking from '../components/OrderTracking'

const OrderTrackingPage = ({ onBack }) => {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [showTracking, setShowTracking] = useState(false)
  const [deliveryType, setDeliveryType] = useState('delivery')
  const [currentStage, setCurrentStage] = useState(2)

  const handleTrack = (e) => {
    e.preventDefault()
    if (trackingNumber.trim()) {
      setShowTracking(true)
      // Aquí podrías hacer una llamada a la API para obtener el estado real del pedido
    }
  }

  return (
    <>
      <style>{`
        .tracking-page {
          background: #080808;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          padding: 2rem;
        }

        .tracking-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .tracking-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 3rem;
          padding-top: 1rem;
        }

        .tracking-h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.2rem);
          letter-spacing: 2px;
          margin: 0;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          padding: 0.6rem 1.2rem;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .back-btn:hover {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.9);
        }

        .search-card {
          background: #111;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 2.5rem;
          margin-bottom: 2rem;
          position: relative;
          overflow: hidden;
        }

        .search-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #FF4500, transparent);
        }

        .search-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          letter-spacing: 2px;
          margin: 0 0 1rem 0;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-desc {
          color: rgba(255,255,255,0.5);
          font-size: 0.9rem;
          margin: 0 0 2rem 0;
        }

        .search-form {
          display: flex;
          gap: 1rem;
          max-width: 600px;
        }

        .search-input {
          flex: 1;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          padding: 1rem 1.25rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          border-color: rgba(255,69,0,0.5);
          background: rgba(255,69,0,0.04);
        }

        .search-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .search-btn {
          background: #FF4500;
          color: #fff;
          border: none;
          padding: 1rem 2rem;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.75px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .search-btn:hover {
          background: #e03d00;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(255,69,0,0.35);
        }

        .demo-controls {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 1.5rem;
          margin-top: 2rem;
        }

        .demo-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.5);
          margin: 0 0 1rem 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .demo-buttons {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .demo-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.6);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .demo-btn:hover {
          background: rgba(255,69,0,0.1);
          border-color: rgba(255,69,0,0.3);
          color: #FF4500;
        }

        @media (max-width: 768px) {
          .tracking-page {
            padding: 1rem;
          }

          .search-form {
            flex-direction: column;
          }

          .search-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="tracking-page">
        <div className="tracking-container">
          <div className="tracking-header">
            <h1 className="tracking-h1">SEGUIMIENTO DE PEDIDO</h1>
            {onBack && (
              <button className="back-btn" onClick={onBack}>
                <ArrowLeft size={15} />
                Volver
              </button>
            )}
          </div>

          <div className="search-card">
            <h2 className="search-title">
              <Package size={24} />
              Rastrea tu pedido
            </h2>
            <p className="search-desc">
              Ingresa tu número de pedido o comprobante para ver el estado de tu envío
            </p>

            <form className="search-form" onSubmit={handleTrack}>
              <input
                type="text"
                className="search-input"
                placeholder="Ej: #12345 o COMP-1234567890-ABC123XYZ"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button type="submit" className="search-btn">
                Rastrear Pedido
              </button>
            </form>

            {/* Demo controls */}
            <div className="demo-controls">
              <p className="demo-title">🎮 Controles de Demostración</p>
              <div className="demo-buttons">
                <button 
                  className="demo-btn"
                  onClick={() => { setDeliveryType('delivery'); setShowTracking(true); }}
                >
                  Ver Delivery
                </button>
                <button 
                  className="demo-btn"
                  onClick={() => { setDeliveryType('pickup'); setShowTracking(true); }}
                >
                  Ver Recojo en Tienda
                </button>
                <button 
                  className="demo-btn"
                  onClick={() => setCurrentStage(1)}
                >
                  Etapa 1
                </button>
                <button 
                  className="demo-btn"
                  onClick={() => setCurrentStage(2)}
                >
                  Etapa 2
                </button>
                <button 
                  className="demo-btn"
                  onClick={() => setCurrentStage(3)}
                >
                  Etapa 3
                </button>
                <button 
                  className="demo-btn"
                  onClick={() => setCurrentStage(4)}
                >
                  Etapa 4 (Completado)
                </button>
              </div>
            </div>
          </div>

          {showTracking && (
            <OrderTracking 
              deliveryType={deliveryType} 
              currentStage={currentStage} 
            />
          )}
        </div>
      </div>
    </>
  )
}

export default OrderTrackingPage
