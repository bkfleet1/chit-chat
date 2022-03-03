async function commentFormHandler(event) {
  event.preventDefault();

  const message = document
    .querySelector('textarea[name="comment-body"]')
    .value.trim();

  const shoutout_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  // will need to include add photo / video component
  if (message) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        shoutout_id,
        message,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector('.comment-form')
  .addEventListener("submit", commentFormHandler);
