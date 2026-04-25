import { useState, useEffect, useRef, useCallback } from 'react'
import { api } from '../api'

// ─── HELPERS ────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    shipped: 'badge-success', paid: 'badge-info', pending: 'badge-warning',
    cancelled: 'badge-danger', active: 'badge-success', blocked: 'badge-danger',
    Enviado: 'badge-success', Pagado: 'badge-info', Pendiente: 'badge-warning',
    Activo: 'badge-success', Bloqueado: 'badge-danger',
  }
  const labels = {
    shipped: 'Enviado', paid: 'Pagado', pending: 'Pendiente',
    cancelled: 'Cancelado', active: 'Activo', blocked: 'Bloqueado',
  }
  return <span className={`adm-badge ${map[status] || 'badge-gray'}`}>{labels[status] || status}</span>
}

function Avatar({ name = '?', size = 28 }) {
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: '#FF4500', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.38, fontWeight: 700, color: '#fff', flexShrink: 0 }}>
      {initials}
    </div>
  )
}

function Spinner() {
  return <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem' }}>Cargando...</div>
}

function EmptyRow({ cols, msg = 'Sin resultados' }) {
  return <tr><td colSpan={cols} style={{ textAlign: 'center', padding: '2.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.82rem' }}>{msg}</td></tr>
}

// ─── MAIN ────────────────────────────────────────────────────
const AdminDashboard = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard')

  // Stats
  const [stats, setStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(true)

  // Users
  const [users, setUsers] = useState([])
  const [usersLoading, setUsersLoading] = useState(false)
  const [userSearch, setUserSearch] = useState('')
  const [showUserModal, setShowUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Products
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(false)
  const [prodSearch, setProdSearch] = useState('')
  const [prodCat, setProdCat] = useState('')
  const [showProductModal, setShowProductModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [productForm, setProductForm] = useState({ name: '', price: '', category: 'running', stock: '', badge: '', description: '', image: '' })
  const [productSaving, setProductSaving] = useState(false)
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [uploadingImage, setUploadingImage] = useState(false)

  // Orders
  const [orders, setOrders] = useState([])
  const [ordersLoading, setOrdersLoading] = useState(false)
  const [salesTab, setSalesTab] = useState('all')
  const [salesSearch, setSalesSearch] = useState('')
  const [showOrderModal, setShowOrderModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [orderUpdating, setOrderUpdating] = useState(false)

  // Reports
  const [reportFrom, setReportFrom] = useState(() => new Date().getFullYear() + '-01-01')
  const [reportTo, setReportTo] = useState(() => new Date().toISOString().slice(0, 10))
  const [reportType, setReportType] = useState('sales')

  // Charts
  const salesChartRef = useRef(null)
  const catChartRef = useRef(null)
  const salesChartInst = useRef(null)
  const catChartInst = useRef(null)

  // ── Loaders ──────────────────────────────────────────────
  const loadStats = useCallback(async () => {
    setStatsLoading(true)
    const res = await api.admin.getStats()
    if (res?.stats) setStats(res.stats)
    setStatsLoading(false)
  }, [])

  const loadUsers = useCallback(async () => {
    setUsersLoading(true)
    const res = await api.admin.getUsers()
    if (res?.users) setUsers(res.users)
    setUsersLoading(false)
  }, [])

  const loadProducts = useCallback(async () => {
    setProductsLoading(true)
    const res = await api.getProducts()
    if (res?.products) setProducts(res.products)
    setProductsLoading(false)
  }, [])

  const loadOrders = useCallback(async () => {
    setOrdersLoading(true)
    const res = await api.admin.getOrders()
    if (res?.orders) setOrders(res.orders)
    setOrdersLoading(false)
  }, [])

  useEffect(() => { 
    loadStats()
    // Cargar productos para el gráfico de categorías en dashboard
    if (products.length === 0) loadProducts()
    // Cargar pedidos para la tabla de últimos pedidos en dashboard
    if (orders.length === 0) loadOrders()
  }, [loadStats, loadProducts, loadOrders, products.length, orders.length])

  useEffect(() => {
    if (activePage === 'users' && users.length === 0) loadUsers()
    if (activePage === 'products' && products.length === 0) loadProducts()
    if (activePage === 'sales' && orders.length === 0) loadOrders()
    if (activePage === 'reports') { loadOrders(); loadUsers(); loadProducts() }
  }, [activePage, users.length, products.length, orders.length, loadUsers, loadProducts, loadOrders])

  // ── Charts ───────────────────────────────────────────────
  const destroyChart = (ref) => { if (ref.current) { ref.current.destroy(); ref.current = null } }

  useEffect(() => {
    if (activePage !== 'dashboard' || !stats) return
    const init = () => {
      if (!window.Chart || !salesChartRef.current || !catChartRef.current) return
      destroyChart(salesChartInst)
      destroyChart(catChartInst)

      // Ventas por mes desde el backend
      const monthLabels = stats.monthlyRevenue?.map(m => m.month) || []
      const monthSales = stats.monthlyRevenue?.map(m => m.revenue) || []

      salesChartInst.current = new window.Chart(salesChartRef.current, {
        type: 'bar',
        data: {
          labels: monthLabels,
          datasets: [{ label: 'Ingresos (S/)', data: monthSales, backgroundColor: '#FF4500', borderRadius: 4 }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: { beginAtZero: true, ticks: { font: { size: 10 }, callback: v => 'S/' + v.toLocaleString() }, grid: { color: 'rgba(150,150,150,0.1)' } },
            x: { ticks: { font: { size: 10 } }, grid: { display: false } },
          },
        },
      })

      // Categorías desde productos reales
      const cats = { running: 0, lifestyle: 0, basketball: 0 }
      products.forEach(p => { if (cats[p.category] !== undefined) cats[p.category]++ })
      catChartInst.current = new window.Chart(catChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Running', 'Lifestyle', 'Basketball'],
          datasets: [{ data: [cats.running, cats.lifestyle, cats.basketball], backgroundColor: ['#FF4500', '#3b82f6', '#22c55e'], borderWidth: 0, hoverOffset: 4 }],
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, cutout: '65%' },
      })
    }

    if (window.Chart) { setTimeout(init, 100); return }
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js'
    s.onload = () => setTimeout(init, 100)
    document.head.appendChild(s)
  }, [activePage, stats, products])

  // ── Products CRUD ────────────────────────────────────────
  const openProductModal = (product = null) => {
    setEditingProduct(product)
    setProductForm(product
      ? { name: product.name, price: product.price, category: product.category, stock: product.stock ?? '', badge: product.badge || '', description: product.description || '', image: product.image || '' }
      : { name: '', price: '', category: 'running', stock: '', badge: '', description: '', image: '' }
    )
    setImageFile(null)
    setImagePreview(product?.image || null)
    setShowProductModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB max
        alert('La imagen no debe superar 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        alert('Solo se permiten archivos de imagen')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file) => {
    if (!api.supabase) {
      throw new Error('Supabase no está configurado. Por favor configura las variables de entorno VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `products/${fileName}`

    const { data, error } = await api.supabase.storage
      .from('product-images')
      .upload(filePath, file)

    if (error) throw error

    const { data: { publicUrl } } = api.supabase.storage
      .from('product-images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const saveProduct = async () => {
    const { name, price, category, stock, badge, description } = productForm
    if (!name.trim() || !price) return
    
    setProductSaving(true)
    try {
      let imageUrl = productForm.image

      // Si hay una nueva imagen, subirla
      if (imageFile) {
        setUploadingImage(true)
        imageUrl = await uploadImage(imageFile)
        setUploadingImage(false)
      }

      const payload = { 
        name, 
        price: parseFloat(price), 
        category, 
        stock: parseInt(stock) || 0, 
        badge: badge || null, 
        description: description || null,
        image: imageUrl || null
      }

      if (editingProduct) {
        const res = await api.admin.updateProduct(editingProduct.id, payload)
        if (res?.product) setProducts(prev => prev.map(p => p.id === editingProduct.id ? res.product : p))
      } else {
        const res = await api.admin.createProduct(payload)
        if (res?.product) setProducts(prev => [...prev, res.product])
      }
      
      setShowProductModal(false)
      setImageFile(null)
      setImagePreview(null)
    } catch (error) {
      alert('Error al guardar el producto: ' + error.message)
    } finally {
      setProductSaving(false)
      setUploadingImage(false)
    }
  }

  const deleteProduct = async (id) => {
    if (!window.confirm('¿Eliminar este producto?')) return
    await api.admin.deleteProduct(id)
    setProducts(prev => prev.filter(p => p.id !== id))
  }

  // ── Users ────────────────────────────────────────────────
  const toggleUserBlock = async (u) => {
    const res = await api.admin.updateUser(u.id, { blocked: !u.blocked })
    if (res?.user) {
      setUsers(prev => prev.map(x => x.id === u.id ? res.user : x))
      if (selectedUser?.id === u.id) setSelectedUser(res.user)
    }
  }

  const deleteUser = async (id) => {
    if (!window.confirm('¿Eliminar este usuario?')) return
    await api.admin.deleteUser(id)
    setUsers(prev => prev.filter(u => u.id !== id))
    setShowUserModal(false)
  }

  // ── Orders ───────────────────────────────────────────────
  const STATUS_NEXT = { pending: 'paid', paid: 'shipped' }
  const STATUS_LABEL = { pending: 'Marcar como Pagado', paid: 'Marcar como Enviado' }

  const advanceOrder = async (order) => {
    const next = STATUS_NEXT[order.status]
    if (!next) return
    setOrderUpdating(true)
    const res = await api.admin.updateOrderStatus(order.id, next)
    if (res?.order) {
      setOrders(prev => prev.map(o => o.id === order.id ? { ...o, ...res.order, items: o.items } : o))
      setSelectedOrder(prev => prev ? { ...prev, ...res.order } : null)
      loadStats()
    }
    setOrderUpdating(false)
  }

  // ── Reports ──────────────────────────────────────────────
  const generateReport = (format) => {
    const from = new Date(reportFrom)
    const to = new Date(reportTo)
    let content = `SPORTA — REPORTE DE ${reportType.toUpperCase()}\nFecha: ${reportFrom} al ${reportTo}\n\n`

    if (reportType === 'sales') {
      const filtered = orders.filter(o => { const d = new Date(o.created_at); return d >= from && d <= to })
      content += 'Pedido,Cliente,Fecha,Total,Estado\n'
      filtered.forEach(o => { content += `${o.id},${o.name},${new Date(o.created_at).toLocaleDateString('es-PE')},${o.total},${o.status}\n` })
    } else if (reportType === 'users') {
      content += 'Nombre,Email,Registro,Estado\n'
      users.forEach(u => { content += `${u.name},${u.email},${new Date(u.created_at).toLocaleDateString('es-PE')},${u.blocked ? 'Bloqueado' : 'Activo'}\n` })
    } else {
      content += 'Producto,Categoría,Precio,Stock\n'
      products.forEach(p => { content += `${p.name},${p.category},${p.price},${p.stock}\n` })
    }

    const ext = format === 'pdf' ? 'txt' : 'csv'
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `reporte-sporta-${reportType}.${ext}`
    document.body.appendChild(a); a.click(); document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  // ── Filtered ─────────────────────────────────────────────
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(prodSearch.toLowerCase()) && (!prodCat || p.category === prodCat)
  )
  const filteredUsers = users.filter(u =>
    u.name?.toLowerCase().includes(userSearch.toLowerCase()) || u.email?.toLowerCase().includes(userSearch.toLowerCase())
  )
  const tabMap = { all: null, pending: 'pending', paid: 'paid', shipped: 'shipped' }
  const filteredOrders = orders.filter(o => {
    const tabOk = !tabMap[salesTab] || o.status === tabMap[salesTab]
    const searchOk = !salesSearch || o.name?.toLowerCase().includes(salesSearch.toLowerCase()) || String(o.id).includes(salesSearch)
    return tabOk && searchOk
  })

  const fmt = (n) => `S/ ${Number(n || 0).toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString('es-PE') : '-'

  return (
    <>
      <style>{`
        .adm-root{display:flex;min-height:100vh;background:#0a0a0a;font-family:'DM Sans',sans-serif;color:#fff}
        .adm-sidebar{width:220px;background:#0e0e0e;border-right:1px solid rgba(255,255,255,0.06);display:flex;flex-direction:column;flex-shrink:0}
        .adm-logo{padding:20px 16px 16px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:10px}
        .adm-logo-sq{width:32px;height:32px;background:#FF4500;border-radius:8px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:14px;flex-shrink:0}
        .adm-logo-text{font-family:'Bebas Neue',sans-serif;font-size:1.2rem;letter-spacing:2px;color:#fff;line-height:1}
        .adm-logo-sub{font-size:0.65rem;color:rgba(255,69,0,0.7);letter-spacing:1px;text-transform:uppercase}
        .adm-nav{flex:1;padding:12px 8px}
        .adm-nav-group-label{font-size:0.6rem;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,0.2);padding:0 8px;margin-bottom:6px;font-weight:600}
        .adm-nav-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:10px;cursor:pointer;font-size:0.82rem;color:rgba(255,255,255,0.5);margin-bottom:2px;border:none;background:none;width:100%;text-align:left;transition:all 0.15s}
        .adm-nav-item:hover{background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.8)}
        .adm-nav-item.active{background:rgba(255,69,0,0.1);color:#FF4500}
        .adm-nav-item svg{flex-shrink:0;opacity:0.5}
        .adm-nav-item.active svg{opacity:1}
        .nav-dot{display:none;width:5px;height:5px;border-radius:50%;background:#FF4500;margin-left:auto}
        .adm-nav-item.active .nav-dot{display:block}
        .adm-sidebar-footer{padding:12px;border-top:1px solid rgba(255,255,255,0.06)}
        .adm-admin-pill{display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,69,0,0.08);border:1px solid rgba(255,69,0,0.2);border-radius:12px}
        .adm-admin-av{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#FF4500,#ff6a35);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;flex-shrink:0}
        .adm-admin-name{font-size:0.78rem;font-weight:600;color:#fff}
        .adm-admin-role{font-size:0.65rem;color:#FF4500}
        .adm-logout-btn{margin-top:8px;width:100%;background:none;border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.35);padding:7px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:0.75rem;cursor:pointer;transition:all 0.2s}
        .adm-logout-btn:hover{border-color:rgba(255,69,0,0.3);color:#FF4500;background:rgba(255,69,0,0.06)}
        .adm-main{flex:1;display:flex;flex-direction:column;min-width:0;overflow:auto}
        .adm-topbar{padding:14px 24px;border-bottom:1px solid rgba(255,255,255,0.06);background:#0e0e0e;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;position:sticky;top:0;z-index:10}
        .adm-topbar-left h1{font-family:'Bebas Neue',sans-serif;font-size:1.4rem;letter-spacing:2px;color:#fff}
        .adm-topbar-left p{font-size:0.75rem;color:rgba(255,255,255,0.3);margin-top:1px}
        .adm-content{padding:24px;flex:1}
        .adm-metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
        .adm-metric{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:18px;position:relative;overflow:hidden}
        .adm-metric::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,#FF4500,transparent)}
        .adm-metric-label{font-size:0.72rem;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px}
        .adm-metric-val{font-family:'Bebas Neue',sans-serif;font-size:2rem;letter-spacing:1px;color:#fff;line-height:1;margin-bottom:4px}
        .adm-metric-sub{font-size:0.72rem;color:rgba(255,255,255,0.25)}
        .adm-charts-row{display:grid;grid-template-columns:2fr 1fr;gap:14px;margin-bottom:24px}
        .adm-chart-card{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px}
        .adm-chart-title{font-size:0.88rem;font-weight:600;color:#fff;margin-bottom:3px}
        .adm-chart-sub{font-size:0.72rem;color:rgba(255,255,255,0.3);margin-bottom:14px}
        .adm-legend{display:flex;gap:14px;margin-bottom:12px;flex-wrap:wrap}
        .adm-legend-item{display:flex;align-items:center;gap:5px;font-size:0.72rem;color:rgba(255,255,255,0.4)}
        .adm-legend-dot{width:10px;height:10px;border-radius:2px}
        .adm-table-card{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:16px;overflow:hidden}
        .adm-table-head{padding:16px 20px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between}
        .adm-table-head-title{font-size:0.88rem;font-weight:600;color:#fff}
        table.adm-table{width:100%;border-collapse:collapse;font-size:0.82rem}
        .adm-table th{padding:10px 16px;text-align:left;font-size:0.65rem;font-weight:600;color:rgba(255,255,255,0.25);border-bottom:1px solid rgba(255,255,255,0.06);text-transform:uppercase;letter-spacing:1px}
        .adm-table td{padding:11px 16px;color:rgba(255,255,255,0.65);border-bottom:1px solid rgba(255,255,255,0.04)}
        .adm-table tr:last-child td{border-bottom:none}
        .adm-table tr:hover td{background:rgba(255,255,255,0.02)}
        .adm-badge{display:inline-flex;align-items:center;padding:3px 9px;border-radius:50px;font-size:0.68rem;font-weight:600}
        .badge-success{background:rgba(74,222,128,0.1);color:#4ade80}
        .badge-warning{background:rgba(251,191,36,0.1);color:#fbbf24}
        .badge-info{background:rgba(96,165,250,0.1);color:#60a5fa}
        .badge-danger{background:rgba(248,113,113,0.1);color:#f87171}
        .badge-gray{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.4)}
        .adm-btn{padding:7px 14px;border-radius:9px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);font-family:'DM Sans',sans-serif;font-size:0.78rem;cursor:pointer;transition:all 0.15s}
        .adm-btn:hover{background:rgba(255,255,255,0.08);color:#fff}
        .adm-btn:disabled{opacity:0.4;cursor:not-allowed}
        .adm-btn-primary{background:#FF4500;color:#fff;border-color:#FF4500}
        .adm-btn-primary:hover{background:#e03d00;border-color:#e03d00}
        .adm-btn-danger{background:rgba(248,113,113,0.1);color:#f87171;border-color:rgba(248,113,113,0.2)}
        .adm-btn-danger:hover{background:rgba(248,113,113,0.2)}
        .adm-btn-sm{padding:4px 10px;font-size:0.72rem;border-radius:7px}
        .adm-search-row{display:flex;gap:10px;margin-bottom:18px;flex-wrap:wrap;align-items:center}
        .adm-search-row input,.adm-search-row select{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:9px;color:#fff;font-family:'DM Sans',sans-serif;font-size:0.82rem;padding:8px 12px}
        .adm-search-row input{flex:1;min-width:200px}
        .adm-search-row input::placeholder{color:rgba(255,255,255,0.2)}
        .adm-search-row input:focus,.adm-search-row select:focus{outline:none;border-color:rgba(255,69,0,0.4)}
        .adm-search-row select option{background:#111;color:#fff}
        .adm-tabs{display:flex;gap:0;margin-bottom:18px;border-bottom:1px solid rgba(255,255,255,0.06)}
        .adm-tab{padding:9px 16px;font-size:0.78rem;color:rgba(255,255,255,0.35);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;background:none;border-top:none;border-left:none;border-right:none;font-family:'DM Sans',sans-serif;transition:all 0.15s}
        .adm-tab:hover{color:rgba(255,255,255,0.6)}
        .adm-tab.active{color:#FF4500;border-bottom-color:#FF4500;font-weight:600}
        .adm-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;z-index:9999;padding:1rem}
        .adm-modal{background:#111;border:1px solid rgba(255,255,255,0.1);border-radius:20px;width:100%;max-width:460px;max-height:90vh;overflow:auto;box-shadow:0 40px 80px rgba(0,0,0,0.6)}
        .adm-modal-header{padding:18px 22px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between}
        .adm-modal-title{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;letter-spacing:2px;color:#fff}
        .adm-modal-body{padding:22px}
        .adm-modal-footer{padding:14px 22px;border-top:1px solid rgba(255,255,255,0.07);display:flex;gap:10px;justify-content:flex-end}
        .adm-form-group{margin-bottom:16px}
        .adm-form-label{font-size:0.72rem;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:rgba(255,255,255,0.35);display:block;margin-bottom:6px}
        .adm-form-input{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:10px;color:#fff;font-family:'DM Sans',sans-serif;font-size:0.88rem;padding:9px 12px;transition:border-color 0.2s;box-sizing:border-box}
        .adm-form-input:focus{outline:none;border-color:rgba(255,69,0,0.4);background:rgba(255,69,0,0.03)}
        .adm-form-input::placeholder{color:rgba(255,255,255,0.2)}
        .adm-form-input option{background:#111;color:#fff}
        .adm-form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px}
        .adm-detail-box{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:16px}
        .adm-detail-row{display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);font-size:0.82rem}
        .adm-detail-row:last-child{border-bottom:none}
        .adm-detail-row .key{color:rgba(255,255,255,0.35)}
        .adm-detail-row .val{color:#fff;font-weight:500;text-align:right}
        .adm-pagination{display:flex;align-items:center;justify-content:space-between;padding:13px 18px;border-top:1px solid rgba(255,255,255,0.06);font-size:0.75rem;color:rgba(255,255,255,0.25)}
        .adm-report-filters{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:20px}
        .adm-report-filter-card{background:#111;border:1px solid rgba(255,255,255,0.07);border-radius:14px;padding:16px}
        .adm-report-filter-card label{font-size:0.72rem;color:rgba(255,255,255,0.35);display:block;margin-bottom:7px;text-transform:uppercase;letter-spacing:1px}
        .adm-export-btns{display:flex;gap:10px;margin-bottom:22px;flex-wrap:wrap}
        .adm-export-btn{display:flex;align-items:center;gap:7px;padding:9px 18px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.6);font-family:'DM Sans',sans-serif;font-size:0.82rem;cursor:pointer;transition:all 0.2s}
        .adm-export-btn:hover{background:rgba(255,255,255,0.08);color:#fff}
        .adm-export-btn.pdf{border-color:rgba(248,113,113,0.3);color:#f87171;background:rgba(248,113,113,0.06)}
        .adm-export-btn.xlsx{border-color:rgba(74,222,128,0.3);color:#4ade80;background:rgba(74,222,128,0.06)}
        @media(max-width:900px){
          .adm-sidebar{width:56px}
          .adm-logo-text,.adm-logo-sub,.adm-nav-group-label,.adm-nav-label,.adm-admin-name,.adm-admin-role,.adm-logout-btn{display:none}
          .adm-logo-sq{margin:0 auto}
          .adm-admin-pill{justify-content:center}
          .adm-metrics{grid-template-columns:repeat(2,1fr)}
          .adm-charts-row{grid-template-columns:1fr}
          .adm-report-filters{grid-template-columns:1fr}
        }
      `}</style>

      <div className="adm-root">
        {/* SIDEBAR */}
        <aside className="adm-sidebar">
          <div className="adm-logo">
            <div className="adm-logo-sq">S</div>
            <div><div className="adm-logo-text">SPORTA</div><div className="adm-logo-sub">Admin Panel</div></div>
          </div>
          <nav className="adm-nav">
            <div className="adm-nav-group-label">Principal</div>
            {[
              { id: 'dashboard', label: 'Dashboard', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.8"/></svg> },
              { id: 'users',    label: 'Usuarios',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.8"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { id: 'products', label: 'Productos', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="1.8"/><path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg> },
              { id: 'sales',    label: 'Ventas',    icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 5h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { id: 'reports',  label: 'Reportes',  icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.8"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.8"/></svg> },
            ].map(({ id, label, icon }) => (
              <button key={id} className={`adm-nav-item ${activePage === id ? 'active' : ''}`} onClick={() => setActivePage(id)}>
                {icon}<span className="adm-nav-label">{label}</span><span className="nav-dot" />
              </button>
            ))}
          </nav>
          <div className="adm-sidebar-footer">
            <div className="adm-admin-pill">
              <div className="adm-admin-av">{user?.name?.[0]?.toUpperCase() || 'A'}</div>
              <div><div className="adm-admin-name">{user?.name || 'Admin'}</div><div className="adm-admin-role">Administrador</div></div>
            </div>
            <button className="adm-logout-btn" onClick={onLogout}>Cerrar sesión</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="adm-main">
          <div className="adm-topbar">
            <div className="adm-topbar-left">
              <h1>{{ dashboard:'Dashboard', users:'Usuarios', products:'Productos', sales:'Ventas', reports:'Reportes' }[activePage]}</h1>
              <p>Panel de administración Sporta</p>
            </div>
            <div style={{ display:'flex', gap:10 }}>
              {activePage === 'users'    && <button className="adm-btn adm-btn-sm" onClick={loadUsers}>↻ Actualizar</button>}
              {activePage === 'products' && <button className="adm-btn adm-btn-sm" onClick={loadProducts}>↻ Actualizar</button>}
              {activePage === 'sales'    && <button className="adm-btn adm-btn-sm" onClick={loadOrders}>↻ Actualizar</button>}
            </div>
          </div>

          <div className="adm-content">

            {/* ══ DASHBOARD ══ */}
            {activePage === 'dashboard' && (
              <>
                <div className="adm-metrics">
                  {statsLoading ? <div style={{gridColumn:'1/-1'}}><Spinner /></div> : <>
                    {[
                      { label: 'Ingresos totales', val: fmt(stats?.totalRevenue), sub: `${stats?.totalOrders || 0} pedidos en total` },
                      { label: 'Pedidos',           val: stats?.totalOrders || 0,  sub: 'Total histórico' },
                      { label: 'Usuarios',          val: stats?.totalUsers || 0,   sub: 'Registrados' },
                      { label: 'Productos',         val: stats?.totalProducts || 0, sub: 'En catálogo' },
                    ].map(m => (
                      <div key={m.label} className="adm-metric">
                        <div className="adm-metric-label">{m.label}</div>
                        <div className="adm-metric-val">{m.val}</div>
                        <div className="adm-metric-sub">{m.sub}</div>
                      </div>
                    ))}
                  </>}
                </div>
                <div className="adm-charts-row">
                  <div className="adm-chart-card">
                    <div className="adm-chart-title">Ingresos últimos 6 meses</div>
                    <div className="adm-chart-sub">Basado en pedidos reales</div>
                    <div style={{ position:'relative', width:'100%', height:220 }}>
                      <canvas ref={salesChartRef} />
                    </div>
                  </div>
                  <div className="adm-chart-card">
                    <div className="adm-chart-title">Productos por categoría</div>
                    <div className="adm-chart-sub">Distribución del catálogo</div>
                    <div className="adm-legend">
                      {[['Running','#FF4500'],['Lifestyle','#3b82f6'],['Basketball','#22c55e']].map(([l,c]) => (
                        <div key={l} className="adm-legend-item"><div className="adm-legend-dot" style={{background:c,borderRadius:'50%'}}></div>{l}</div>
                      ))}
                    </div>
                    <div style={{ position:'relative', width:'100%', height:160 }}>
                      <canvas ref={catChartRef} />
                    </div>
                  </div>
                </div>
                <div className="adm-table-card">
                  <div className="adm-table-head">
                    <div className="adm-table-head-title">Últimos pedidos</div>
                    <button className="adm-btn adm-btn-sm" onClick={() => { setActivePage('sales'); loadOrders() }}>Ver todos →</button>
                  </div>
                  {ordersLoading ? <Spinner /> : (
                    <table className="adm-table">
                      <thead><tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead>
                      <tbody>
                        {orders.slice(0,8).map(o => (
                          <tr key={o.id}>
                            <td style={{fontFamily:'monospace',fontSize:'0.75rem',color:'rgba(255,255,255,0.3)'}}>{o.id}</td>
                            <td>{o.name}</td>
                            <td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>{fmtDate(o.created_at)}</td>
                            <td style={{color:'#FF4500',fontFamily:"'Bebas Neue',sans-serif",fontSize:'1rem'}}>{fmt(o.total)}</td>
                            <td><StatusBadge status={o.status} /></td>
                          </tr>
                        ))}
                        {orders.length === 0 && <EmptyRow cols={5} msg="Aún no hay pedidos" />}
                      </tbody>
                    </table>
                  )}
                </div>
              </>
            )}

            {/* ══ USUARIOS ══ */}
            {activePage === 'users' && (
              <>
                <div className="adm-search-row">
                  <input type="text" placeholder="Buscar por nombre o email..." value={userSearch} onChange={e => setUserSearch(e.target.value)} />
                </div>
                <div className="adm-table-card">
                  <div className="adm-table-head"><div className="adm-table-head-title">{filteredUsers.length} usuarios registrados</div></div>
                  {usersLoading ? <Spinner /> : (
                    <table className="adm-table">
                      <thead><tr><th>Usuario</th><th>Email</th><th>Registro</th><th>Rol</th><th>Estado</th><th>Acciones</th></tr></thead>
                      <tbody>
                        {filteredUsers.length === 0 ? <EmptyRow cols={6} /> : filteredUsers.map(u => (
                          <tr key={u.id}>
                            <td><div style={{display:'flex',alignItems:'center',gap:10}}><Avatar name={u.name} />{u.name}</div></td>
                            <td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>{u.email}</td>
                            <td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>{fmtDate(u.created_at)}</td>
                            <td><span className="adm-badge badge-gray">{u.role || 'user'}</span></td>
                            <td><StatusBadge status={u.blocked ? 'blocked' : 'active'} /></td>
                            <td><div style={{display:'flex',gap:6}}>
                              <button className="adm-btn adm-btn-sm" onClick={() => { setSelectedUser(u); setShowUserModal(true) }}>Ver</button>
                              <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => deleteUser(u.id)}>Eliminar</button>
                            </div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className="adm-pagination"><span>Total: {users.length} usuarios</span></div>
                </div>
              </>
            )}

            {/* ══ PRODUCTOS ══ */}
            {activePage === 'products' && (
              <>
                <div className="adm-search-row">
                  <input type="text" placeholder="Buscar producto..." value={prodSearch} onChange={e => setProdSearch(e.target.value)} />
                  <select value={prodCat} onChange={e => setProdCat(e.target.value)} style={{minWidth:140}}>
                    <option value="">Todas las categorías</option>
                    <option value="running">Running</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="basketball">Basketball</option>
                  </select>
                  <button className="adm-btn adm-btn-primary" onClick={() => openProductModal()}>+ Nuevo producto</button>
                </div>
                <div className="adm-table-card">
                  <div className="adm-table-head"><div className="adm-table-head-title">{filteredProducts.length} productos</div></div>
                  {productsLoading ? <Spinner /> : (
                    <table className="adm-table">
                      <thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Badge</th><th>Acciones</th></tr></thead>
                      <tbody>
                        {filteredProducts.length === 0 ? <EmptyRow cols={6} /> : filteredProducts.map(p => (
                          <tr key={p.id}>
                            <td>{p.name}</td>
                            <td><span className="adm-badge badge-gray">{p.category}</span></td>
                            <td style={{color:'#FF4500',fontFamily:"'Bebas Neue',sans-serif",fontSize:'1rem'}}>{fmt(p.price)}</td>
                            <td style={{color: p.stock === 0 ? '#f87171' : p.stock < 10 ? '#fbbf24' : 'inherit'}}>{p.stock ?? '-'}</td>
                            <td><span className="adm-badge badge-gray">{p.badge || '-'}</span></td>
                            <td><div style={{display:'flex',gap:6}}>
                              <button className="adm-btn adm-btn-sm" onClick={() => openProductModal(p)}>Editar</button>
                              <button className="adm-btn adm-btn-sm adm-btn-danger" onClick={() => deleteProduct(p.id)}>Eliminar</button>
                            </div></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className="adm-pagination"><span>Total: {products.length} productos</span></div>
                </div>
              </>
            )}

            {/* ══ VENTAS ══ */}
            {activePage === 'sales' && (
              <>
                <div className="adm-tabs">
                  {[['all','Todos'],['pending','Pendientes'],['paid','Pagados'],['shipped','Enviados']].map(([id,label]) => (
                    <button key={id} className={`adm-tab ${salesTab===id?'active':''}`} onClick={() => setSalesTab(id)}>{label}</button>
                  ))}
                </div>
                <div className="adm-search-row">
                  <input type="text" placeholder="Buscar por cliente o ID..." value={salesSearch} onChange={e => setSalesSearch(e.target.value)} />
                </div>
                <div className="adm-table-card">
                  <div className="adm-table-head"><div className="adm-table-head-title">{filteredOrders.length} pedidos</div></div>
                  {ordersLoading ? <Spinner /> : (
                    <table className="adm-table">
                      <thead><tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Pago</th><th>Estado</th><th>Acciones</th></tr></thead>
                      <tbody>
                        {filteredOrders.length === 0 ? <EmptyRow cols={7} /> : filteredOrders.map(o => (
                          <tr key={o.id}>
                            <td style={{fontFamily:'monospace',fontSize:'0.75rem',color:'rgba(255,255,255,0.4)'}}>{o.id}</td>
                            <td>{o.name}</td>
                            <td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>{fmtDate(o.created_at)}</td>
                            <td style={{color:'#FF4500',fontFamily:"'Bebas Neue',sans-serif",fontSize:'1rem'}}>{fmt(o.total)}</td>
                            <td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.75rem'}}>{o.payment_method}</td>
                            <td><StatusBadge status={o.status} /></td>
                            <td><button className="adm-btn adm-btn-sm" onClick={() => { setSelectedOrder(o); setShowOrderModal(true) }}>Ver</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <div className="adm-pagination">
                    <span>Total: {filteredOrders.length} pedidos · {fmt(filteredOrders.reduce((a,o) => a + (o.total||0), 0))}</span>
                  </div>
                </div>
              </>
            )}

            {/* ══ REPORTES ══ */}
            {activePage === 'reports' && (
              <>
                <div className="adm-report-filters">
                  <div className="adm-report-filter-card"><label>Fecha inicio</label><input type="date" value={reportFrom} onChange={e => setReportFrom(e.target.value)} className="adm-form-input" /></div>
                  <div className="adm-report-filter-card"><label>Fecha fin</label><input type="date" value={reportTo} onChange={e => setReportTo(e.target.value)} className="adm-form-input" /></div>
                  <div className="adm-report-filter-card"><label>Tipo</label>
                    <select value={reportType} onChange={e => setReportType(e.target.value)} className="adm-form-input">
                      <option value="sales">Ventas</option>
                      <option value="users">Usuarios</option>
                      <option value="products">Productos</option>
                    </select>
                  </div>
                </div>
                <div className="adm-export-btns">
                  <button className="adm-export-btn pdf" onClick={() => generateReport('pdf')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="1.8"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.8"/></svg>
                    Exportar TXT
                  </button>
                  <button className="adm-export-btn xlsx" onClick={() => generateReport('excel')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" strokeWidth="1.8"/><line x1="3" y1="15" x2="21" y2="15" stroke="currentColor" strokeWidth="1.8"/><line x1="9" y1="9" x2="9" y2="21" stroke="currentColor" strokeWidth="1.8"/></svg>
                    Exportar CSV
                  </button>
                </div>
                <div className="adm-table-card">
                  <div className="adm-table-head"><div className="adm-table-head-title">Vista previa — {reportType === 'sales' ? 'Ventas' : reportType === 'users' ? 'Usuarios' : 'Productos'}</div></div>
                  <table className="adm-table">
                    {reportType === 'sales' && (<><thead><tr><th>#</th><th>Cliente</th><th>Fecha</th><th>Total</th><th>Estado</th></tr></thead><tbody>{orders.filter(o => { const d = new Date(o.created_at); return d >= new Date(reportFrom) && d <= new Date(reportTo) }).slice(0,20).map(o => <tr key={o.id}><td style={{fontFamily:'monospace',fontSize:'0.75rem'}}>{o.id}</td><td>{o.name}</td><td style={{color:'rgba(255,255,255,0.3)'}}>{fmtDate(o.created_at)}</td><td>{fmt(o.total)}</td><td><StatusBadge status={o.status}/></td></tr>)}<EmptyRow cols={5} msg="Sin pedidos en ese rango" /></tbody></>)}
                    {reportType === 'users' && (<><thead><tr><th>Nombre</th><th>Email</th><th>Registro</th><th>Rol</th><th>Estado</th></tr></thead><tbody>{users.map(u => <tr key={u.id}><td>{u.name}</td><td style={{color:'rgba(255,255,255,0.3)',fontSize:'0.78rem'}}>{u.email}</td><td style={{color:'rgba(255,255,255,0.3)'}}>{fmtDate(u.created_at)}</td><td>{u.role}</td><td><StatusBadge status={u.blocked?'blocked':'active'}/></td></tr>)}</tbody></>)}
                    {reportType === 'products' && (<><thead><tr><th>Producto</th><th>Categoría</th><th>Precio</th><th>Stock</th></tr></thead><tbody>{products.map(p => <tr key={p.id}><td>{p.name}</td><td>{p.category}</td><td>{fmt(p.price)}</td><td>{p.stock}</td></tr>)}</tbody></>)}
                  </table>
                </div>
              </>
            )}

          </div>
        </main>
      </div>

      {/* MODAL PRODUCTO */}
      {showProductModal && (
        <div className="adm-modal-overlay" onClick={e => e.target.className === 'adm-modal-overlay' && setShowProductModal(false)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <div className="adm-modal-title">{editingProduct ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}</div>
              <button className="adm-btn adm-btn-sm" onClick={() => setShowProductModal(false)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Nombre *</label><input className="adm-form-input" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} placeholder="Air Sprint Pro" /></div>
                <div className="adm-form-group"><label className="adm-form-label">Precio (S/) *</label><input className="adm-form-input" type="number" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} placeholder="0.00" /></div>
              </div>
              <div className="adm-form-row">
                <div className="adm-form-group"><label className="adm-form-label">Categoría</label>
                  <select className="adm-form-input" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})}>
                    <option value="running">Running</option><option value="lifestyle">Lifestyle</option><option value="basketball">Basketball</option>
                  </select>
                </div>
                <div className="adm-form-group"><label className="adm-form-label">Stock</label><input className="adm-form-input" type="number" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} placeholder="0" /></div>
              </div>
              <div className="adm-form-group"><label className="adm-form-label">Badge</label><input className="adm-form-input" value={productForm.badge} onChange={e => setProductForm({...productForm, badge: e.target.value})} placeholder="Nuevo / Popular / Boost" /></div>
              
              {/* Campo de imagen */}
              <div className="adm-form-group">
                <label className="adm-form-label">Imagen del producto (opcional)</label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="adm-form-input"
                  style={{padding: '0.5rem'}}
                />
                {imagePreview && (
                  <div style={{marginTop: '0.75rem', textAlign: 'center'}}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={{
                        maxWidth: '100%', 
                        maxHeight: '200px', 
                        borderRadius: '10px',
                        border: '1px solid rgba(255,255,255,0.1)'
                      }} 
                    />
                    <button 
                      type="button"
                      className="adm-btn adm-btn-sm"
                      style={{marginTop: '0.5rem'}}
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview(null)
                        setProductForm({...productForm, image: ''})
                      }}
                    >
                      Eliminar imagen
                    </button>
                  </div>
                )}
                <p style={{fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.5rem'}}>
                  Formatos: JPG, PNG, WebP. Tamaño máximo: 5MB
                </p>
              </div>

              <div className="adm-form-group"><label className="adm-form-label">Descripción</label><textarea className="adm-form-input" rows={3} value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} placeholder="Descripción del producto..." style={{resize:'vertical'}} /></div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn" onClick={() => setShowProductModal(false)}>Cancelar</button>
              <button className="adm-btn adm-btn-primary" onClick={saveProduct} disabled={productSaving || uploadingImage}>
                {uploadingImage ? 'Subiendo imagen...' : productSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PEDIDO */}
      {showOrderModal && selectedOrder && (
        <div className="adm-modal-overlay" onClick={e => e.target.className === 'adm-modal-overlay' && setShowOrderModal(false)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <div className="adm-modal-title">PEDIDO #{selectedOrder.id}</div>
              <button className="adm-btn adm-btn-sm" onClick={() => setShowOrderModal(false)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <div className="adm-detail-box">
                {[
                  ['Cliente', selectedOrder.name],
                  ['Email', selectedOrder.email],
                  ['Teléfono', selectedOrder.phone],
                  ['Dirección', `${selectedOrder.address}, ${selectedOrder.district}`],
                  ['Referencia', selectedOrder.reference || '-'],
                  ['Método de pago', selectedOrder.payment_method],
                  ['Subtotal', fmt(selectedOrder.subtotal)],
                  ['Envío', selectedOrder.shipping === 0 ? 'Gratis' : fmt(selectedOrder.shipping)],
                  ['Total', fmt(selectedOrder.total)],
                  ['Fecha', fmtDate(selectedOrder.created_at)],
                ].map(([k,v]) => (
                  <div key={k} className="adm-detail-row"><span className="key">{k}</span><span className="val">{v}</span></div>
                ))}
                <div className="adm-detail-row"><span className="key">Estado</span><span className="val"><StatusBadge status={selectedOrder.status} /></span></div>
              </div>
              {selectedOrder.items?.length > 0 && (
                <div style={{marginTop:14}}>
                  <div style={{fontSize:'0.72rem',color:'rgba(255,255,255,0.3)',textTransform:'uppercase',letterSpacing:1,marginBottom:8}}>Productos</div>
                  {selectedOrder.items.map((item, i) => (
                    <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid rgba(255,255,255,0.04)',fontSize:'0.82rem'}}>
                      <span style={{color:'rgba(255,255,255,0.7)'}}>{item.name} x{item.quantity}</span>
                      <span style={{color:'#FF4500'}}>{fmt(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn" onClick={() => setShowOrderModal(false)}>Cerrar</button>
              {STATUS_NEXT[selectedOrder.status] && (
                <button className="adm-btn adm-btn-primary" onClick={() => advanceOrder(selectedOrder)} disabled={orderUpdating}>
                  {orderUpdating ? 'Actualizando...' : STATUS_LABEL[selectedOrder.status]}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL USUARIO */}
      {showUserModal && selectedUser && (
        <div className="adm-modal-overlay" onClick={e => e.target.className === 'adm-modal-overlay' && setShowUserModal(false)}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <div className="adm-modal-title">DETALLE USUARIO</div>
              <button className="adm-btn adm-btn-sm" onClick={() => setShowUserModal(false)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:18}}>
                <Avatar name={selectedUser.name} size={48} />
                <div>
                  <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:'1.2rem',letterSpacing:1}}>{selectedUser.name}</div>
                  <div style={{fontSize:'0.78rem',color:'rgba(255,255,255,0.35)'}}>{selectedUser.email}</div>
                </div>
              </div>
              <div className="adm-detail-box">
                {[
                  ['Registro', fmtDate(selectedUser.created_at)],
                  ['Rol', selectedUser.role || 'user'],
                ].map(([k,v]) => (
                  <div key={k} className="adm-detail-row"><span className="key">{k}</span><span className="val">{v}</span></div>
                ))}
                <div className="adm-detail-row"><span className="key">Estado</span><span className="val"><StatusBadge status={selectedUser.blocked ? 'blocked' : 'active'} /></span></div>
              </div>
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-danger" onClick={() => toggleUserBlock(selectedUser)}>
                {selectedUser.blocked ? 'Desbloquear' : 'Bloquear'}
              </button>
              <button className="adm-btn" onClick={() => setShowUserModal(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboard
