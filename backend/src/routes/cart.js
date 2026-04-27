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
<<<<<<< HEAD
    id: item.id, // ID del item del carrito (no del producto)
    productId: item.products.id,
=======
    id: item.products.id,
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
    name: item.products.name,
    price: item.products.price,
    image: item.products.image,
    badge: item.products.badge,
    quantity: item.quantity,
<<<<<<< HEAD
    selectedSize: item.selected_size,
    selectedColor: item.selected_color,
=======
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
  }))

  res.json({ cart })
})

// POST /api/cart  — agrega o incrementa
router.post('/', authenticate, async (req, res) => {
<<<<<<< HEAD
  const { product_id, quantity = 1, selected_size, selected_color } = req.body
  if (!product_id) return res.status(400).json({ error: 'product_id requerido' })

  // Buscar item existente con mismo producto, talla y color
  let query = supabase
=======
  const { product_id, quantity = 1 } = req.body
  if (!product_id) return res.status(400).json({ error: 'product_id requerido' })

  const { data: existing } = await supabase
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
    .from('cart_items')
    .select('id, quantity')
    .eq('user_id', req.user.id)
    .eq('product_id', product_id)
<<<<<<< HEAD

  // Filtrar por talla y color si se proporcionan
  if (selected_size) query = query.eq('selected_size', selected_size)
  else query = query.is('selected_size', null)
  
  if (selected_color) query = query.eq('selected_color', selected_color)
  else query = query.is('selected_color', null)

  const { data: existing } = await query.single()

  if (existing) {
    // Incrementar cantidad del item existente
=======
    .single()

  if (existing) {
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
    const { error } = await supabase
      .from('cart_items')
      .update({ quantity: existing.quantity + quantity, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) return res.status(500).json({ error: error.message })
  } else {
<<<<<<< HEAD
    // Crear nuevo item en el carrito
    const { error } = await supabase
      .from('cart_items')
      .insert({ 
        user_id: req.user.id, 
        product_id, 
        quantity,
        selected_size: selected_size || null,
        selected_color: selected_color || null
      })
=======
    const { error } = await supabase
      .from('cart_items')
      .insert({ user_id: req.user.id, product_id, quantity })
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
    if (error) return res.status(500).json({ error: error.message })
  }

  res.json({ ok: true })
})

<<<<<<< HEAD
// PATCH /api/cart/:id  — actualiza cantidad (usa ID del cart_item, no del producto)
router.patch('/:id', authenticate, async (req, res) => {
=======
// PATCH /api/cart/:product_id  — actualiza cantidad
router.patch('/:product_id', authenticate, async (req, res) => {
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854
  const { quantity } = req.body
  if (!quantity || quantity < 1) return res.status(400).json({ error: 'Cantidad inválida' })

  const { error } = await supabase
    .from('cart_items')
    .update({ quantity, updated_at: new Date().toISOString() })
<<<<<<< HEAD
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
=======
    .eq('user_id', req.user.id)
    .eq('product_id', req.params.product_id)
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854

  if (error) return res.status(500).json({ error: error.message })
  res.json({ ok: true })
})

<<<<<<< HEAD
// DELETE /api/cart/:id (usa ID del cart_item, no del producto)
router.delete('/:id', authenticate, async (req, res) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', req.params.id)
    .eq('user_id', req.user.id)
=======
// DELETE /api/cart/:product_id
router.delete('/:product_id', authenticate, async (req, res) => {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('user_id', req.user.id)
    .eq('product_id', req.params.product_id)
>>>>>>> 76feaa60a71c06070f6ffd02c7f53294d15ad854

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
