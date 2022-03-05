const loginFormHandler = async (event) => {
    event.preventDefault();

    const userEmail = document.querySelector('#userEmail').value.trim();
    const userPassword = document.querySelector('#userPassword').value.trim();

    if (userEmail && userPassword) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({userEmail,userPassword}),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/dashboard/');
          } else {
            alert(response.statusText);
          }
        }
      }

document
.querySelector('.login-form')
.addEventListener('submit', loginFormHandler);
