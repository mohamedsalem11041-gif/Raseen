// Vercel Serverless Function — /api/chat
// Hides ANTHROPIC_API_KEY from the browser

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key on server' });
  }

  const SYSTEM = `أنت مستشار ذكي لمنصة "رصين" — منصة سعودية متخصصة في رصد الاحتراق الوظيفي (Burnout) باستخدام الذكاء الاصطناعي وتحليل البصمة الرقمية للأداء.

دورك: تقديم مشورة متخصصة وعملية حول:
- الاحتراق الوظيفي: أسبابه، أعراضه المبكرة، طرق اكتشافه والتعامل معه
- كيف تحلل رصين "البصمة الرقمية للأداء" دون المساس بخصوصية الموظف
- نصائح عملية للمديرين في التعامل مع الموظفين المرهقين
- أهمية التدخل المبكر وتكاليف تجاهل المشكلة على المؤسسة

أسلوبك: عربي واضح ومهني، دافئ وعملي. اجعل ردودك مركّزة ومفيدة — بين 80 و180 كلمة. اكتب فقرة متدفقة بدون نقاط أو عناوين.`;

  try {
    const { messages } = req.body || {};
    if (!Array.isArray(messages)) {
      return res.status(400).json({ error: 'messages array required' });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: SYSTEM,
        messages,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || 'API error' });
    }

    const reply = data.content?.[0]?.text || '';
    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
