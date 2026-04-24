import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Auth from './components/Auth'
import Checkout from './pages/Checkout'
import AdminDashboard from './components/AdminDashboard'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)

  const addToCart = (product) => {
    if (!user) { setShowAuth(true); return }
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id)
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const viewProductDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)

  const handleLogin = (userData) => {
    setUser(userData)
    setShowAuth(false)
  }

  const handleLogout = () => {
    setUser(null)
    setCart([])
    setCurrentPage('home')
  }

  const handleRegister = (userData) => {
    setUser(userData)
    setShowAuth(false)
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

  const handleOrderComplete = () => {
    setCart([])
    setShowCheckout(false)
    setCurrentPage('home')
    alert('¡Pedido completado exitosamente!')
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
      default:
        return (
          <>
            <Hero />
            <Stats />
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

  return (
    <div className="App">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        cartItemsCount={getTotalItems()}
        setShowCart={() => setShowCart(true)}
        user={user}
        onLogout={handleLogout}
        setShowAuth={setShowAuth}
      />

      <main>{renderPage()}</main>

      {!showCheckout && <Footer />}

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
    </div>
  )
}

export default App