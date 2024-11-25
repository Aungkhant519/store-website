document.addEventListener("DOMContentLoaded", () => {
    // Check if admin is logged in
    const isAdmin = localStorage.getItem("isAdmin");

    if (!isAdmin) {
        alert("You must be logged in as an admin to access this page.");
        window.location.href = "admin-login.html"; // Redirect to login if not logged in
    }

    const productForm = document.getElementById("product-form");

    productForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("product-name").value;
        const description = document.getElementById("product-description").value;
        const price = parseFloat(document.getElementById("product-price").value);
        const category = document.getElementById("product-category").value;
        const image = document.getElementById("product-image").value;
        const featured = document.getElementById("product-featured").value.toLowerCase() === 'true';

        // Create new product object
        const newProduct = {
            id: products.length + 1, // Generate a new id based on the current number of products
            name,
            description,
            price,
            category,
            image,
            featured,
        };

        // Add the new product to the products array
        products.push(newProduct);

        // Save the updated products array back to localStorage (if needed)
        localStorage.setItem("products", JSON.stringify(products));

        alert("Product added successfully!");

        // Optionally, reset the form fields
        productForm.reset();
    });

    // Logout function
    document.getElementById("logout-btn").addEventListener("click", () => {
        localStorage.removeItem("isAdmin");
        window.location.href = "admin-login.html"; // Redirect to login page
    });
});
