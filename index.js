function showMessage(message, isError = false) {
    const boxContainer = document.getElementById('message-box-container');
    const box = document.getElementById('message-box');
    
    box.textContent = message;
    box.style.backgroundColor = isError ? '#dc2626' : '#10b981';
    box.style.color = 'white';
    box.style.padding = '12px 24px';
    box.style.borderRadius = '8px';
    box.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    
    boxContainer.style.display = 'block';
    
    setTimeout(() => {
        boxContainer.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-btn');
    const loginEmail = document.getElementById('login-email');
    const loginPassword = document.getElementById('login-password');
    
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

    document.getElementById('show-signup-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showBox('signup-box');
    });

    document.getElementById('show-login-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        showBox('login-box');
    });

    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            
            const email = loginEmail.value.trim();
            const password = loginPassword.value.trim();

            if (!email || !password) {
                showMessage("Please enter both email and password.", true);
                return;
            }
            
            showMessage("Login successful! Redirecting...", false);
            
            setTimeout(() => {
                window.location.href = 'more.html';
            }, 1000); 
        });
    }

    // UPDATED: Sign Up now redirects to more.html after validation.
    document.getElementById('signup-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Assuming these IDs exist in the login.html sign-up form
        const signupEmail = document.getElementById('signup-email').value.trim();
        const signupPassword = document.getElementById('signup-password').value.trim();
        const signupConfirmPassword = document.getElementById('signup-confirm-password').value.trim();
        
        if (!signupEmail || !signupPassword || signupPassword !== signupConfirmPassword) {
            showMessage("Please fill all fields and ensure passwords match.", true);
            return;
        }
        
        showMessage("Account created! Redirecting...", false);
        
        setTimeout(() => {
            window.location.href = 'more.html';
        }, 1000); 
    });
});