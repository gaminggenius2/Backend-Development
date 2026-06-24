const API = "http://localhost:3000";

// get user from session
const user = JSON.parse(sessionStorage.getItem("currentUser"));

if (user) {
  document.getElementById("welcome").textContent = "Welcome " + user.username;
  document.getElementById("points").textContent = user.points;
} else {
  document.getElementById("welcome").textContent = "Not logged in";
}

// load data
async function loadData() {
  try {
    const usersRes = await fetch(`${API}/user`);
    const users = await usersRes.json();

    const challengesRes = await fetch(`${API}/challenge`);
    const challengeData = await challengesRes.json();

    // stats
    document.getElementById("users").textContent = users.length;
    document.getElementById("challenges").textContent =
      challengeData.count || challengeData.length;

    // leaderboard
    const sorted = users.sort((a, b) => b.points - a.points);
    const list = document.getElementById("leaderboard");

    list.innerHTML = "";

    sorted.forEach(u => {
      const li = document.createElement("li");
      li.textContent = `${u.username} - ${u.points} pts`;
      list.appendChild(li);
    });

  } catch (err) {
    console.log("Error:", err);
  }
}

loadData();