const signupFormHandler = async (event) => {
    event.preventDefault();

    const userFname = document.querySelector('userFname').value.trim();
    const userLname = document.querySelector('userLname').value.trim();
    const streetAddress = document.querySelector('streetAddress').value.trim();
    const city = document.querySelector('city').value.trim();
    const state = document.querySelector('state').value.trim();
    const zipCode = document.querySelector('zipCode').value.trim();
    const userEmail = document.querySelector('userEmail').value.trim();
    const userPassword = document.querySelector('userPassword').value.trim();
    

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ userFname,userLname, userEmail, userPassword, streetAddress, city, state, zipCode}),
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
.querySelector('.signup-form')
.addEventListener('submit', signupFormHandler);