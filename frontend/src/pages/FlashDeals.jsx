import { useState, useEffect } from 'react'
import { Zap, TrendingUp, Flame, ArrowRight, Filter, Grid, List } from 'lucide-react'
import FlashSaleBanner from '../components/FlashSaleBanner'
import DealProductCard from '../components/DealProductCard'

const FlashDeals = ({ onAddToCart, onViewDetail, user, onShowAuth }) => {
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('discount') // 'discount', 'price', 'popular'

  // Fecha de fin de la oferta (24 horas desde ahora)
  const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()

  // Productos en oferta (ejemplo)
  const dealProducts = [
    {
      id: 1,
      name: 'Nike Air Max 270 React',
      category: 'Running',
      price: 450,
      discountPrice: 225,
      discount: 50,
      image: '/shoe1.jpg',
      stock: 100,
      sold: 75
    },
    {
      id: 2,
      name: 'Adidas Ultraboost 21',
      category: 'Running',
      price: 520,
      discountPrice: 312,
      discount: 40,
      image: '/shoe2.jpg',
      stock: 80,
      sold: 60
    },
    {
      id: 3,
      name: 'Puma RS-X³',
      category: 'Lifestyle',
      price: 380,
      discountPrice: 190,
      discount: 50,
      image: '/shoe3.jpg',
      stock: 60,
      sold: 50
    },
    {
      id: 4,
      name: 'New Balance 574',
      category: 'Casual',
      price: 320,
      discountPrice: 192,
      discount: 40,
      image: '/shoe4.jpg',
      stock: 90,
      sold: 30
    },
    {
      id: 5,
      name: 'Reebok Nano X1',
      category: 'Training',
      price: 420,
      discountPrice: 252,
      discount: 40,
      image: '/shoe5.jpg',
      stock: 70,
      sold: 55
    },
    {
      id: 6,
      name: 'Converse Chuck Taylor',
      category: 'Casual',
      price: 280,
      discountPrice: 168,
      discount: 40,
      image: '/shoe6.jpg',
      stock: 100,
      sold: 20
    }
  ]

  const categories = ['all', 'Running', 'Lifestyle', 'Casual', 'Training']

  const filteredProducts = dealProducts
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'discount') return b.discount - a.discount
      if (sortBy === 'price') return a.discountPrice - b.discountPrice
      if (sortBy === 'popular') return (b.sold / b.stock) - (a.sold / a.stock)
      return 0
    })

  return (
    <>
      <style>{`
        .flash-deals-page {
          background: #080808;
          min-height: 100vh;
          font-family: 'DM Sans', sans-serif;
          color: #fff;
          padding: 2rem;
        }

        .flash-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .flash-header {
          text-align: center;
          margin-bottom: 2rem;
          animation: fadeInDown 0.6s ease;
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .flash-page-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(2.5rem, 6vw, 4rem);
          letter-spacing: 4px;
          margin: 0 0 0.5rem 0;
          background: linear-gradient(135deg, #FF4500, #ff6a35, #FF4500);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientText 3s ease infinite;
        }

        @keyframes gradientText {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .flash-page-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.6);
          margin: 0;
        }

        .flash-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          margin: 2rem 0;
          flex-wrap: wrap;
          animation: fadeIn 0.8s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .flash-categories {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
        }

        .category-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.6);
          padding: 0.6rem 1.25rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .category-btn:hover {
          background: rgba(255, 69, 0, 0.1);
          border-color: rgba(255, 69, 0, 0.3);
          color: #FF4500;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #FF4500, #ff6a35);
          border-color: #FF4500;
          color: #fff;
          box-shadow: 0 4px 12px rgba(255, 69, 0, 0.3);
        }

        .flash-filters {
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .filter-select {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.2s ease;
          outline: none;
        }

        .filter-select:hover {
          border-color: rgba(255, 69, 0, 0.3);
          background: rgba(255, 69, 0, 0.05);
        }

        .view-toggle {
          display: flex;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 0.25rem;
          border-radius: 10px;
        }

        .view-btn {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          padding: 0.5rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .view-btn:hover {
          color: #FF4500;
        }

        .view-btn.active {
          background: #FF4500;
          color: #fff;
        }

        .flash-stats {
          display: flex;
          gap: 2rem;
          justify-content: center;
          margin: 2rem 0;
          flex-wrap: wrap;
        }

        .stat-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 1.5rem 2rem;
          text-align: center;
          min-width: 180px;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          background: rgba(255, 69, 0, 0.05);
          border-color: rgba(255, 69, 0, 0.2);
          transform: translateY(-4px);
        }

        .stat-icon {
          color: #FF4500;
          margin-bottom: 0.5rem;
        }

        .stat-value {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2.5rem;
          color: #fff;
          margin: 0;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.5);
          margin: 0.5rem 0 0 0;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
          animation: fadeInUp 1s ease;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          color: rgba(255, 255, 255, 0.4);
        }

        .empty-icon {
          margin-bottom: 1rem;
        }

        @media (max-width: 768px) {
          .flash-deals-page {
            padding: 1rem;
          }

          .flash-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .flash-categories {
            justify-content: center;
          }

          .flash-filters {
            flex-direction: column;
            width: 100%;
          }

          .filter-select {
            width: 100%;
          }

          .products-grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }

          .flash-stats {
            gap: 1rem;
          }

          .stat-card {
            min-width: 140px;
            padding: 1rem 1.5rem;
          }
        }
      `}</style>

      <div className="flash-deals-page">
        <div className="flash-container">
          {/* Header */}
          <div className="flash-header">
            <h1 className="flash-page-title">
              ⚡ OFERTAS RELÁMPAGO ⚡
            </h1>
            <p className="flash-page-subtitle">
              Descuentos increíbles por tiempo limitado
            </p>
          </div>

          {/* Flash Sale Banner */}
          <FlashSaleBanner endTime={flashSaleEndTime} discount={50} />

          {/* Stats */}
          <div className="flash-stats">
            <div className="stat-card">
              <Flame className="stat-icon" size={32} />
              <p className="stat-value">{dealProducts.length}</p>
              <p className="stat-label">Productos en Oferta</p>
            </div>

            <div className="stat-card">
              <TrendingUp className="stat-icon" size={32} />
              <p className="stat-value">50%</p>
              <p className="stat-label">Descuento Máximo</p>
            </div>

            <div className="stat-card">
              <Zap className="stat-icon" size={32} />
              <p className="stat-value">24h</p>
              <p className="stat-label">Tiempo Restante</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flash-controls">
            {/* Categories */}
            <div className="flash-categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat === 'all' ? 'Todos' : cat}
                </button>
              ))}
            </div>

            {/* Filters */}
            <div className="flash-filters">
              <select 
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="discount">Mayor Descuento</option>
                <option value="price">Menor Precio</option>
                <option value="popular">Más Popular</option>
              </select>

              <div className="view-toggle">
                <button 
                  className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Vista de cuadrícula"
                >
                  <Grid size={20} />
                </button>
                <button 
                  className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  aria-label="Vista de lista"
                >
                  <List size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <DealProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                  onViewDetail={onViewDetail}
                  user={user}
                  onShowAuth={onShowAuth}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Filter className="empty-icon" size={64} />
              <p>No se encontraron productos en esta categoría</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default FlashDeals
