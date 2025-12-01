/**
 * Simple client-side script for the Echothred Login Page.
 * This script handles basic client-side interactivity, including:
 * 1. Toggling between Login and Sign Up views.
 * 2. Handling the click on the Login button, validating inputs, and redirecting to 'more.html'.
 * * NOTE: This is a placeholder for a real application where Firebase authentication would occur.
 */

/**
 * Displays a temporary message box using the existing message-box-container structure.
 * @param {string} message The message content.
 * @param {boolean} isError If true, styles the message as an error.
 */
function showMessage(message, isError = false) {
    const boxContainer = document.getElementById('message-box-container');
    const box = document.getElementById('message-box');
    
    // Set basic styles (relying on the existing HTML classes for positioning)
    box.textContent = message;
    box.style.backgroundColor = isError ? '#dc2626' : '#10b981'; // red or green
    box.style.color = 'white';
    box.style.padding = '12px 24px';
    box.style.borderRadius = '8px';
    box.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    boxContainer.style.display = 'block';
    
    // Hide the message after 3 seconds
    setTimeout(() => {
        boxContainer.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
    // Helper function to toggle between login and signup boxes
    function showBox(targetBoxId) {
        const loginBox = document.getElementById('login-box');
        const signupBox = document.getElementById('signup-box');

        if (targetBoxId === 'signup-box') {
            loginBox.style.display = 'none';
            signupBox.style.display = 'block';
        } else {
            signupBox.style.display = 'none';
            loginBox.style.display = 'block';
        }
    }

    // Attach event listeners for switching views
    document.getElementById('show-signup-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showBox('signup-box');
    });

    document.getElementById('show-login-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showBox('login-box');
    });

    // --- Main Login Logic ---
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default form submission
            
            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();

            if (!email || !password) {
                showMessage("Please enter both email and password.", true);
                return;
            }
            
            // 1. Show Success Message
            showMessage("Login successful! Redirecting...", false);
            
            // 2. Redirect to more.html after a short delay
            setTimeout(() => {
                window.location.href = 'more.html';
            }, 1000); 
        });
    }

    // Placeholder for Sign Up functionality (to handle click event)
    document.getElementById('signup-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        showMessage("Sign Up functionality is pending implementation.", true);
    });
});