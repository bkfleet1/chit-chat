const loginFormHandler = async (event) => {
  event.preventDefault();

<<<<<<< HEAD
  const userEmail = document.querySelector("#userEmail").value.trim();
  const userPassword = document.querySelector("#userPassword").value.trim();

  if (userEmail && userPassword) {
    const response = await fetch("/", {
      method: "POST",
      body: JSON.stringify({ userEmail, userPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Chit Chat cannot authenticate your credentials.");
    }
  }
};
=======
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
>>>>>>> 769fb6af7770ac8c67fb101d166511539d7e2aab

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
