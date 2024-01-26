document.addEventListener('DOMContentLoaded', (event) => {
  const signupForm = document.getElementById('signupForm');

  signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(signupForm);
    const data = {
      name: formData.get('txt'),
      email: formData.get('email'),
      password: formData.get('pswd'),
      confirmPassword: formData.get('cpswd')
    };
    console.log(">>>>>>>>>>>>.", data);
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          showPopup('Signup Successful!, please login');
          setTimeout(() => {
            window.location.href = '/api/dash';
          }, 1000);
        } else {
          showPopup('Signup Failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showPopup('An error occurred. Please try again later.');
      });
  });

  function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000); // Remove the popup after 3 seconds (adjust as needed)
  }
});




document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  function navigateToDashboard() {
    window.location.href = '/api/dash'; // You can change this to the correct dashboard path
  }

  if (localStorage.getItem('token')) {
    navigateToDashboard();
    return; // Stop further execution
  }

  loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(loginForm);
    const data = {
      email: formData.get('email'),
      password: formData.get('pswd')
    };

    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log("The data is:", data);
      if (data.token) {
        // Store the token in local storage
        localStorage.setItem('token', data.token);
    
        showPopup('Login Successful!');
        // Redirect to the dashboard URL
        window.location.href = '/api/dash'; // Change this to the correct dashboard path
      } else {
        showPopup('Login Failed. Please check your credentials.');
      }
    })    
    .catch((error) => {
      console.error('Error:', error);
      showPopup('An error occurred. Please try again later.');
    });
  });

  function navigateToDashboard() {
    // Fetch the /api/dash endpoint with the Authorization header
    fetch('/api/dash', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load dashboard');
      }
      return response.text(); // or response.json() if the response is JSON
    })
    .then(dashboardContent => {
      // Here you would handle the dashboard content, e.g., by updating the DOM
      // For example, if dashboardContent is HTML:
      document.body.innerHTML = dashboardContent;
    })
    .catch(error => {
      console.error('Error:', error);
      showPopup('Failed to load dashboard. Please try again later.');
    });
  }

  function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    document.body.appendChild(popup);

    setTimeout(() => {
      popup.remove();
    }, 3000); // Remove the popup after 3 seconds
  }
});