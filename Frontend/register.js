document.getElementById('registerBtn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  fetch('/register', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({username,email,password})
  })
  .then(res => res.json())
  .then(data => {
    if(data.success){
      alert('Registered!');
      window.location.href = 'login.html';
    } else {
      alert(data.message);
    }
  });
});