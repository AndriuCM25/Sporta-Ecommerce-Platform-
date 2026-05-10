import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import ShippingInfo from './pages/ShippingInfo'
import ReturnsInfo from './pages/ReturnsInfo'
import SizeGuide from './pages/SizeGuide'
import FAQ from './pages/FAQ'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Auth from './components/Auth'
import Checkout from './pages/Checkout'
import AdminDashboard from './components/AdminDashboard'
import AIAssistant from './components/AIAssistant'
import FlashSaleBanner from './components/FlashSaleBanner'
import DealProductCard from './components/DealProductCard'
import { api } from './api'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [loadingCart, setLoadingCart] = useState(false)

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('sporta_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (err) {
        console.error('Error al cargar datos guardados:', err)
        localStorage.removeItem('sporta_user')
      }
    }
  }, [])

  // Cargar carrito desde la base de datos cuando el usuario inicia sesión
  useEffect(() => {
    if (user) {
      loadCartFromDB()
    } else {
      setCart([])
    }
  }, [user])

  const loadCartFromDB = async () => {
    if (!user) return
    setLoadingCart(true)
    try {
      const response = await api.getCart()
      if (response.cart) {
        setCart(response.cart)
      }
    } catch (err) {
      console.error('Error cargando carrito:', err)
    }
    setLoadingCart(false)
  }

  const addToCart = async (product) => {
    if (!user) { setShowAuth(true); return }
    
    try {
      // Agregar al backend
      await api.addToCart(product.id, product.quantity || 1, product.selectedSize, product.selectedColor)
      
      // Recargar carrito desde el backend
      await loadCartFromDB()
    } catch (err) {
      console.error('Error agregando al carrito:', err)
      alert('Error al agregar el producto al carrito')
    }
  }

  const viewProductDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const removeFromCart = async (cartItemId) => {
    try {
      await api.removeFromCart(cartItemId)
      await loadCartFromDB()
    } catch (err) {
      console.error('Error eliminando del carrito:', err)
      alert('Error al eliminar el producto')
    }
  }

  const updateQuantity = async (cartItemId, newQuantity) => {
    if (newQuantity < 1) return
    try {
      await api.updateCartItem(cartItemId, newQuantity)
      await loadCartFromDB()
    } catch (err) {
      console.error('Error actualizando cantidad:', err)
      alert('Error al actualizar la cantidad')
    }
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleLogin = (userData) => {
    setUser(userData)
    setShowAuth(false)
    
    // Guardar usuario en localStorage
    localStorage.setItem('sporta_user', JSON.stringify(userData))
    
    // Guardar token si viene en userData
    if (userData.token) {
      localStorage.setItem('sporta_token', userData.token)
    }
    
    // El carrito se cargará automáticamente por el useEffect
  }

  const handleLogout = async () => {
    // Limpiar la sesión
    localStorage.removeItem('sporta_user')
    localStorage.removeItem('sporta_token')
    
    setUser(null)
    setCart([])
    setShowCheckout(false)
    setCurrentPage('home')
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setShowAuth(false)
    
    // Guardar usuario en localStorage
    localStorage.setItem('sporta_user', JSON.stringify(userData))
  }

  const handleCheckout = () => {
    if (!user) { setShowCart(false); setShowAuth(true); return }
    if (cart.length === 0) { alert('Tu carrito está vacío'); return }
    setShowCart(false)
    setShowCheckout(true)
  }

  const handleReturnFromCheckout = () => {
    setShowCheckout(false)
    setShowCart(true)
  }

  const handleOrderComplete = async () => {
    // Limpiar carrito en la base de datos
    try {
      await api.clearCart()
      setCart([])
    } catch (err) {
      console.error('Error limpiando carrito:', err)
    }
  }

  // Si el usuario logueado es admin, mostrar solo el panel de administración
  if (user?.role === 'admin') {
    return <AdminDashboard user={user} onLogout={handleLogout} />
  }

  const renderPage = () => {
    if (showCheckout) {
      return (
        <Checkout
          cart={cart}
          getTotalPrice={getTotalPrice}
          onReturnToCart={handleReturnFromCheckout}
          onOrderComplete={handleOrderComplete}
          user={user}
        />
      )
    }
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Stats />
            {/* Sección de Ofertas Flash */}
            <FlashDealsSection />
            <Products
              addToCart={addToCart}
              viewProductDetail={viewProductDetail}
              user={user}
              onShowAuth={() => setShowAuth(true)}
            />
          </>
        )
      case 'products':
        return (
          <Products
            addToCart={addToCart}
            viewProductDetail={viewProductDetail}
            user={user}
            onShowAuth={() => setShowAuth(true)}
          />
        )
      case 'product-detail':
        return (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            onBack={() => setCurrentPage('products')}
            user={user}
            onShowAuth={() => setShowAuth(true)}
          />
        )
      case 'about':
        return <About />
      case 'contact':
        return <Contact />
      case 'shipping':
        return <ShippingInfo />
      case 'returns':
        return <ReturnsInfo />
      case 'sizes':
        return <SizeGuide />
      case 'faq':
        return <FAQ />
      default:
        return (
          <>
            <Hero />
            <Stats />
            {/* Sección de Ofertas Flash */}
            <FlashDealsSection />
            <Products
              addToCart={addToCart}
              viewProductDetail={viewProductDetail}
              user={user}
              onShowAuth={() => setShowAuth(true)}
            />
          </>
        )
    }
  }

  // Componente de Ofertas Flash
  const FlashDealsSection = () => {
    const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    
    const dealProducts = [
      {
        id: 101,
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
        id: 102,
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
        id: 103,
        name: 'Puma RS-X³ Puzzle',
        category: 'Lifestyle',
        price: 380,
        discountPrice: 190,
        discount: 50,
        image: '/shoe3.jpg',
        stock: 60,
        sold: 50
      }
    ]

    return (
      <>
        <style>{`
          .flash-deals-section {
            background: #0a0a0a;
            padding: 4rem 2rem;
            border-top: 1px solid rgba(255,255,255,0.06);
          }
          .flash-deals-container {
            max-width: 1400px;
            margin: 0 auto;
          }
          .flash-deals-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
          }
          .flash-section-header {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin: 3rem 0 0 0;
            flex-wrap: wrap;
            gap: 1rem;
          }
          .flash-section-title {
            font-family: 'Bebas Neue', sans-serif;
            font-size: clamp(1.8rem, 4vw, 2.8rem);
            letter-spacing: 2px;
            color: #fff;
            margin: 0;
          }
          .flash-section-title span {
            color: #FF4500;
          }
          @media (max-width: 768px) {
            .flash-deals-section {
              padding: 3rem 1.5rem;
            }
            .flash-deals-grid {
              grid-template-columns: 1fr;
              gap: 1.5rem;
            }
          }
        `}</style>
        
        <div className="flash-deals-section">
          <div className="flash-deals-container">
            <FlashSaleBanner endTime={flashSaleEndTime} discount={50} />
            
            <div className="flash-section-header">
              <h2 className="flash-section-title">
                OFERTAS <span>RELÁMPAGO</span>
              </h2>
            </div>

            <div className="flash-deals-grid">
              {dealProducts.map(product => (
                <DealProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onViewDetail={viewProductDetail}
                  user={user}
                  onShowAuth={() => setShowAuth(true)}
                />
              ))}
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="App">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={(page) => {
          setCurrentPage(page)
          setShowCheckout(false) // Cerrar checkout al navegar
        }}
        cartItemsCount={getTotalItems()}
        setShowCart={() => setShowCart(true)}
        user={user}
        onLogout={handleLogout}
        setShowAuth={setShowAuth}
      />

      <main>{renderPage()}</main>

      {!showCheckout && <Footer onNavigate={(page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }} />}

      {showCart && (
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          getTotalPrice={getTotalPrice}
          setShowCart={setShowCart}
          onCheckout={handleCheckout}
          user={user}
          onShowAuth={() => setShowAuth(true)}
        />
      )}

      {showAuth && (
        <Auth
          onClose={() => setShowAuth(false)}
          onLogin={handleLogin}
          onRegister={handleRegister}
        />
      )}

      {/* Asistente Virtual con IA */}
      <AIAssistant mode="customer" user={user} />
    </div>
  )
}

export default App