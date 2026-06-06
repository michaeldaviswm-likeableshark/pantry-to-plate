// api/recipes.js — Vercel serverless function
// Securely calls Claude API server-side (API key never exposed to browser)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') { res.status(200).end(); return }
  if (req.method !== 'POST') { res.status(405).json({ error: 'Method not allowed' }); return }

  const { ingredients, preferences, photoBase64, photoMime, scanOnly } = req.body
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    res.status(500).json({ error: 'ANTHROPIC_API_KEY not set in environment variables' })
    return
  }

  const userContent = []
  const prefText = preferences?.length ? `Dietary preferences: ${preferences.join(', ')}.` : ''
  const ingText  = ingredients?.length  ? `I also have: ${ingredients.join(', ')}.` : ''

  if (photoBase64) {
    userContent.push({
      type: 'image',
      source: { type: 'base64', media_type: photoMime || 'image/jpeg', data: photoBase64 }
    })
  }

  if (scanOnly) {
    // Just identify ingredients from the photo
    userContent.push({
      type: 'text',
      text: 'List every food ingredient you can see in this fridge/pantry photo. Return ONLY a JSON array of strings like ["eggs","milk","chicken"]. No explanation, no markdown.'
    })
  } else {
    userContent.push({
      type: 'text',
      text: `${photoBase64 ? 'Identify all ingredients in this photo.' : ''} ${ingText} ${prefText}
Salt, pepper, oil, butter, water are always available.
Give me 3 delicious recipes I can make right now.
Return ONLY this JSON, nothing else:
{"recipes":[{"title":"","cuisine":"","time":"","difficulty":"Easy","description":"","ingredients_have":[],"ingredients_need":[],"steps":[]}]}`
    })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: userContent }]
      })
    })

    const data = await response.json()
    if (data.error) { res.status(500).json({ error: data.error.message }); return }

    const raw = (data.content || []).map(b => b.type === 'text' ? b.text : '').join('').trim()
    const clean = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```\s*$/i, '').trim()

    if (scanOnly) {
      // Parse ingredient array
      let ings
      try { ings = JSON.parse(clean) } catch(e) {
        const m = clean.match(/\[[\s\S]*\]/)
        if (m) ings = JSON.parse(m[0])
        else ings = clean.split('\n').filter(l => l.trim()).map(l => l.replace(/^[-*•]\s*/,'').toLowerCase())
      }
      res.status(200).json({ ingredients: Array.isArray(ings) ? ings : [] })
    } else {
      let parsed
      try { parsed = JSON.parse(clean) } catch(e) {
        const m = clean.match(/\{[\s\S]*\}/)
        if (m) parsed = JSON.parse(m[0])
        else throw new Error('Could not parse recipes JSON')
      }
      const recipes = parsed.recipes || (Array.isArray(parsed) ? parsed : null)
      if (!recipes) throw new Error('No recipes in response')
      res.status(200).json({ recipes })
    }
  } catch (err) {
    console.error('API error:', err)
    res.status(500).json({ error: err.message })
  }
}
