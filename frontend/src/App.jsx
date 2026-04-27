import { useState, useEffect } from 'react'
import './App.css'
<<<<<<< HEAD
=======
import { api } from './api'
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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
<<<<<<< HEAD
import { api } from './api'
=======
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showAuth, setShowAuth] = useState(false)
<<<<<<< HEAD
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
=======
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
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
  }

  const addToCart = async (product) => {
    if (!user) { setShowAuth(true); return }
<<<<<<< HEAD
    
    try {
      // Agregar al backend
      await api.addToCart(product.id, product.quantity || 1, product.selectedSize, product.selectedColor)
      
      // Recargar carrito desde el backend
      await loadCartFromDB()
    } catch (err) {
      console.error('Error agregando al carrito:', err)
      alert('Error al agregar el producto al carrito')
    }
=======
    await api.addToCart(product.id, 1)
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      return [...prev, { ...product, quantity: 1 }]
    })
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
  }

  const viewProductDetail = (product) => {
    setSelectedProduct(product)
    setCurrentPage('product-detail')
  }

<<<<<<< HEAD
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
=======
  const removeFromCart = async (productId) => {
    await api.removeFromCart(productId)
    setCart(prev => prev.filter(i => i.id !== productId))
  }

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return
    await api.updateCartItem(productId, newQuantity)
    setCart(prev => prev.map(i => i.id === productId ? { ...i, quantity: newQuantity } : i))
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
  }

  const getTotalItems = () => cart.reduce((total, item) => total + item.quantity, 0)
  const getTotalPrice = () => cart.reduce((total, item) => total + (item.price * item.quantity), 0)

<<<<<<< HEAD
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

=======
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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

<<<<<<< HEAD
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
=======
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
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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
<<<<<<< HEAD
=======
          onGoHome={() => handleNavigate('home')}
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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
<<<<<<< HEAD
        return <About />
=======
        return <About setCurrentPage={setCurrentPage} />
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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
<<<<<<< HEAD
        setCurrentPage={(page) => {
          setCurrentPage(page)
          setShowCheckout(false) // Cerrar checkout al navegar
        }}
=======
        setCurrentPage={handleNavigate}
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
        cartItemsCount={getTotalItems()}
        setShowCart={() => setShowCart(true)}
        user={user}
        onLogout={handleLogout}
<<<<<<< HEAD
        setShowAuth={setShowAuth}
=======
        setShowAuth={() => { setAuthInitialMode('login'); setShowAuth(true) }}
        setShowRegister={() => { setAuthInitialMode('register'); setShowAuth(true) }}
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
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
<<<<<<< HEAD
=======
          initialMode={authInitialMode}
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
        />
      )}
    </div>
  )
}

export default App