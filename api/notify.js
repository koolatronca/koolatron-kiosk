export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { visitor, employee } = req.body;

  if (!visitor || !employee) {
    return res.status(400).json({ error: "Missing visitor or employee" });
  }

  const teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;

  const message = {
    "@type": "MessageCard",
    "@context": "https://schema.org/extensions",
    "summary": "Visitor Check-In",
    "themeColor": "0078D7",
    "title": "Visitor Alert",
    "sections": [
      {
        "activityTitle": "🚨 Visitor Check-In",
        "facts": [
          {
            "name": "Visitor",
            "value": visitor
          },
          {
            "name": "Here to see",
            "value": employee
          }
        ],
        "text": "Please respond when available."
      }
    ]
  };

  try {
    const response = await fetch(teamsWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });

    if (!response.ok) {
      return res.status(500).json({ error: "Teams rejected the request" });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Server error sending Teams notification" });
  }
}

