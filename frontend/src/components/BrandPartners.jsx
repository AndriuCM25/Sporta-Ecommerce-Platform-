const BrandPartners = () => {
  const brands = [
    { 
      name: 'Nike', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      fallback: 'NIKE'
    },
    { 
      name: 'Adidas', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      fallback: 'ADIDAS'
    },
    { 
      name: 'Jordan', 
      logo: 'https://upload.wikimedia.org/wikipedia/en/3/37/Jumpman_logo.svg',
      fallback: 'JORDAN'
    },
    { 
      name: 'Puma', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/04/Puma-Logo.png',
      fallback: 'PUMA'
    },
    { 
      name: 'New Balance', 
      logo: 'https://logos-world.net/wp-content/uploads/2020/09/New-Balance-Logo.png',
      fallback: 'NEW BALANCE'
    },
    { 
      name: 'Converse', 
      logo: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Converse_logo.svg',
      fallback: 'CONVERSE'
    }
  ]

  return (
    <>
      <style>{`
        .brand-partners-section {
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 4rem 2rem;
          position: relative;
          overflow: hidden;
        }

        .brand-partners-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF4500, transparent);
          opacity: 0.3;
        }

        .brand-partners-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .brand-partners-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .brand-partners-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: clamp(1.5rem, 4vw, 2rem);
          letter-spacing: 3px;
          color: rgba(255,255,255,0.4);
          margin: 0 0 0.5rem 0;
          text-transform: uppercase;
        }

        .brand-partners-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.25);
          margin: 0;
        }

        .brand-partners-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 2rem;
          align-items: center;
          justify-items: center;
        }

        .brand-partner-item {
          width: 100%;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }

        .brand-partner-item::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,69,0,0.05), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .brand-partner-item:hover {
          border-color: rgba(255,69,0,0.2);
          background: rgba(255,255,255,0.04);
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }

        .brand-partner-item:hover::before {
          opacity: 1;
        }

        .brand-logo {
          max-width: 100%;
          max-height: 50px;
          width: auto;
          height: auto;
          filter: brightness(0) invert(1) opacity(0.4);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .brand-logo.error {
          display: none;
        }

        .brand-fallback {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.2rem;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
          transition: all 0.3s ease;
          display: none;
        }

        .brand-logo.error + .brand-fallback {
          display: block;
        }

        .brand-partner-item:hover .brand-logo {
          filter: brightness(0) invert(1) opacity(0.8);
          transform: scale(1.1);
        }

        .brand-partner-item:hover .brand-fallback {
          color: rgba(255,255,255,0.8);
          transform: scale(1.1);
        }

        /* Animación de entrada escalonada */
        .brand-partner-item {
          animation: fadeInUp 0.6s ease backwards;
        }

        .brand-partner-item:nth-child(1) { animation-delay: 0.1s; }
        .brand-partner-item:nth-child(2) { animation-delay: 0.2s; }
        .brand-partner-item:nth-child(3) { animation-delay: 0.3s; }
        .brand-partner-item:nth-child(4) { animation-delay: 0.4s; }
        .brand-partner-item:nth-child(5) { animation-delay: 0.5s; }
        .brand-partner-item:nth-child(6) { animation-delay: 0.6s; }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .brand-partners-grid {
            grid-template-columns: repeat(4, 1fr);
            gap: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .brand-partners-section {
            padding: 3rem 1.5rem;
          }

          .brand-partners-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
          }

          .brand-partner-item {
            height: 70px;
          }

          .brand-logo {
            max-height: 40px;
          }
        }

        @media (max-width: 480px) {
          .brand-partners-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .brand-partner-item {
            height: 60px;
          }

          .brand-logo {
            max-height: 35px;
          }
        }
      `}</style>

      <div className="brand-partners-section">
        <div className="brand-partners-container">
          <div className="brand-partners-header">
            <h2 className="brand-partners-title">Marcas Afiliadas</h2>
            <p className="brand-partners-subtitle">
              Trabajamos con las mejores marcas deportivas del mundo
            </p>
          </div>

          <div className="brand-partners-grid">
            {brands.map((brand, index) => (
              <div key={index} className="brand-partner-item">
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="brand-logo"
                  loading="lazy"
                  onError={(e) => {
                    e.target.classList.add('error')
                  }}
                />
                <span className="brand-fallback">{brand.fallback}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default BrandPartners
