document.getElementById("registerForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  const res = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const msg = await res.json();
  alert(msg.message || msg.error);

  if (res.ok) window.location.href = "login.html";
});
