const loginFormHandler = async (event) => {
  event.preventDefault();

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

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
