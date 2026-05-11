export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { visitor, employee } = req.body;

  if (!visitor || !employee) {
    return res.status(400).json({ error: "Missing visitor or employee" });
  }

  const teamsWebhookUrl = process.env.TEAMS_WEBHOOK_URL;

  if (!teamsWebhookUrl) {
    return res.status(500).json({ error: "Missing Teams webhook URL" });
  }

  const message = {
    text: `🚨 Visitor Check-In\n\nVisitor: ${visitor}\nHere to see: ${employee}\n\nPlease respond when available.`
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
      return res.status(500).json({ error: "Failed to send Teams notification" });
    }

    return res.status(200).json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Server error sending Teams notification" });
  }
}
