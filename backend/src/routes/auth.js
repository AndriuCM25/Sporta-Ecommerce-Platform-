import { Router } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabase } from '../db.js'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'sporta_secret_2026'

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body
  
  if (!name || !email || !password)
    return res.status(400).json({ error: 'Nombre, email y contraseña son requeridos' })
  if (password.length < 6)
    return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })

  const { data: existing } = await supabase
    .from('users').select('id').eq('email', email).single()
  
  if (existing)
    return res.status(409).json({ error: 'El email ya está registrado' })

  const hash = bcrypt.hashSync(password, 10)
  
  const { data: user, error } = await supabase
    .from('users').insert({ name, email, password: hash }).select().single()

  if (error)
    return res.status(500).json({ error: 'Error al crear el usuario: ' + error.message })
  
  if (!user)
    return res.status(500).json({ error: 'Error al crear el usuario, intentá de nuevo' })

  const token = jwt.sign({ id: user.id, name, email, role: user.role }, JWT_SECRET, { expiresIn: '7d' })
  res.status(201).json({ token, user: { id: user.id, name, email, role: user.role } })
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ error: 'Email y contraseña son requeridos' })

  const { data: user } = await supabase
    .from('users').select('*').eq('email', email).single()

  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Credenciales incorrectas' })

  // Verificar si el usuario está bloqueado
  if (user.blocked)
    return res.status(403).json({ error: 'Tu cuenta ha sido bloqueada. Contacta al administrador.' })

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
})

// GET /api/auth/me
router.get('/me', async (req, res) => {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) return res.status(401).json({ error: 'No autenticado' })
  try {
    const payload = jwt.verify(header.slice(7), JWT_SECRET)
    const { data: user } = await supabase
      .from('users').select('id, name, email, created_at, role').eq('id', payload.id).single()
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json({ user })
  } catch {
    res.status(401).json({ error: 'Token inválido' })
  }
})

export default router
