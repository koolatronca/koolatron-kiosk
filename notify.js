async function submitCheckIn() {
  const employee = document.getElementById("employeeSelect").value;
  const visitor = document.getElementById("visitorName").value;

  if (!visitor || !employee) {
    alert("Please complete all fields.");
    return;
  }

  const success = document.getElementById("successMessage");

  success.classList.remove("hidden");
  success.innerHTML = `Sending notification to ${employee}...`;

  try {
    const response = await fetch("/api/notify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        visitor: visitor,
        employee: employee
      })
    });

    if (!response.ok) {
      throw new Error("Teams notification failed");
    }

    success.innerHTML = `✅ ${employee} has been notified. Please wait near reception.`;

  } catch (error) {
    success.innerHTML = `⚠️ There was a problem notifying ${employee}. Please speak with reception.`;
  }
}