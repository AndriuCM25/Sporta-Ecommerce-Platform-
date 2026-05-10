import { useState } from 'react'
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react'
import BrandPartners from './BrandPartners'

const Footer = ({ onNavigate }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      // Conectar con el backend
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'
      const response = await fetch(`${API_URL}/api/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubscribed(true)
        setEmail('')
        console.log('✅ Suscripción exitosa:', data)
        
        // Reset después de 5 segundos
        setTimeout(() => setSubscribed(false), 5000)
      } else {
        console.error('❌ Error en la suscripción:', data.error)
        alert('Hubo un error al procesar tu suscripción. Por favor intenta nuevamente.')
      }
    } catch (error) {
      console.error('Error al suscribirse:', error)
      alert('No se pudo conectar con el servidor. Por favor intenta más tarde.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/sporta', label: 'Facebook', color: '#1877F2' },
    { icon: Instagram, url: 'https://instagram.com/sporta', label: 'Instagram', color: '#E4405F' },
    { icon: Twitter, url: 'https://twitter.com/sporta', label: 'Twitter', color: '#1DA1F2' },
    { icon: Youtube, url: 'https://youtube.com/sporta', label: 'YouTube', color: '#FF0000' }
  ]

  const handleLinkClick = (e, page) => {
    e.preventDefault()
    
    // Scroll suave hacia arriba
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Navegar a la página si la función está disponible
    if (onNavigate) {
      onNavigate(page)
    } else {
      console.log('Navegando a:', page)
    }
  }

  return (
    <>
      <style>{`
        .footer-root {
          background: #080808;
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 4rem 2rem 2rem;
          font-family: 'DM Sans', sans-serif;
          position: relative;
        }
        .footer-root::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #FF4500, transparent);
          opacity: 0.5;
        }
        .footer-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
        }
        .footer-brand-name {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 2rem;
          letter-spacing: 4px;
          color: #fff;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .footer-brand-name img {
          height: 32px;
          filter: invert(1);
        }
        .footer-brand-name span { color: #FF4500; }
        .footer-tagline {
          color: rgba(255,255,255,0.35);
          font-size: 0.85rem;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .footer-contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255,255,255,0.4);
          font-size: 0.85rem;
          margin-bottom: 0.75rem;
          transition: color 0.2s ease;
        }
        .footer-contact-item:hover {
          color: #FF4500;
        }
        .footer-contact-item svg {
          flex-shrink: 0;
        }
        .footer-social {
          display: flex;
          gap: 0.75rem;
          margin-top: 1.25rem;
        }
        .footer-social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          transition: all 0.3s ease;
          cursor: pointer;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        }
        .footer-social-btn.facebook:hover {
          background: #1877F2;
          border-color: #1877F2;
          color: #fff;
        }
        .footer-social-btn.instagram:hover {
          background: linear-gradient(45deg, #F58529, #DD2A7B, #8134AF);
          border-color: #E4405F;
          color: #fff;
        }
        .footer-social-btn.twitter:hover {
          background: #1DA1F2;
          border-color: #1DA1F2;
          color: #fff;
        }
        .footer-social-btn.youtube:hover {
          background: #FF0000;
          border-color: #FF0000;
          color: #fff;
        }
        .footer-col-title {
          font-size: 0.7rem;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          font-weight: 600;
          margin-bottom: 1.25rem;
        }
        .footer-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .footer-links a {
          color: rgba(255,255,255,0.5);
          text-decoration: none;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          display: inline-block;
        }
        .footer-links a:hover { 
          color: #FF4500;
          transform: translateX(4px);
        }
        .footer-newsletter {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .footer-newsletter-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 1.1rem;
          letter-spacing: 2px;
          color: #fff;
          margin: 0 0 0.5rem 0;
        }
        .footer-newsletter-desc {
          color: rgba(255,255,255,0.4);
          font-size: 0.8rem;
          margin: 0 0 1rem 0;
          line-height: 1.5;
        }
        .footer-newsletter-form {
          display: flex;
          gap: 0.5rem;
        }
        .footer-newsletter-input {
          flex: 1;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          color: #fff;
          font-size: 0.85rem;
          outline: none;
          transition: all 0.2s ease;
        }
        .footer-newsletter-input:focus {
          border-color: #FF4500;
          background: rgba(255,69,0,0.05);
        }
        .footer-newsletter-input::placeholder {
          color: rgba(255,255,255,0.25);
        }
        .footer-newsletter-btn {
          background: #FF4500;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1.25rem;
          color: #fff;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          white-space: nowrap;
        }
        .footer-newsletter-btn:hover:not(:disabled) {
          background: #e03d00;
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255,69,0,0.3);
        }
        .footer-newsletter-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .footer-newsletter-success {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4ade80;
          font-size: 0.85rem;
          margin-top: 0.75rem;
          animation: slideIn 0.3s ease;
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .footer-bottom {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .footer-copy {
          color: rgba(255,255,255,0.2);
          font-size: 0.78rem;
        }
        .footer-copy a {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-copy a:hover {
          color: #FF4500;
        }
        .footer-dot {
          width: 4px; height: 4px;
          border-radius: 50%;
          background: #FF4500;
          display: inline-block;
          margin: 0 6px;
          vertical-align: middle;
          opacity: 0.5;
        }
        .footer-payment-methods {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .footer-payment-icon {
          height: 24px;
          opacity: 0.4;
          transition: opacity 0.2s ease;
        }
        .footer-payment-icon:hover {
          opacity: 0.8;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { justify-content: center; text-align: center; }
          .footer-newsletter-form { flex-direction: column; }
          .footer-newsletter-btn { justify-content: center; }
        }
      `}</style>

      {/* Brand Partners Section */}
      <BrandPartners />

      <footer className="footer-root">
        <div className="footer-grid">
          {/* Brand & Contact */}
          <div>
            <div className="footer-brand-name">
              <img src="/Sporta_BLACK-logo.png" alt="Sporta" />
              SPORT<span>A</span>
            </div>
            <p className="footer-tagline">
              Equipamiento deportivo de alto rendimiento. Diseñado para atletas que no aceptan límites.
            </p>

            {/* Contact Info */}
            <div className="footer-contact-item">
              <Phone size={16} />
              <span>+51 925 841 052</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={16} />
              <span>adminSporta@depor.pe</span>
            </div>
            <div className="footer-contact-item">
              <MapPin size={16} />
              <span>Lima, Perú</span>
            </div>

            {/* Social Media */}
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`footer-social-btn ${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <p className="footer-col-title">Tienda</p>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'products')}>Productos</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'products')}>Novedades</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'home')}>Ofertas</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'products')}>Colecciones</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'products')}>Marcas</a></li>
            </ul>
          </div>

          {/* Soporte */}
          <div>
            <p className="footer-col-title">Soporte</p>
            <ul className="footer-links">
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'shipping')}>Envíos y Entregas</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'returns')}>Devoluciones</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'sizes')}>Guía de Tallas</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'faq')}>Preguntas Frecuentes</a></li>
              <li><a href="#" onClick={(e) => handleLinkClick(e, 'contact')}>Contacto</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="footer-newsletter">
              <h4 className="footer-newsletter-title">Newsletter</h4>
              <p className="footer-newsletter-desc">
                Suscríbete y recibe ofertas exclusivas, nuevos lanzamientos y más.
              </p>
              <form className="footer-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  className="footer-newsletter-input"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                />
                <button 
                  type="submit" 
                  className="footer-newsletter-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send size={16} />
                      Enviar
                    </>
                  )}
                </button>
              </form>
              {subscribed && (
                <div className="footer-newsletter-success">
                  <CheckCircle size={16} />
                  <span>¡Suscripción exitosa!</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © 2026 Sporta<span className="footer-dot" />Todos los derechos reservados
            <span className="footer-dot" />
            <a href="#" onClick={(e) => handleLinkClick(e, 'privacidad')}>Privacidad</a>
            <span className="footer-dot" />
            <a href="#" onClick={(e) => handleLinkClick(e, 'terminos')}>Términos</a>
          </p>
          <div className="footer-payment-methods">
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginRight: '0.5rem' }}>
              Métodos de pago:
            </span>
            <svg className="footer-payment-icon" viewBox="0 0 48 32" fill="currentColor">
              <rect width="48" height="32" rx="4" fill="rgba(255,255,255,0.1)"/>
              <text x="24" y="20" textAnchor="middle" fontSize="10" fill="currentColor">VISA</text>
            </svg>
            <svg className="footer-payment-icon" viewBox="0 0 48 32" fill="currentColor">
              <rect width="48" height="32" rx="4" fill="rgba(255,255,255,0.1)"/>
              <circle cx="18" cy="16" r="8" fill="#EB001B" opacity="0.6"/>
              <circle cx="30" cy="16" r="8" fill="#F79E1B" opacity="0.6"/>
            </svg>
            <svg className="footer-payment-icon" viewBox="0 0 48 32" fill="currentColor">
              <rect width="48" height="32" rx="4" fill="rgba(255,255,255,0.1)"/>
              <text x="24" y="20" textAnchor="middle" fontSize="8" fill="currentColor">YAPE</text>
            </svg>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer