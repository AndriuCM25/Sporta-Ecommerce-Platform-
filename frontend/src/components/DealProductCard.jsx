import { useState, useEffect } from 'react'
import { ShoppingCart, Zap, TrendingUp, Eye, Heart } from 'lucide-react'

const DealProductCard = ({ product, onAddToCart, onViewDetail, user, onShowAuth }) => {
  const [progress, setProgress] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  // Simular progreso de ventas
  useEffect(() => {
    const soldPercentage = product.sold ? (product.sold / product.stock) * 100 : Math.random() * 80 + 10
    setProgress(Math.min(soldPercentage, 100))
  }, [product])

  const handleAddToCart = (e) => {
    e.stopPropagation()
    if (user) {
      onAddToCart(product)
    } else {
      onShowAuth()
    }
  }

  const handleLike = (e) => {
    e.stopPropagation()
    setIsLiked(!isLiked)
  }

  const originalPrice = product.price
  const discountedPrice = product.discountPrice || (product.price * (1 - (product.discount || 0) / 100))
  const discount = product.discount || Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)

  return (
    <>
      <style>{`
        .deal-card {
          background: #111;
          border: 2px solid rgba(255, 69, 0, 0.2);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          font-family: 'DM Sans', sans-serif;
        }

        .deal-card:hover {
          border-color: #FF4500;
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 60px rgba(255, 69, 0, 0.4);
        }

        .deal-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #FF4500, #ff6a35, #FF4500);
          background-size: 200% 100%;
          animation: borderGlow 2s linear infinite;
        }

        @keyframes borderGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .deal-image-wrap {
          position: relative;
          height: 280px;
          overflow: hidden;
          background: linear-gradient(135deg, #1a1a1a, #222);
        }

        .deal-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .deal-card:hover .deal-image {
          transform: scale(1.15) rotate(2deg);
        }

        .deal-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%);
        }

        .deal-discount-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: linear-gradient(135deg, #FF4500, #ff6a35);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.5rem;
          padding: 0.5rem 1rem;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(255, 69, 0, 0.5);
          z-index: 2;
          animation: badgePulse 2s ease-in-out infinite;
        }

        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .deal-hot-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(255, 69, 0, 0.9);
          backdrop-filter: blur(10px);
          color: #fff;
          font-size: 0.7rem;
          font-weight: 700;
          padding: 0.4rem 0.8rem;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 2;
          animation: hotBadgeShake 0.5s ease-in-out infinite;
        }

        @keyframes hotBadgeShake {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        .deal-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 0.75rem;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 3;
        }

        .deal-card:hover .deal-actions {
          opacity: 1;
        }

        .deal-action-btn {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .deal-action-btn:hover {
          transform: scale(1.15);
          background: #FF4500;
          color: #fff;
        }

        .deal-action-btn.liked {
          background: #FF4500;
          color: #fff;
        }

        .deal-body {
          padding: 1.25rem;
        }

        .deal-category {
          font-size: 0.7rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #FF4500;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .deal-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.4rem;
          letter-spacing: 1px;
          color: #fff;
          margin: 0 0 0.75rem 0;
          line-height: 1.2;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .deal-prices {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .deal-price-new {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          color: #FF4500;
          letter-spacing: 1px;
        }

        .deal-price-old {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.4);
          text-decoration: line-through;
        }

        .deal-savings {
          font-size: 0.75rem;
          color: #4ade80;
          font-weight: 600;
          background: rgba(74, 222, 128, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .deal-progress-section {
          margin-bottom: 1rem;
        }

        .deal-progress-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
          font-size: 0.8rem;
        }

        .deal-progress-text {
          color: rgba(255, 255, 255, 0.6);
        }

        .deal-progress-sold {
          color: #FF4500;
          font-weight: 700;
        }

        .deal-progress-bar {
          height: 8px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          overflow: hidden;
          position: relative;
        }

        .deal-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #FF4500, #ff6a35);
          border-radius: 50px;
          transition: width 1s ease-out;
          position: relative;
          overflow: hidden;
        }

        .deal-progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: progressShine 2s infinite;
        }

        @keyframes progressShine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .deal-cta {
          width: 100%;
          background: linear-gradient(135deg, #FF4500, #ff6a35);
          color: #fff;
          border: none;
          padding: 1rem;
          border-radius: 12px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          text-transform: uppercase;
          position: relative;
          overflow: hidden;
        }

        .deal-cta::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .deal-cta:hover::before {
          width: 300px;
          height: 300px;
        }

        .deal-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(255, 69, 0, 0.5);
        }

        .deal-cta span {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .deal-image-wrap {
            height: 220px;
          }

          .deal-name {
            font-size: 1.2rem;
          }

          .deal-price-new {
            font-size: 1.75rem;
          }
        }
      `}</style>

      <div className="deal-card" onClick={() => onViewDetail(product)}>
        {/* Image section */}
        <div className="deal-image-wrap">
          <img src={product.image} alt={product.name} className="deal-image" />
          <div className="deal-overlay" />

          {/* Discount badge */}
          <div className="deal-discount-badge">
            -{discount}%
          </div>

          {/* Hot badge */}
          {progress > 60 && (
            <div className="deal-hot-badge">
              <Zap size={12} />
              <span>¡SE AGOTA!</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="deal-actions">
            <button 
              className={`deal-action-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              aria-label="Me gusta"
            >
              <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <button 
              className="deal-action-btn"
              onClick={(e) => {
                e.stopPropagation()
                onViewDetail(product)
              }}
              aria-label="Ver detalles"
            >
              <Eye size={20} />
            </button>
          </div>
        </div>

        {/* Body section */}
        <div className="deal-body">
          <div className="deal-category">{product.category}</div>

          <h3 className="deal-name">{product.name}</h3>

          <div className="deal-prices">
            <span className="deal-price-new">
              S/ {discountedPrice.toFixed(2)}
            </span>
            <span className="deal-price-old">
              S/ {originalPrice.toFixed(2)}
            </span>
            <span className="deal-savings">
              Ahorras S/ {(originalPrice - discountedPrice).toFixed(2)}
            </span>
          </div>

          {/* Progress bar */}
          <div className="deal-progress-section">
            <div className="deal-progress-label">
              <span className="deal-progress-text">Vendidos</span>
              <span className="deal-progress-sold">{Math.round(progress)}%</span>
            </div>
            <div className="deal-progress-bar">
              <div 
                className="deal-progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* CTA Button */}
          <button className="deal-cta" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>
    </>
  )
}

export default DealProductCard
