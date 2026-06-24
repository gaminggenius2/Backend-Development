
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirm = document.getElementById("confirmPassword").value;

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    fetchMethod(
      "http://localhost:3000/api/users/register",
      function (status, data) {
        if (status !== 201 && status !== 200) {
          alert(data.message || "Registration failed");
          return;
        }

        // Store token and user id
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);

        // Minimal change: show success message
        const successMessage = document.createElement("div");
        successMessage.className = "alert alert-success mt-3";
        successMessage.innerText = "Registered successfully! Redirecting to profile...";
        form.appendChild(successMessage);

        // Redirect after 2 seconds
        setTimeout(() => {
          window.location.href = "profile.html";
        }, 2000);
      },
      "POST",
      { username, email, password }
    );
  });
});