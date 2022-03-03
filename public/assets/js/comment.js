async function commentFormHandler(event) {
  event.preventDefault();

  const commentInput = document
    .querySelector('textarea[name="commentInp"]')
    .value.trim();

  const shoutout_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (commentInput) {
    const response = await fetch("/api/comment", {
      method: "POST",
      body: JSON.stringify({
        shoutout_id,
        commentInput,
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
  .querySelector(".comment-form")
  .addEventListener("submit", commentFormHandler);
