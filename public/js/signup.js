const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();
  
    if (username && password) {
    // Send a POST request to the API endpoint
        const response = await fetch('/api/users', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
      }
    };
  
  document
    .querySelector('#sign-up-button')
    .addEventListener('submit', signupFormHandler);
  