// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Price Calculation and Update Functionality ---

    // Define constants for fixed fees
    const DELIVERY_CHARGE = 12.00;
    const TAX_RATE = 0.0; // Currently 0% tax based on HTML
    
    // Select summary elements
    const subTotalSpan = document.querySelector('.price-details p:nth-child(1) span');
    const taxSpan = document.querySelector('.price-details p:nth-child(2) span');
    const deliverySpan = document.querySelector('.price-details p:nth-child(3) span');
    const totalSpan = document.querySelector('.price-details .total span');
    const cartItemsContainer = document.querySelector('.cart-items-container');

    /**
     * Extracts the price from an item's price text (e.g., "$ 32.00").
     * @param {HTMLElement} itemElement The container element for a single cart item.
     * @returns {number} The parsed price as a float.
     */
    function getItemBasePrice(itemElement) {
        // Find the price element within the item
        const priceText = itemElement.querySelector('.item-price').textContent;
        // Strip out dollar sign and trim spaces, then parse as float
        return parseFloat(priceText.replace('$', '').trim());
    }

    /**
     * Recalculates the total summary (Subtotal, Tax, Total) and updates the UI.
     */
    function updatePriceSummary() {
        let currentSubtotal = 0;

        // Get all currently visible cart items
        const allItems = document.querySelectorAll('.cart-item');

        allItems.forEach(item => {
            const quantitySpan = item.querySelector('.quantity');
            const quantity = parseInt(quantitySpan.textContent);
            const basePrice = getItemBasePrice(item);

            currentSubtotal += basePrice * quantity;
        });

        const currentTax = currentSubtotal * TAX_RATE;
        const currentTotal = currentSubtotal + currentTax + DELIVERY_CHARGE;

        // Update the UI elements with the new calculated values
        subTotalSpan.textContent = `$${currentSubtotal.toFixed(2)}`;
        taxSpan.textContent = `$${currentTax.toFixed(2)}`;
        deliverySpan.textContent = `$${DELIVERY_CHARGE.toFixed(2)}`;
        totalSpan.textContent = `$${currentTotal.toFixed(2)}`;
    }


    // --- 1. Cart Item Quantity Controls and Removal ---

    // Get all cart item elements for iteration
    const allCartItems = document.querySelectorAll('.cart-item');

    allCartItems.forEach(item => {
        const minusBtn = item.querySelector('.control-btn.minus');
        const plusBtn = item.querySelector('.control-btn.plus');
        const quantitySpan = item.querySelector('.quantity');
        const removeBtn = item.querySelector('.remove-btn');

        /**
         * Updates the quantity for a specific cart item.
         * @param {number} change The amount to change the quantity by (+1 or -1).
         */
        function updateItemQuantity(change) {
            let currentQuantity = parseInt(quantitySpan.textContent);
            let newQuantity = currentQuantity + change;

            // Ensure the quantity does not drop below 1
            if (newQuantity >= 1) {
                quantitySpan.textContent = newQuantity;
                // Re-calculate prices after a quantity change
                updatePriceSummary();
            } else {
                console.log("Quantity cannot be less than 1. Use the 'remove' button instead.");
            }
        }

        // Attach quantity handlers to the buttons for this specific item
        minusBtn.addEventListener('click', () => updateItemQuantity(-1));
        plusBtn.addEventListener('click', () => updateItemQuantity(1));

        /**
         * Removes the entire cart item from the display.
         */
        removeBtn.addEventListener('click', () => {
            // Get the parent element to remove (the whole .cart-item div)
            const itemToRemove = removeBtn.closest('.cart-item');
            
            if (itemToRemove) {
                // Remove the item from the DOM
                itemToRemove.remove();
                console.log("Item removed from cart.");
                
                // Re-calculate prices after removal
                updatePriceSummary();
            }
        });
    });

    
    // --- Initial Load ---
    
    // Calculate and display the initial price summary when the page loads
    updatePriceSummary();

    // The image gallery and wishlist logic from the previous context is removed
    // as it is not relevant for the shopping cart page HTML provided.

});