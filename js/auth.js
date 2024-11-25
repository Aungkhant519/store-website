// Store users and sessions in local storage
const USERS_KEY = "users";
const SESSION_KEY = "session";

// Helper functions to interact with localStorage
const getUsers = () => JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const saveUsers = (users) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const getSession = () => JSON.parse(localStorage.getItem(SESSION_KEY));
const setSession = (session) => localStorage.setItem(SESSION_KEY, JSON.stringify(session));
const clearSession = () => localStorage.removeItem(SESSION_KEY);

// Registration Logic
document.getElementById("register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    if (users.some((user) => user.email === email)) {
        alert("Email already registered.");
        return;
    }

    users.push({ name, email, password });
    saveUsers(users);
    alert("Registration successful!");
    window.location.href = "login.html";
});

// Login Logic
document.getElementById("login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const users = getUsers();
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        alert("Invalid email or password.");
        return;
    }

    setSession(user);
    alert("Login successful!");
    window.location.href = "index.html"; // Redirect to the home page
});

// Profile Management Logic
// Populate Profile Data
document.addEventListener("DOMContentLoaded", () => {
    const session = getSession();

    if (!session) {
        alert("You must be logged in to view this page.");
        window.location.href = "login.html"; // Redirect to login if not logged in
        return;
    }

    // Populate profile fields
    document.getElementById("profile-name").value = session.name;
    document.getElementById("profile-email").value = session.email;
    document.getElementById("profile-password").value = session.password;
});

// Update Profile
document.getElementById("update-profile-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("profile-name").value.trim();
    const password = document.getElementById("profile-password").value;

    const users = getUsers();
    const session = getSession();

    // Find the current user and update details
    const userIndex = users.findIndex((u) => u.email === session.email);
    if (userIndex !== -1) {
        users[userIndex] = { ...users[userIndex], name, password };
        saveUsers(users);

        // Update session
        setSession(users[userIndex]);
        alert("Profile updated successfully!");
    }
});

// Delete Account
document.getElementById("delete-account-btn")?.addEventListener("click", () => {
    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
        return;
    }

    const users = getUsers();
    const session = getSession();

    // Remove user from the list
    const updatedUsers = users.filter((u) => u.email !== session.email);
    saveUsers(updatedUsers);

    // Clear session
    clearSession();

    alert("Account deleted successfully!");
    window.location.href = "register.html"; // Redirect to register page
});

// Logout Function
const logout = () => {
    clearSession();
    alert("You have been logged out.");
    window.location.href = "login.html";
};

