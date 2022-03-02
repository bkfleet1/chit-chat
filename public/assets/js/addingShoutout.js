async function newFormHandler(event) {
    event.preventDefault();
  
    const shoutInput = document.querySelector('input[name="shoutInput"]').value;
  
    const response = await fetch(`/api/shouts`, {
      method: 'POST',
      body: JSON.stringify({
        shoutInput
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/main');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.newShout').addEventListener('submit', newFormHandler);