function updateTime() {
  const now = new Date();

  document.getElementById("date").innerText = now.toDateString();
  document.getElementById("time").innerText = now.toLocaleTimeString();
}

setInterval(updateTime, 1000);
updateTime();

function showCheckIn() {
  document.getElementById("welcomeScreen").classList.add("hidden");
  document.getElementById("checkInScreen").classList.remove("hidden");
}

function goBack() {
  document.getElementById("checkInScreen").classList.add("hidden");
  document.getElementById("welcomeScreen").classList.remove("hidden");
}

function submitCheckIn() {
  const employee = document.getElementById("employeeSelect").value;
  const visitor = document.getElementById("visitorName").value;

  if (!visitor || !employee) {
    alert("Please complete all fields.");
    return;
  }

  const success = document.getElementById("successMessage");

  success.classList.remove("hidden");
  success.innerHTML = `✅ ${employee} has been notified. Please wait near reception.`;
}