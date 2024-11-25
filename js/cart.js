let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart
const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
};

// Render Cart Page
const renderCart = () => {
    const cartTableBody = document.querySelector("#cart-table tbody");
    const cartTotalDisplay = document.getElementById("cart-total");

    if (!cartTableBody || !cartTotalDisplay) return;

    cartTableBody.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <button class="decrease" data-id="${item.id}">-</button>
                ${item.quantity}
                <button class="increase" data-id="${item.id}">+</button>
            </td>
            <td>$${itemTotal}</td>
            <td><button class="remove" data-id="${item.id}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
    });

    cartTotalDisplay.textContent = `Total: $${total}`;
    localStorage.setItem("cart", JSON.stringify(cart));
};

// Event Listeners for Cart Actions
document.addEventListener("click", (e) => {
    const productId = parseInt(e.target.dataset.id, 10);

    if (e.target.classList.contains("increase")) {
        const item = cart.find((item) => item.id === productId);
        if (item) item.quantity++;
        renderCart();
    }

    if (e.target.classList.contains("decrease")) {
        const item = cart.find((item) => item.id === productId);
        if (item && item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter((item) => item.id !== productId);
        }
        renderCart();
    }

    if (e.target.classList.contains("remove")) {
        cart = cart.filter((item) => item.id !== productId);
        renderCart();
    }
});

// Initialize Cart Page
if (document.body.contains(document.querySelector("#cart-table"))) {
    renderCart();
}
