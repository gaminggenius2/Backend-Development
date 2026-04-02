document.getElementById('loginBtn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/login', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({email, password})
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      alert('Logged in!');
      window.location.href = 'index.html';
    } else {
      alert('Invalid credentials');
    }
  });
});