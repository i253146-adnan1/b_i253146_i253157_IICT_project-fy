
const cartItemsData = [
    {
        id: 1,
        name: "Trendy Canvas Bag",
        price: 32.00,
        quantity: 1,
        image: "a.png"
    },
    {
        id: 2,
        name: "Cosmetics Bag",
        price: 88.00,
        quantity: 1,
        image: "m.jpg"
    },
    {
        id: 3,
        name: "Embroidered Floral Laptop Sleeve",
        price: 35.00,
        quantity: 1,
        image: "c.jpg"
    }
];

// Delivery and Tax constants
const DELIVERY_CHARGES = 12.00;
const TAX_RATE = 0.00; // 0% as per your design

// --- 2. CART MANAGEMENT STATE ---

let shoppingCart = [...cartItemsData]; // Initialize cart with pre-filled data

// --- 3. UTILITY FUNCTIONS ---

/**
 * Calculates the total cost details of the cart.
 * @returns {object} { subTotal, tax, total }
 */
function calculateCartSummary() {
    let subTotal = shoppingCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    let tax = subTotal * TAX_RATE;
    let total = subTotal + tax + DELIVERY_CHARGES;

    return {
        subTotal: parseFloat(subTotal.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        deliveryCharges: DELIVERY_CHARGES,
        total: parseFloat(total.toFixed(2))
    };
}

/**
 * Updates the price summary section on the Cart Page.
 */
function updatePriceSummary() {
    const summary = calculateCartSummary();
    
    // Find price display elements
    const subTotalElem = document.querySelector('.price-details p:nth-child(1) span');
    const taxElem = document.querySelector('.price-details p:nth-child(2) span');
    const deliveryElem = document.querySelector('.price-details p:nth-child(3) span');
    const totalElem = document.querySelector('.price-details .total span');

    if (subTotalElem) subTotalElem.textContent = `$${summary.subTotal}`;
    if (taxElem) taxElem.textContent = `$${summary.tax}`;
    if (deliveryElem) deliveryElem.textContent = `$${summary.deliveryCharges}`;
    if (totalElem) totalElem.textContent = `$${summary.total}`;
}

// --- 4. CART UI RENDERING ---

/**
 * Renders the entire list of cart items based on the 'shoppingCart' array.
 */
function renderCartItems() {
    const container = document.querySelector('.cart-items-container');
    if (!container) return; // Exit if not on the cart page

    // Clear existing items but keep the title
    const cartTitle = container.querySelector('.cart-title');
    container.innerHTML = '';
    if (cartTitle) container.appendChild(cartTitle);

    if (shoppingCart.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = "Your cart is currently empty.";
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.marginTop = '20px';
        container.appendChild(emptyMessage);
    }

    shoppingCart.forEach(item => {
        const itemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <a href="#" class="item-link item-left">
                    <img src="${item.image}" alt="${item.name}" class="item-image">
                </a>
                <div class="item-right">
                    <a href="#" class="item-link"><p class="item-name">${item.name}</p></a>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                    <div class="quantity-controls">
                        <button class="control-btn minus" data-id="${item.id}" title="Decrease quantity">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="control-btn plus" data-id="${item.id}" title="Increase quantity">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}" title="Remove item">remove</button>
                </div>
            </div>
        `;
        // Append the new item structure (after the title)
        container.insertAdjacentHTML('beforeend', itemHTML);
    });

    // Re-attach event listeners after rendering
    attachCartListeners();
    updatePriceSummary();
}


// --- 5. EVENT HANDLERS ---

/**
 * Handles clicks on quantity controls (+/-) and remove button.
 * @param {Event} event 
 */
function handleCartAction(event) {
    const target = event.target;
    const id = parseInt(target.getAttribute('data-id'));

    if (target.classList.contains('plus')) {
        updateQuantity(id, 1);
    } else if (target.classList.contains('minus')) {
        updateQuantity(id, -1);
    } else if (target.classList.contains('remove-btn')) {
        removeItem(id);
    }
}

/**
 * Updates the quantity of a specific item in the cart.
 * @param {number} id - The ID of the item.
 * @param {number} change - The amount to change (1 or -1).
 */
function updateQuantity(id, change) {
    const itemIndex = shoppingCart.findIndex(item => item.id === id);

    if (itemIndex > -1) {
        let newQuantity = shoppingCart[itemIndex].quantity + change;
        
        if (newQuantity < 1) {
            // If quantity drops below 1, remove the item
            removeItem(id);
        } else {
            shoppingCart[itemIndex].quantity = newQuantity;
            // Update UI for the specific item only
            const quantitySpan = document.querySelector(`.cart-item[data-id="${id}"] .quantity`);
            if (quantitySpan) {
                quantitySpan.textContent = newQuantity;
            }
            updatePriceSummary();
        }
    }
}

/**
 * Removes an item completely from the cart.
 * @param {number} id - The ID of the item to remove.
 */
function removeItem(id) {
    shoppingCart = shoppingCart.filter(item => item.id !== id);
    renderCartItems(); // Re-render the whole list to reflect the change
    alert(`Item removed from cart! (ID: ${id})`);
}

/**
 * Attaches event listeners to the cart action buttons (+, -, remove).
 */
function attachCartListeners() {
    const cartControls = document.querySelectorAll('.quantity-controls .control-btn, .remove-btn');
    cartControls.forEach(btn => {
        // Remove existing listener to prevent duplicates
        btn.removeEventListener('click', handleCartAction);
        // Add new listener
        btn.addEventListener('click', handleCartAction);
    });

    // Add checkout button handler (Simulated)
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            alert("Proceeding to Checkout! Total: $" + calculateCartSummary().total);
            // In a real app, this would redirect to checkout page
        });
    }

    // Add continue shopping handler (Simulated)
    const continueBtn = document.querySelector('.continue-shopping-btn');
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            alert("Redirecting to Home/Products Page.");
            // In a real app, this would redirect to the products page (image_bd591c.jpg's layout)
        });
    }
}


// --- 6. INITIALIZATION ---

/**
 * Initializes the script when the DOM is fully loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the Cart Page (based on the presence of the cart container)
    if (document.querySelector('.cart-items-container')) {
        renderCartItems();
    }
    
    // Additional Global functionality (e.g., search bar)
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert(`Searching for: ${searchInput.value}`);
                // In a real app, this would trigger a search query.
            }
        });
    }
    
    // Add logic to handle adding items from Product Detail or Product Grid pages (simulated)
    const addToCartBtn = document.getElementById('add-to-cart'); // Assuming a button on the detail page has this ID
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            alert('Item added to cart!');
            // Add real logic to push a new item object to shoppingCart array
        });
    }
});