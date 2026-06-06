# PantryToPlate — Deployment Guide
## From zero to live in ~15 minutes

---

## What you have
```
pantry-to-plate-app/
├── api/
│   └── recipes.js        ← Serverless backend (calls Claude API securely)
├── src/
│   ├── main.jsx          ← React entry point
│   └── App.jsx           ← Full app UI
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## Step 1 — Get your Claude API key
1. Go to **console.anthropic.com**
2. Click **API Keys** → **Create Key**
3. Copy the key (starts with `sk-ant-...`) — save it somewhere safe

---

## Step 2 — Deploy to Vercel (free)

### Option A: Deploy via GitHub (recommended)
1. Create a free account at **github.com**
2. Create a new repository called `pantry-to-plate`
3. Upload all files in this folder to the repo
4. Create a free account at **vercel.com**
5. Click **Add New Project** → Import your GitHub repo
6. Vercel auto-detects Vite — click **Deploy**
7. Go to **Settings → Environment Variables**
8. Add: `ANTHROPIC_API_KEY` = your key from Step 1
9. Go to **Deployments** → click **Redeploy**
10. Your app is live at `https://pantry-to-plate-xxxx.vercel.app` 🎉

### Option B: Deploy via Vercel CLI
```bash
npm install -g vercel
cd pantry-to-plate-app
npm install
vercel
# Follow the prompts, then:
vercel env add ANTHROPIC_API_KEY
# Paste your API key when prompted
vercel --prod
```

---

## Step 3 — Test it
1. Open your Vercel URL on your phone
2. Tap the photo zone → pick your fridge photo
3. Tap **Scan Ingredients** → it reads your fridge!
4. Tap **Find Recipes** → real AI recipes appear ✓

---

## Step 4 — Add to iPhone home screen (PWA)
1. Open your Vercel URL in Safari
2. Tap the Share button (box with arrow)
3. Tap **Add to Home Screen**
4. It now looks and feels like a native app

---

## Step 5 — Monetization (when ready)
Replace the Pro tab's alert() with real billing:

### Stripe (web subscriptions)
```bash
npm install @stripe/stripe-js
```
- Create products at **dashboard.stripe.com**
- Add `STRIPE_PUBLIC_KEY` to Vercel env vars
- Add `api/create-checkout.js` for subscription sessions

### RevenueCat (if you wrap in React Native)
- Best option for App Store / Play Store in-app purchases
- Free up to $2.5k monthly revenue

---

## Estimated Revenue
- 1,000 subscribers × $3.99/mo = **$3,990/mo**
- App Store take: 30% (15% after year 1)
- Anthropic API cost: ~$0.01 per recipe generation
- **Net at 1k users: ~$2,800/mo**

---

## Custom Domain (optional, $10-15/yr)
1. Buy a domain at **namecheap.com** (e.g. `pantrytoplate.app`)
2. In Vercel: Settings → Domains → Add Domain
3. Follow DNS instructions — takes ~10 minutes

---

## Support
- Vercel docs: vercel.com/docs
- Anthropic API: docs.anthropic.com
- React/Vite: vitejs.dev
