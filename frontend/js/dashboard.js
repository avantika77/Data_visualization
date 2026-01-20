document.addEventListener("DOMContentLoaded", async () => {
  const email = localStorage.getItem("email");
  const username = localStorage.getItem("username");

  if (!email) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("username").textContent = username;

  const res = await fetch(`/api/student/${email}`);
  const data = await res.json();

  document.querySelector(".cards").innerHTML = `
    <div class="card"><h3>Total Marks</h3><p>${data.Total_Marks}</p></div>
    <div class="card"><h3>Percentage</h3><p>${data.Percentage}%</p></div>
    <div class="card"><h3>CGPA</h3><p>${data.CGPA}</p></div>
    <div class="card"><h3>Activity</h3><p>${data.Co_Curricular_Activity}</p></div>
  `;

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.clear();
    window.location.href = "login.html";
  };
});
