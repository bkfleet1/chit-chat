const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/");
  } else {
    alert("Can not logout.");
  }
};

<<<<<<< HEAD
document.querySelector('#logout').addEventListener('click', logout);
=======
document.querySelector("#logout").addEventListener("click", logout);
>>>>>>> 769fb6af7770ac8c67fb101d166511539d7e2aab
