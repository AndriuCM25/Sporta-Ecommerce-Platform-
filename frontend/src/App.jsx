import { useState, useEffect } from 'react'
import './App.css'
import { api } from './api'
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
  const [authInitialMode, setAuthInitialMode] = useState('login')
  const [user, setUser] = useState(null)

  // Restaurar sesión — verifica el token contra el backend
  useEffect(() => {
    const token = localStorage.getItem('sporta_token')
    if (!token) return

    api.me(token)
      .then(res => {
        if (res?.user) {
          setUser(res.user)
          // Cargar carrito al restaurar sesión
          api.getCart().then(r => {
            if (r?.cart) setCart(r.cart)
          })
        } else {
          localStorage.removeItem('sporta_token')
          localStorage.removeItem('sporta_user')
          setUser(null)
        }
      })
      .catch(() => {
        localStorage.removeItem('sporta_token')
        localStorage.removeItem('sporta_user')
        setUser(null)
      })
  }, [])

  const handleLogin = async (credentials, setAuthError) => {
    if (credentials.token) {
      localStorage.setItem('sporta_token', credentials.token)
      localStorage.setItem('sporta_user', JSON.stringify(credentials.user))
      setUser(credentials.user)
      // Cargar carrito después de login con Google
      api.getCart().then(r => {
        if (r?.cart) setCart(r.cart)
      })
      setShowAuth(false)
      return
    }
    let res
    try {
      res = await api.login(credentials)
    } catch {
      localStorage.removeItem('sporta_token')
      localStorage.removeItem('sporta_user')
      setUser(null)
      if (setAuthError) setAuthError('No se pudo conectar con el servidor')
      return
    }
    if (!res || res.error || !res.token) {
      // Limpiar cualquier sesión vieja que pudiera estar en localStorage
      localStorage.removeItem('sporta_token')
      localStorage.removeItem('sporta_user')
      setUser(null)
      if (setAuthError) setAuthError(
        res?.error?.includes('Credenciales') ? 'Email o contraseña incorrectos' :
        res?.error || 'No se pudo iniciar sesión'
      )
      return
    }
    localStorage.setItem('sporta_token', res.token)
    localStorage.setItem('sporta_user', JSON.stringify(res.user))
    setUser(res.user)
    // Cargar carrito después de login normal
    api.getCart().then(r => {
      if (r?.cart) setCart(r.cart)
    })
    setShowAuth(false)
  }

  const handleRegister = async (credentials, setAuthError) => {
    let res
    try {
      res = await api.register(credentials)
    } catch {
      if (setAuthError) setAuthError('No se pudo conectar con el servidor')
      return
    }
    if (!res || res.error || !res.token) {
      if (setAuthError) setAuthError(
        res?.error?.includes('registrado') ? 'Este email ya tiene una cuenta' :
        res?.error || 'No se pudo crear la cuenta'
      )
      return
    }
    localStorage.setItem('sporta_token', res.token)
    localStorage.setItem('sporta_user', JSON.stringify(res.user))
    setUser(res.user)
    // Cargar carrito después de registro
    api.getCart().then(r => {
      if (r?.cart) setCart(r.cart)
    })
    setShowAuth(false)
  }

  const handleLogout = () => {
    // NO eliminar el carrito de la base de datos, solo limpiar el estado local
    localStorage.removeItem('sporta_token')
    localStorage.removeItem('sporta_user')
    localStorage.removeItem('sporta_cart')
    setUser(null)
    setCart([])
  }

  const addToCart = async (product) => {
    if (!user) { setShowAuth(true); return }
    await api.addToCart(product.id, 1)
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const viewProductDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

  const removeFromCart = async (productId) => {
    await api.removeFromCart(productId)
    setCart(prev => prev.filter(i => i.id !== productId))
  }

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return
    await api.updateCartItem(productId, newQuantity)
    setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity: newQuantity } : i))
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)

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
    api.clearCart()
    setCart([])
  }

  const handleNavigate = (page) => {
    setShowCheckout(false)
    setShowCart(false)
    setCurrentPage(page)
  }

  // Si es admin, mostrar panel de administración
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
          onGoHome={() => handleNavigate('home')}
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
        return <About setCurrentPage={setCurrentPage} />
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
        setCurrentPage={handleNavigate}
        cartItemsCount={getTotalItems()}
        setShowCart={() => setShowCart(true)}
        user={user}
        onLogout={handleLogout}
        setShowAuth={() => { setAuthInitialMode('login'); setShowAuth(true) }}
        setShowRegister={() => { setAuthInitialMode('register'); setShowAuth(true) }}
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
          initialMode={authInitialMode}
        />
      )}
    </div>
  )
}

export default App