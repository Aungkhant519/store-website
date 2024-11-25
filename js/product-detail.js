document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get("id"), 10);

    // Find the product by ID
    const product = products.find((item) => item.id === productId);

    const productDetailContainer = document.getElementById("product-detail");

    if (product) {
        // Render product details
        productDetailContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h1>${product.name}</h1>
            <p>${product.description}</p>
            <p><strong>Price:</strong> $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
    } else {
        // Handle invalid product ID
        productDetailContainer.innerHTML = "<p>Product not found.</p>";
    }
});




// Function to render product details
const renderProductDetail = (product) => {
    const productContainer = document.getElementById("product-detail-container");
    productContainer.innerHTML = `
        <div class="product-detail-card">
            <img src="${product.image}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p class="product-price">$${product.price}</p>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
    `;

    // Add event listener for "Add to Cart" button
    const addToCartButtons = document.querySelector(".add-to-cart");
    addToCartButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id, 10);
            addToCart(productId);
        })
    );
};

// Add to Cart functionality
const addToCart = (productId) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = products.find((product) => product.id === productId);

    if (product) {
        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`${product.name} added to cart!`);
    }
};