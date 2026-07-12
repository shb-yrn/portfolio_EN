export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  const { name, email, topic, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'فیلدهای ضروری خالی هستند.' });
  }

  // توکن و چت آیدی از Environment Variables خونده می‌شن، نه هاردکد توی کد
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ ok: false, error: 'تنظیمات سرور ناقص است.' });
  }

  const text = `
  topic : ${topic}

  name : ${name}
  email : ${email}

  text : 
    ${message}
  `;

  try {
    const telegramRes = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    const data = await telegramRes.json();

    if (data.ok) {
      return res.status(200).json({ ok: true });
    } else {
      return res.status(502).json({ ok: false, error: 'خطا در ارسال به تلگرام' });
    }
  } catch (err) {
    return res.status(500).json({ ok: false, error: 'خطا در ارتباط با سرور' });
  }
}
