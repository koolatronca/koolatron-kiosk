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
    type: "message",
    attachments: [
      {
        contentType: "application/vnd.microsoft.card.adaptive",
        content: {
          "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
          type: "AdaptiveCard",
          version: "1.4",
          body: [
            {
              type: "TextBlock",
              text: "🚨 Visitor Alert",
              weight: "Bolder",
              size: "ExtraLarge",
              wrap: true
            },
            {
              type: "TextBlock",
              text: `${visitor} is here to see`,
              size: "Large",
              wrap: true,
              spacing: "Medium"
            },
            {
              type: "TextBlock",
              text: employee,
              weight: "Bolder",
              size: "ExtraLarge",
              wrap: true,
              color: "Accent"
            },
            {
              type: "TextBlock",
              text: "Please respond when available.",
              isSubtle: true,
              wrap: true,
              spacing: "Medium"
            }
          ]
        }
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
