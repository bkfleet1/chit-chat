async function newFormHandler(event) {
  event.preventDefault();

  const shoutInput = document.querySelector('input[name="shoutInput"]').value;

  const response = await fetch(`/api/shoutout`, {
    method: "POST",
    body: JSON.stringify({
      shoutInput,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
}

document.querySelector(".addingShout-form").addEventListener("submit", newFormHandler);