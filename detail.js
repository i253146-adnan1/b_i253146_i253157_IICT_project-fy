// Wait for the entire HTML document to be loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Image Gallery Interaction ---

    const mainImage = document.querySelector('.main-image img');
    const thumbnailImages = document.querySelectorAll('.thumbnail-images img');

    /**
     * Handles the click event on a thumbnail image to update the main display image.
     * @param {Event} event The click event object.
     */
    function handleThumbnailClick(event) {
        // Get the source (src) and alternative text (alt) of the clicked thumbnail
        const newSrc = event.target.getAttribute('src');
        const newAlt = event.target.getAttribute('alt');

        // Update the main image source and alt text
        mainImage.setAttribute('src', newSrc);
        mainImage.setAttribute('alt', newAlt);

        // Optional: Add a visual effect to show which thumbnail is active (e.g., a border)
        thumbnailImages.forEach(img => img.classList.remove('active-thumb'));
        event.target.classList.add('active-thumb');
    }

    // Attach the click handler to all thumbnail images
    thumbnailImages.forEach(img => {
        img.addEventListener('click', handleThumbnailClick);
    });

    // Initialize the first thumbnail as active for visual consistency
    if (thumbnailImages.length > 0) {
        thumbnailImages[0].classList.add('active-thumb');
    }


    // --- 2. Quantity Controls ---

    const minusBtn = document.querySelector('.control-btn.minus');
    const plusBtn = document.querySelector('.control-btn.plus');
    const quantitySpan = document.querySelector('.quantity');

    /**
     * Updates the quantity displayed and ensures it stays above 1.
     * @param {number} change The amount to change the quantity by (+1 or -1).
     */
    function updateQuantity(change) {
        let currentQuantity = parseInt(quantitySpan.textContent);
        let newQuantity = currentQuantity + change;

        // Ensure the quantity does not drop below 1
        if (newQuantity >= 1) {
            quantitySpan.textContent = newQuantity;
        } else {
            // Optional: Provide feedback if the user tries to go below 1
            console.log("Quantity cannot be less than 1.");
        }
    }

    // Attach click handlers to the plus and minus buttons
    minusBtn.addEventListener('click', () => updateQuantity(-1));
    plusBtn.addEventListener('click', () => updateQuantity(1));


    // --- 3. Wishlist Toggle ---

    const wishlistBox = document.querySelector('.add-to-wishlist-box');
    const wishlistIcon = document.querySelector('.wishlist-icon');

    /**
     * Toggles the wishlist state (added/removed) based on the icon class.
     */
    function toggleWishlist() {
        // Check if the icon is currently the 'regular' (empty) heart
        if (wishlistIcon.classList.contains('fa-regular')) {
            // Change to 'solid' (filled) heart
            wishlistIcon.classList.remove('fa-regular');
            wishlistIcon.classList.add('fa-solid');
            // Optional: Show a confirmation message
            console.log("Product added to wishlist!");
        } else {
            // Change back to 'regular' (empty) heart
            wishlistIcon.classList.remove('fa-solid');
            wishlistIcon.classList.add('fa-regular');
            // Optional: Show a removal message
            console.log("Product removed from wishlist.");
        }
    }

    // Attach the click handler to the entire wishlist box area
    wishlistBox.addEventListener('click', toggleWishlist);

});