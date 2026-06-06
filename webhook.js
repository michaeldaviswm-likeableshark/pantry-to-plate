// api/webhook.js — Handles Stripe webhook events
import Stripe from 'stripe'

export const config = { api: { bodyParser: false } }

async function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks)))
    req.on('error', reject)
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') { res.status(405).end(); return }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
  const sig = req.headers['stripe-signature']
  const rawBody = await getRawBody(req)

  let event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err) {
    console.error('Webhook signature failed:', err.message)
    res.status(400).send(`Webhook Error: ${err.message}`)
    return
  }

  // Handle subscription events
  switch (event.type) {
    case 'checkout.session.completed':
      console.log('New subscriber:', event.data.object.customer_email)
      // In production: save to database, send welcome email
      break
    case 'customer.subscription.deleted':
      console.log('Subscription cancelled:', event.data.object.customer)
      // In production: revoke pro access
      break
  }

  res.status(200).json({ received: true })
}
