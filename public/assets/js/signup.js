const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = docment.querySelector('').value.trim();
    const email = document.querySelector('').value.trim();
    const password = document.querySelector('').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Can not sign up.')
        }
    }
};

document
.querySelector('')
.addEventListener('submit', signupFormHandler);