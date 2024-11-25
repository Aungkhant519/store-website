document.addEventListener("DOMContentLoaded", () => {
    const ITEMS_PER_PAGE = 6; // Number of products per page
    let currentPage = 1;
    let filteredProducts = [...products]; // Start with all products

    // DOM Elements
    const productListContainer = document.getElementById("product-list");
    const categoryFilter = document.getElementById("category-filter");
    const sortFilter = document.getElementById("sort-filter");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageInfo = document.getElementById("page-info");
    const featuredListContainer = document.getElementById("featured-list");

    // Utility Functions
    const paginateProducts = (products, page) => {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;
        return products.slice(start, end);
    };

    const updatePagination = (products, page) => {
        const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
        pageInfo.textContent = `Page ${page} of ${totalPages}`;
        prevPageBtn.disabled = page === 1;
        nextPageBtn.disabled = page === totalPages;
    };

    const filterProducts = (category) => {
        if (category === "all") return products;
        return products.filter((product) => product.category === category);
    };

    const sortProducts = (products, sortOrder) => {
        if (sortOrder === "low-high") return [...products].sort((a, b) => a.price - b.price);
        if (sortOrder === "high-low") return [...products].sort((a, b) => b.price - a.price);
        return products; // Default order
    };

    // Render Functions
    // Inside the renderProducts function (or similar function to render products)
const renderProducts = (container, products) => {
    container.innerHTML = "";
    if (products.length === 0) {
        container.innerHTML = "<p>No products found.</p>";
        return;
    }
    products.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <a href="product-detail.html?id=${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
            </a>
            <p>$${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        container.appendChild(productCard);
    });

    // Attach "Add to Cart" event listeners
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) =>
        button.addEventListener("click", (e) => {
            const productId = parseInt(e.target.dataset.id, 10);
            addToCart(productId);
        })
    );
};


    const renderFeaturedProducts = (container, products) => {
        if (!container) return;
        const featuredProducts = products.filter((product) => product.featured);
        container.innerHTML = "";
        if (featuredProducts.length === 0) {
            container.innerHTML = "<p>No featured products available.</p>";
            return;
        }
        featuredProducts.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "featured-card";
            productCard.innerHTML = `
                <a href="product-detail.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                </a>
                <p>$${product.price}</p>
            `;
            container.appendChild(productCard);
        });
    };

    // Cart Functions
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

    // Refresh Functions
    const refreshProducts = () => {
        const sortedProducts = sortProducts(filteredProducts, sortFilter.value);
        const paginatedProducts = paginateProducts(sortedProducts, currentPage);
        renderProducts(productListContainer, paginatedProducts);
        updatePagination(sortedProducts, currentPage);
    };

    // Event Listeners
    if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
            currentPage = 1; // Reset to the first page
            filteredProducts = filterProducts(e.target.value);
            refreshProducts();
        });
    }

    if (sortFilter) {
        sortFilter.addEventListener("change", () => {
            currentPage = 1; // Reset to the first page
            refreshProducts();
        });
    }

    if (prevPageBtn && nextPageBtn) {
        prevPageBtn.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;
                refreshProducts();
            }
        });

        nextPageBtn.addEventListener("click", () => {
            const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
            if (currentPage < totalPages) {
                currentPage++;
                refreshProducts();
            }
        });
    }

    // Initial Renders
    if (productListContainer) refreshProducts();
    if (featuredListContainer) renderFeaturedProducts(featuredListContainer, products);
});
