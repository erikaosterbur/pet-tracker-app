const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#ppassword-login').value.trim();
  
    if (username && password) {
        // Send a POST request to the API endpoint
        const response = await fetch('api/users/login', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: { 'Content-Type': 'application/json' },
        });
  
    if (response.ok) {
      // If successful, redirect the browser to the dashboard page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  };
  
  document
    .querySelector('#login-form')
    .addEventListener('submit', loginFormHandler);