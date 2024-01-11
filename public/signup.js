const loginForm = document.querySelector("form.login");

const signupForm = document.querySelector("form.signup-form");

const loginBtn = document.querySelector("label.login");

const signupBtn = document.querySelector("label.signup");

const signupLink = document.querySelector(".signup-link a");

const loginText = document.querySelector(".title-text .login");

const signupText = document.querySelector(".title-text .signup");

signupBtn.onclick = () => {
  loginForm.style.marginLeft = "-50%";
  loginText.style.marginLeft = "-50%";
};

loginBtn.onclick = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
};

signupLink.onclick = () => {
  signupBtn.click();
};

// Add event listener for the signup form submission
// Add event listener for the signup form submission
signupForm.addEventListener('submit', function(event) {
  event.preventDefault();

  // Create an object with the user's input
  const signupData = {
    name: signupForm.querySelector('input[name="name"]').value,
    gender: signupForm.querySelector('input[name="gender"]').value, // Assuming radio buttons for gender
    email: signupForm.querySelector('input[name="email"]').value,
    password: signupForm.querySelector('input[name="password"]').value,
    confirmPassword: signupForm.querySelector('input[name="confirmPassword"]').value
  };

  fetch('/api/signup', { // Replace '/api/signup' with your actual signup API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(signupData),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if (data.message.includes('successfully')) {
      // Handle successful signup, e.g., redirect or update UI
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Add event listener for the login form submission
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(loginForm);
  const formObject = {};
  formData.forEach((value, key) => formObject[key] = value);

  fetch('/api/login', { // Replace '/api/login' with your actual login API endpoint
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formObject),
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message);
    if(data.message === "login successful") {
      localStorage.setItem('token', data.token); // Store the token
      // Handle successful login, e.g., redirect to a protected page
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});
