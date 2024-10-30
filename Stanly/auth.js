// Toggle between login and registration forms
function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

// Register a new user
function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Check if the user already exists
    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    // Store user credentials in local storage
    localStorage.setItem(username, password);
    alert("Registration successful! You can now log in.");
    toggleForms(); // Switch to login form
}

// Login a user
function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // Check stored credentials
    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        // Set the logged-in flag
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "../index.html"; // Redirect to the main page
    } else {
        alert("Incorrect username or password.");
    }
}

