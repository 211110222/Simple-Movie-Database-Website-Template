function toggleForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
    registerForm.style.display = registerForm.style.display === 'none' ? 'block' : 'none';
}

function register() {
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists. Please choose a different one.");
        return;
    }

    localStorage.setItem(username, password);
    alert("Registration successful! You can now log in.");
    toggleForms();
}

function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        alert("Please fill in both fields.");
        return;
    }

    const storedPassword = localStorage.getItem(username);
    if (storedPassword === password) {
        localStorage.setItem("loggedInUser", username);
        alert("Login successful!");
        window.location.href = "../index.html";
    } else {
        alert("Incorrect username or password.");
    }
}

