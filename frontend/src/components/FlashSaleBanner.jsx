import { useState, useEffect } from 'react'
import { Zap, Clock, TrendingUp, Flame } from 'lucide-react'

const FlashSaleBanner = ({ endTime, discount = 50 }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const end = new Date(endTime).getTime()
      const difference = end - now

      if (difference <= 0) {
        setIsExpired(true)
        return { hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    setTimeLeft(calculateTimeLeft())

    return () => clearInterval(timer)
  }, [endTime])

  if (isExpired) return null

  return (
    <>
      <style>{`
        .flash-sale-banner {
          background: linear-gradient(135deg, #FF4500 0%, #ff6a35 50%, #FF4500 100%);
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
          padding: 1.5rem 2rem;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          margin: 2rem 0;
          box-shadow: 0 10px 40px rgba(255, 69, 0, 0.4);
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .flash-sale-banner::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.05) 10px,
            rgba(255, 255, 255, 0.05) 20px
          );
          animation: stripeMove 20s linear infinite;
        }

        @keyframes stripeMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .flash-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .flash-left {
          flex: 1;
          min-width: 250px;
        }

        .flash-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: #fff;
          margin-bottom: 0.75rem;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .flash-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2rem, 5vw, 3.5rem);
          letter-spacing: 3px;
          color: #fff;
          margin: 0 0 0.5rem 0;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          animation: titleBounce 1s ease-in-out infinite;
        }

        @keyframes titleBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        .flash-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.95);
          margin: 0;
          font-weight: 500;
        }

        .flash-discount {
          display: inline-block;
          background: #fff;
          color: #FF4500;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 3rem;
          padding: 0.25rem 1rem;
          border-radius: 12px;
          margin: 0 0.5rem;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
          animation: discountPop 0.6s ease-in-out infinite alternate;
        }

        @keyframes discountPop {
          0% { transform: scale(1) rotate(-2deg); }
          100% { transform: scale(1.1) rotate(2deg); }
        }

        .flash-timer {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .timer-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .timer-boxes {
          display: flex;
          gap: 0.75rem;
        }

        .timer-box {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 12px;
          padding: 1rem 0.75rem;
          min-width: 70px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .timer-box::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% { left: -100%; }
          100% { left: 100%; }
        }

        .timer-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: #fff;
          line-height: 1;
          display: block;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: numberFlip 1s ease-in-out;
        }

        @keyframes numberFlip {
          0%, 100% { transform: rotateX(0deg); }
          50% { transform: rotateX(180deg); }
        }

        .timer-label-small {
          font-size: 0.7rem;
          color: rgba(255, 255, 255, 0.8);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 0.25rem;
          font-weight: 600;
        }

        .timer-separator {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #fff;
          animation: blink 1s ease-in-out infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .flash-sparkles {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          pointer-events: none;
        }

        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #fff;
          border-radius: 50%;
          animation: sparkleFloat 3s ease-in-out infinite;
        }

        @keyframes sparkleFloat {
          0%, 100% {
            transform: translateY(0) scale(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-30px) scale(1);
            opacity: 1;
          }
        }

        .flame-icon {
          animation: flameFlicker 0.5s ease-in-out infinite alternate;
        }

        @keyframes flameFlicker {
          0% { transform: scale(1) rotate(-5deg); }
          100% { transform: scale(1.2) rotate(5deg); }
        }

        @media (max-width: 768px) {
          .flash-sale-banner {
            padding: 1.25rem 1.5rem;
          }

          .flash-content {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
          }

          .flash-title {
            font-size: 2rem;
          }

          .flash-discount {
            font-size: 2.5rem;
          }

          .timer-boxes {
            justify-content: center;
          }

          .timer-box {
            min-width: 60px;
            padding: 0.75rem 0.5rem;
          }

          .timer-value {
            font-size: 2rem;
          }
        }
      `}</style>

      <div className="flash-sale-banner">
        {/* Sparkles decorativos */}
        <div className="flash-sparkles">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="flash-content">
          {/* Left side - Title and discount */}
          <div className="flash-left">
            <div className="flash-badge">
              <Flame className="flame-icon" size={14} />
              <span>OFERTA RELÁMPAGO</span>
              <Zap size={14} />
            </div>

            <h2 className="flash-title">
              ¡GRAN DESCUENTO!
            </h2>

            <p className="flash-subtitle">
              Hasta
              <span className="flash-discount">{discount}%</span>
              OFF en productos seleccionados
            </p>
          </div>

          {/* Right side - Timer */}
          <div className="flash-timer">
            <div>
              <div className="timer-label">
                <Clock size={18} />
                <span>Termina en:</span>
              </div>

              <div className="timer-boxes">
                <div className="timer-box">
                  <span className="timer-value">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="timer-label-small">Horas</span>
                </div>

                <span className="timer-separator">:</span>

                <div className="timer-box">
                  <span className="timer-value">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="timer-label-small">Min</span>
                </div>

                <span className="timer-separator">:</span>

                <div className="timer-box">
                  <span className="timer-value">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="timer-label-small">Seg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlashSaleBanner
