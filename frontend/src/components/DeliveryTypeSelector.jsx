import { Truck, Store } from 'lucide-react'

const DeliveryTypeSelector = ({ selectedType, onTypeChange }) => {
  return (
    <>
      <style>{`
        .delivery-selector {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .delivery-option {
          position: relative;
          background: rgba(255,255,255,0.03);
          border: 2px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 1.75rem 1.5rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        .delivery-option::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF4500, #ff6a35);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }

        .delivery-option:hover {
          border-color: rgba(255,69,0,0.3);
          background: rgba(255,69,0,0.04);
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }

        .delivery-option.selected {
          border-color: #FF4500;
          background: rgba(255,69,0,0.08);
          box-shadow: 0 8px 24px rgba(255,69,0,0.2);
        }

        .delivery-option.selected::before {
          transform: scaleX(1);
        }

        .delivery-icon-wrap {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: all 0.3s ease;
        }

        .delivery-option:hover .delivery-icon-wrap {
          background: rgba(255,69,0,0.15);
          transform: scale(1.05);
        }

        .delivery-option.selected .delivery-icon-wrap {
          background: rgba(255,69,0,0.2);
        }

        .delivery-icon {
          color: rgba(255,255,255,0.4);
          transition: color 0.3s ease;
        }

        .delivery-option:hover .delivery-icon,
        .delivery-option.selected .delivery-icon {
          color: #FF4500;
        }

        .delivery-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.3rem;
          letter-spacing: 1.5px;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }

        .delivery-desc {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.5;
          margin: 0 0 1rem 0;
        }

        .delivery-features {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .delivery-feature {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.35);
        }

        .delivery-feature-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #FF4500;
          flex-shrink: 0;
        }

        .delivery-check {
          position: absolute;
          top: 1rem;
          right: 1rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .delivery-option.selected .delivery-check {
          border-color: #FF4500;
          background: #FF4500;
        }

        .delivery-check-icon {
          opacity: 0;
          transform: scale(0);
          transition: all 0.2s ease;
        }

        .delivery-option.selected .delivery-check-icon {
          opacity: 1;
          transform: scale(1);
        }

        @media (max-width: 768px) {
          .delivery-selector {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="delivery-selector">
        {/* Delivery a domicilio */}
        <div
          className={`delivery-option ${selectedType === 'delivery' ? 'selected' : ''}`}
          onClick={() => onTypeChange('delivery')}
        >
          <div className="delivery-check">
            <svg className="delivery-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="delivery-icon-wrap">
            <Truck className="delivery-icon" size={28} />
          </div>

          <h3 className="delivery-title">DELIVERY A DOMICILIO</h3>
          <p className="delivery-desc">
            Recibe tu pedido en la puerta de tu casa
          </p>

          <div className="delivery-features">
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Entrega en 2-3 días hábiles</span>
            </div>
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Envío gratis en compras mayores a S/ 150</span>
            </div>
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Seguimiento en tiempo real</span>
            </div>
          </div>
        </div>

        {/* Recojo en tienda */}
        <div
          className={`delivery-option ${selectedType === 'pickup' ? 'selected' : ''}`}
          onClick={() => onTypeChange('pickup')}
        >
          <div className="delivery-check">
            <svg className="delivery-check-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="delivery-icon-wrap">
            <Store className="delivery-icon" size={28} />
          </div>

          <h3 className="delivery-title">RECOJO EN TIENDA</h3>
          <p className="delivery-desc">
            Retira tu pedido en nuestra tienda física
          </p>

          <div className="delivery-features">
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Listo en 24-48 horas</span>
            </div>
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Sin costo de envío</span>
            </div>
            <div className="delivery-feature">
              <span className="delivery-feature-dot"></span>
              <span>Horario: Lun-Sáb 10:00 AM - 8:00 PM</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DeliveryTypeSelector
