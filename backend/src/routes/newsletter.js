import express from 'express'
import { sendNewsletterEmail } from '../services/emailService.js'

const router = express.Router()

// POST /api/newsletter - Suscribirse al newsletter
router.post('/', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'El email es requerido' })
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' })
    }

    console.log('📧 Nueva suscripción al newsletter:', email)

    // Ofertas exclusivas para enviar
    const exclusiveOffers = [
      {
        name: 'Nike Air Max 270 React',
        originalPrice: 450,
        discountPrice: 225,
        discount: 50,
        image: 'https://sporta-tawny.vercel.app/shoe1.jpg',
        category: 'Running'
      },
      {
        name: 'Adidas Ultraboost 21',
        originalPrice: 520,
        discountPrice: 312,
        discount: 40,
        image: 'https://sporta-tawny.vercel.app/shoe2.jpg',
        category: 'Running'
      },
      {
        name: 'Puma RS-X³ Puzzle',
        originalPrice: 380,
        discountPrice: 190,
        discount: 50,
        image: 'https://sporta-tawny.vercel.app/shoe3.jpg',
        category: 'Lifestyle'
      },
      {
        name: 'Jordan Retro High OG',
        originalPrice: 650,
        discountPrice: 455,
        discount: 30,
        image: 'https://sporta-tawny.vercel.app/shoe4.jpg',
        category: 'Basketball'
      }
    ]

    // Enviar email con ofertas
    const result = await sendNewsletterEmail(email, exclusiveOffers)

    if (result.success) {
      console.log('✅ Newsletter enviado exitosamente a:', email)
      return res.json({
        success: true,
        message: '¡Suscripción exitosa! Revisa tu correo para ver las ofertas exclusivas.',
        provider: result.provider
      })
    } else {
      console.error('❌ Error al enviar newsletter:', result.error)
      return res.status(500).json({
        error: 'No se pudo enviar el email',
        details: result.error
      })
    }
  } catch (error) {
    console.error('Error en newsletter:', error)
    res.status(500).json({
      error: 'Error al procesar la suscripción',
      details: error.message
    })
  }
})

export default router
