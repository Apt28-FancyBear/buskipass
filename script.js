document.addEventListener("DOMContentLoaded", function () {
  // Create a custom prompt for ID and pass type
  const customPrompt = document.createElement("div");
  customPrompt.style.position = "fixed";
  customPrompt.style.top = "50%";
  customPrompt.style.left = "50%";
  customPrompt.style.transform = "translate(-50%, -50%)";
  customPrompt.style.backgroundColor = "#fff";
  customPrompt.style.padding = "20px";
  customPrompt.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
  customPrompt.style.borderRadius = "8px";
  customPrompt.style.zIndex = "1000";
  customPrompt.innerHTML = `
    <label for="id-input">Enter your last 4 digits of ID:</label>
    <input type="text" id="id-input" maxlength="4" placeholder="8595" style="margin-bottom: 10px; width: 100%; padding: 5px;" />
    <p>Select Pass Type:</p>
    <label><input type="radio" name="passType" value="PMC" checked> PMC (Fare: 40)</label><br>
    <label><input type="radio" name="passType" value="PCMC"> PCMC (Fare: 40)</label><br>
    <label><input type="radio" name="passType" value="PMC and PCMC"> PMC and PCMC (Fare: 50)</label><br><br>
    <button id="submit-btn" style="padding: 5px 10px;">Submit</button>
  `;
  document.body.appendChild(customPrompt);

  // Handle the custom prompt submission
  document.getElementById("submit-btn").addEventListener("click", function () {
    let userId = document.getElementById("id-input").value || "8595"; // Default ID if none provided
    const passType = document.querySelector(
      'input[name="passType"]:checked'
    ).value;
    const fare = passType === "PMC and PCMC" ? 50 : 40;

    // Set the ID dynamically
    document.getElementById("id-value").textContent = userId;

    // Set the pass type and fare dynamically
    document.querySelector(".pass-type span").textContent = passType;
    document.querySelector(".pass-fare span").textContent = `₹${fare}`;

    // Remove the custom prompt
    document.body.removeChild(customPrompt);
  });

  // Get the current date and time
  const currentDate = new Date();

  // Get individual parts of the date
  const day = currentDate.getDate().toString().padStart(2, "0");
  const month = currentDate.toLocaleString("en-GB", { month: "short" });
  const year = currentDate.getFullYear().toString().slice(-2);

  const date = `${day} ${month}, ${year}`; // "05 Jan, 25"

  // Format the current time as "HH:mm AM/PM"
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedTime = `${hours % 12 || 12}:${
    minutes < 10 ? "0" + minutes : minutes
  } ${ampm}`;

  // Calculate the time 15 minutes late
  const lateTime = new Date(currentDate.getTime() - 15 * 60000); // 15 minutes earlier
  const lateHours = lateTime.getHours();
  const lateMinutes = lateTime.getMinutes();
  const lateAmpm = lateHours >= 12 ? "PM" : "AM";
  const formattedLateTime = `${lateHours % 12 || 12}:${
    lateMinutes < 10 ? "0" + lateMinutes : lateMinutes
  } ${lateAmpm}`;

  // Set the booking time
  document.getElementById(
    "booking-time"
  ).textContent = `${date} | ${formattedLateTime}`;

  // Set the validity time
  const validityTime = "11:59 PM";
  document.getElementById(
    "validity-time"
  ).textContent = `${date} | ${validityTime}`;

  // Register the Service Worker
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("Service Worker Registered:", reg))
      .catch((err) => console.error("Service Worker Error:", err));
  }

  // Disable right-click on the page
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    alert("Right-click is disabled on this page.");
  });
});

// Hide the address bar on mobile devices
window.addEventListener("load", function () {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);
});
