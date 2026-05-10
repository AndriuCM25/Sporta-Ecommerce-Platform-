import { Package, Clock, CheckCircle, Truck, Store, PackageCheck } from 'lucide-react'

const OrderTracking = ({ deliveryType = 'delivery', currentStage = 1 }) => {
  // Etapas para delivery a domicilio
  const deliveryStages = [
    {
      id: 1,
      icon: Package,
      title: 'Pedido Recibido',
      description: 'Tu pedido ha sido confirmado',
      time: '21/05 20:01'
    },
    {
      id: 2,
      icon: Clock,
      title: 'En Preparación',
      description: 'Estamos preparando tu pedido',
      time: '21/05 20:51'
    },
    {
      id: 3,
      icon: Truck,
      title: 'En Camino',
      description: 'Tu pedido está en ruta',
      time: '22/05 14:30'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Entregado',
      description: 'Pedido entregado exitosamente',
      time: '25/05 19:37'
    }
  ]

  // Etapas para recojo en tienda
  const pickupStages = [
    {
      id: 1,
      icon: Package,
      title: 'Pedido Recibido',
      description: 'Tu pedido ha sido confirmado',
      time: '21/05 20:01'
    },
    {
      id: 2,
      icon: Clock,
      title: 'En Preparación',
      description: 'Preparando tu pedido',
      time: '21/05 20:51'
    },
    {
      id: 3,
      icon: PackageCheck,
      title: 'Listo para Recoger',
      description: 'Tu pedido está listo',
      time: '22/05 10:00'
    },
    {
      id: 4,
      icon: CheckCircle,
      title: 'Recogido',
      description: 'Pedido retirado de tienda',
      time: '24/05 15:20'
    }
  ]

  const stages = deliveryType === 'delivery' ? deliveryStages : pickupStages

  return (
    <>
      <style>{`
        .order-tracking {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 20px;
          padding: 2.5rem 2rem;
          margin: 2rem 0;
        }

        .tracking-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 2.5rem;
        }

        .tracking-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0;
        }

        .tracking-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.4);
          margin: 0.25rem 0 0 0;
        }

        .tracking-timeline {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          padding: 0 1rem;
        }

        .tracking-line {
          position: absolute;
          top: 32px;
          left: 0;
          right: 0;
          height: 3px;
          background: rgba(255,255,255,0.08);
          z-index: 0;
        }

        .tracking-line-progress {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: linear-gradient(90deg, #FF4500, #ff6a35);
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 3px;
        }

        .tracking-stage {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          z-index: 1;
        }

        .stage-icon-wrap {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 3px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }

        .stage-icon-wrap::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,69,0,0.15) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .tracking-stage.completed .stage-icon-wrap {
          background: rgba(255,69,0,0.15);
          border-color: #FF4500;
          box-shadow: 0 0 0 4px rgba(255,69,0,0.1);
        }

        .tracking-stage.active .stage-icon-wrap {
          background: #FF4500;
          border-color: #FF4500;
          box-shadow: 0 0 0 4px rgba(255,69,0,0.2), 0 8px 24px rgba(255,69,0,0.3);
          animation: pulse-stage 2s ease-in-out infinite;
        }

        .tracking-stage.active .stage-icon-wrap::before {
          opacity: 1;
          animation: pulse-ring 2s ease-in-out infinite;
        }

        @keyframes pulse-stage {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes pulse-ring {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0; }
        }

        .stage-icon {
          color: rgba(255,255,255,0.3);
          transition: all 0.3s ease;
        }

        .tracking-stage.completed .stage-icon {
          color: #FF4500;
        }

        .tracking-stage.active .stage-icon {
          color: #fff;
          filter: drop-shadow(0 0 8px rgba(255,255,255,0.5));
        }

        .stage-content {
          text-align: center;
          max-width: 140px;
        }

        .stage-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 0.25rem 0;
          transition: color 0.3s ease;
        }

        .tracking-stage.completed .stage-title,
        .tracking-stage.active .stage-title {
          color: #fff;
        }

        .stage-description {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.3);
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
        }

        .stage-time {
          font-size: 0.7rem;
          color: rgba(255,255,255,0.25);
          font-family: 'DM Sans', monospace;
          letter-spacing: 0.5px;
        }

        .tracking-stage.completed .stage-time,
        .tracking-stage.active .stage-time {
          color: #FF4500;
          font-weight: 600;
        }

        .tracking-info-box {
          margin-top: 2rem;
          padding: 1.25rem;
          background: rgba(255,69,0,0.05);
          border: 1px solid rgba(255,69,0,0.15);
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .info-icon {
          color: #FF4500;
          flex-shrink: 0;
        }

        .info-content {
          flex: 1;
        }

        .info-title {
          font-size: 0.85rem;
          font-weight: 600;
          color: #fff;
          margin: 0 0 0.25rem 0;
        }

        .info-text {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.5);
          margin: 0;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .order-tracking {
            padding: 1.5rem 1rem;
          }

          .tracking-timeline {
            flex-direction: column;
            padding: 0;
          }

          .tracking-line {
            top: 0;
            left: 32px;
            width: 3px;
            height: 100%;
          }

          .tracking-line-progress {
            width: 100% !important;
          }

          .tracking-stage {
            flex-direction: row;
            align-items: flex-start;
            width: 100%;
            margin-bottom: 2rem;
          }

          .tracking-stage:last-child {
            margin-bottom: 0;
          }

          .stage-icon-wrap {
            margin-bottom: 0;
            margin-right: 1rem;
          }

          .stage-content {
            text-align: left;
            max-width: none;
          }
        }
      `}</style>

      <div className="order-tracking">
        <div className="tracking-header">
          <div>
            <h3 className="tracking-title">
              {deliveryType === 'delivery' ? '📦 SEGUIMIENTO DE ENVÍO' : '🏪 SEGUIMIENTO DE PEDIDO'}
            </h3>
            <p className="tracking-subtitle">
              {deliveryType === 'delivery' 
                ? 'Rastrea tu pedido en tiempo real' 
                : 'Verifica el estado de tu pedido para recoger'}
            </p>
          </div>
        </div>

        <div className="tracking-timeline">
          <div className="tracking-line">
            <div 
              className="tracking-line-progress" 
              style={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
            />
          </div>

          {stages.map((stage, index) => {
            const stageNumber = index + 1
            const isCompleted = stageNumber < currentStage
            const isActive = stageNumber === currentStage
            const Icon = stage.icon

            return (
              <div 
                key={stage.id} 
                className={`tracking-stage ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}
              >
                <div className="stage-icon-wrap">
                  <Icon className="stage-icon" size={28} strokeWidth={2.5} />
                </div>

                <div className="stage-content">
                  <h4 className="stage-title">{stage.title}</h4>
                  <p className="stage-description">{stage.description}</p>
                  {(isCompleted || isActive) && (
                    <span className="stage-time">{stage.time}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {deliveryType === 'delivery' ? (
          <div className="tracking-info-box">
            <Truck className="info-icon" size={24} />
            <div className="info-content">
              <p className="info-title">Información de Entrega</p>
              <p className="info-text">
                Tu pedido será entregado en 2-3 días hábiles. Recibirás una notificación cuando el repartidor esté cerca.
              </p>
            </div>
          </div>
        ) : (
          <div className="tracking-info-box">
            <Store className="info-icon" size={24} />
            <div className="info-content">
              <p className="info-title">Dirección de la Tienda</p>
              <p className="info-text">
                Av. Principal 123, Miraflores, Lima • Horario: Lun-Sáb 10:00 AM - 8:00 PM • Tel: +51 925 841 052
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default OrderTracking
