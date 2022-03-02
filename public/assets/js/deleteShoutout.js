async function deleteFormHandler(event) {
    event.preventDefault();
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/shoutout/${id}`, {
        method: 'DELETE',
        body: JSON.stringify({
          shoutout_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/main/');
      } else {
        alert(response.statusText);
      }
    
  }
  
  document.querySelector('.deleteShout').addEventListener('click', deleteFormHandler);