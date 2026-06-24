const API = "http://localhost:3000";

const list = document.getElementById("challengeList");

document.getElementById("loadChallenges")
  .addEventListener("click", getChallenges);

document.getElementById("createChallenge")
  .addEventListener("click", createChallenge);

function getChallenges() {
  fetch(`${API}/challenges`)
    .then(res => res.json())
    .then(data => {
      list.innerHTML = "";

      data.challenges.forEach(c => {
        const li = document.createElement("li");

        li.innerHTML = `
          ${c.challenge_name} (${c.points})
          <button onclick="deleteChallenge(${c.challenge_id})">Delete</button>
       `;

        list.appendChild(li);
      });
    });
}

function createChallenge() {
  const name = document.getElementById("name").value;
  const points = document.getElementById("points").value;

  fetch(`${API}/challenges`, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      challenge_name: name,
      points: points
    })
  }).then(() => getChallenges());
}

function deleteChallenge(id) {
  fetch(`${API}/challenges/${id}`, {
    method: "DELETE"
  }).then(() => getChallenges());
}