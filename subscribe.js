// api/subscribe.js — Creates a Stripe checkout session
import Stripe from 'stripe'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const { plan } = req.body // 'monthly' or 'annual'

  // Your Vercel app URL — update this after deploy
  const appUrl = process.env.APP_URL || 'https://pantry-to-plate-beryl.vercel.app'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'PantryToPlate Pro',
            description: 'Unlimited AI recipes, photo scanning, meal planning & more',
            images: [],
          },
          unit_amount: plan === 'annual' ? 2999 : 399, // $29.99 or $3.99
          recurring: {
            interval: plan === 'annual' ? 'year' : 'month',
          },
        },
        quantity: 1,
      }],
      success_url: `${appUrl}?pro=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}?cancelled=true`,
      allow_promotion_codes: true,
    })

    res.status(200).json({ url: session.url })
  } catch (err) {
    console.error('Stripe error:', err)
    res.status(500).json({ error: err.message })
  }
}
