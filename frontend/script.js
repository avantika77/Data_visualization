// frontend/script.js
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (data.success) {
      alert("✅ Login successful!");
      // Store user name in localStorage for dashboard display
      localStorage.setItem("username", data.name);
      window.location.href = "dashboard.html"
    } else {
      alert("❌ Invalid email or password!");
    }
  } catch (err) {
    console.error(err);
    alert("⚠️ Server error");
  }
});
