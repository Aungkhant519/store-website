document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    const adminUsername = "admin";
    const adminPassword = "admin123"; // Change this to a secure password in a real app

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === adminUsername && password === adminPassword) {
            localStorage.setItem("isAdmin", "true");
            window.location.href = "admin-dashboard.html"; // Redirect to dashboard
        } else {
            alert("Invalid credentials. Please try again.");
        }
    });
});
