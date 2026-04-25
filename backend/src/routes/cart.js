import { Router } from 'express'
import { supabase } from '../db.js'
import { authenticate } from '../middleware/auth.js'

const router = Router()

// GET /api/cart
router.get('/', authenticate, async (req, res) => {
  const { data, error } = await supabase
    .from('cart_items')
    .select('*, products(*)')
    .eq('user_id', req.user.id)

  if (error) return res.status(500).json({ error: error.message })

  const cart = data.map(item => ({
    id: item.products.id,
    name: item.products.name,
    price: item.products.price,
    image: item.products.image,
    badge: item.products.badge,
    quantity: item.quantity,
  }))

  res.json({ cart })
})

// POST /api/cart  — agrega o incrementa
router.post('/', authenticate, async (req, res) => {
  const { product_id, quantity = 1 } = req.body
  if (!product_id) return res.status(400).json({ error: 'product_id requerido' })

  const { data: existing } = await supabase
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', req.user.id)
    .eq('product_id', product_id)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) return res.status(500).json({ error: error.message })
  } else {
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: req.user.id, product_id, quantity })
    if (error) return res.status(500).json({ error: error.message })
  }

  res.json({ ok: true })
})

// PATCH /api/cart/:product_id  — actualiza cantidad
router.patch('/:product_id', authenticate, async (req, res) => {
  const { quantity } = req.body
  if (!quantity || quantity < 1) return res.status(400).json({ error: 'Cantidad inválida' })

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
    .eq('user_id', req.user.id)
    .eq('product_id', req.params.product_id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true })
})

// DELETE /api/cart/:product_id
router.delete('/:product_id', authenticate, async (req, res) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', req.user.id)
    .eq('product_id', req.params.product_id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true })
})

// DELETE /api/cart  — vaciar carrito
router.delete('/', authenticate, async (req, res) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', req.user.id)

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true })
})

export default router
