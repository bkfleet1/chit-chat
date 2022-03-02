async function editFormHandler(event) {
  event.preventDefault();
  const shoutInput = document.querySelector('input[name="shoutInp"]').value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/shoutout/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      shoutInput,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/main/");
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".editShout")
  .addEventListener("submit", editFormHandler);
