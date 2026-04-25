import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { initDb } from './db.js'
import authRoutes from './routes/auth.js'
import googleAuthRoutes from './routes/googleAuth.js'
import productRoutes from './routes/products.js'
import orderRoutes from './routes/orders.js'
import contactRoutes from './routes/contact.js'
import cartRoutes from './routes/cart.js'
import adminRoutes from './routes/admin.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())

app.use('/api/auth',     authRoutes)
app.use('/api/auth',     googleAuthRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders',   orderRoutes)
app.use('/api/contact',  contactRoutes)
app.use('/api/cart',     cartRoutes)
app.use('/api/admin',    adminRoutes)

app.get('/api/health', (_, res) => res.json({ status: 'ok', app: 'Sporta API' }))

app.use((_, res) => res.status(404).json({ error: 'Ruta no encontrada' }))
app.use((err, _req, res, _next) => {
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Sporta API corriendo en http://localhost:${PORT}`)
  })
}).catch(err => {
  console.error(' Error al conectar con Supabase:', err.message)
  process.exit(1)
})
