document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const loginForm = document.getElementById('loginForm');

  if (localStorage.getItem('token')) {
    navigateToDashboard();
    return; // Stop further execution
  }

  if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(signupForm);
      const data = {
        name: formData.get('txt'),
        email: formData.get('email'),
        password: formData.get('pswd'),
        confirmPassword: formData.get('cpswd')
      };

      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.status === 200) {
          showPopup('Signup Successful!, please login');
          setTimeout(() => {
            window.location.href = '/login'; // Redirect to login page after successful signup
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
  }

  if (loginForm) {
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
        console.log(">>>>>>>>>>.",data)
        if (data.token) {
          // Store the token in local storage
          localStorage.setItem('token', data.token);
          localStorage.setItem('refresh_token',data.refresh_token)

          showPopup('Login Successful!');

          // Fetch the dashboard content with the token
          navigateToDashboard();
        } else {
          showPopup('Login Failed. Please check your credentials.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        showPopup('An error occurred. Please try again later.');
      });
    });
  }

  function navigateToDashboard() {
    const token = localStorage.getItem('token');
    console.log('Token in Local Storage:', token);

    // Fetch the /api/dash endpoint with the Authorization header
    fetch('/api/dash', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load dashboard');
      }
      return response.text(); // or response.json() if the response is JSON
    })
    .then(dashboardContent => {
      document.body.innerHTML = dashboardContent;
    })
    .catch(error => {
      console.error('Error loading dashboard:', error);
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
