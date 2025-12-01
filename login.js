// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged,
    setPersistence,
    browserLocalPersistence,
    signInWithCustomToken,
    signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    collection, 
    serverTimestamp 
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";
import { setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Global variables provided by the environment
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

let app;
let auth;
let db;
let userId = null;

// Utility function for displaying messages
function showMessage(message, isError = false) {
    const messageBox = document.getElementById('message-box');
    messageBox.textContent = message;
    messageBox.style.display = 'block';
    messageBox.style.backgroundColor = isError ? '#ffe0e0' : '#e0ffe0';
    messageBox.style.color = isError ? '#cc0000' : '#006600';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 5000);
}

// Utility function to get inputs
const getInputValue = (id) => document.getElementById(id).value.trim();

// 1. Initialize Firebase and Authentication
async function initializeAppAndAuth() {
    try {
        if (Object.keys(firebaseConfig).length === 0) {
             showMessage("Firebase configuration is missing.", true);
             return;
        }
        
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        
        // Set Firestore logging for debugging
        setLogLevel('Debug');

        // 2. Handle initial authentication (Canvas token or Anonymous)
        if (initialAuthToken) {
            await signInWithCustomToken(auth, initialAuthToken);
            console.log("Signed in with custom token.");
        } else {
            await signInAnonymously(auth);
            console.log("Signed in anonymously.");
        }

        // 3. Set persistence to local storage (keeps user signed in across sessions)
        await setPersistence(auth, browserLocalPersistence);
        
        // 4. Set up Auth State Listener
        onAuthStateChanged(auth, (user) => {
            if (user) {
                userId = user.uid;
                console.log("Auth state changed. Current User ID:", userId);
                // Redirect or update UI if already signed in
                if (!user.isAnonymous) {
                    showMessage(`Logged in as: ${user.email}`, false);
                    // In a real app, you might redirect to the products page here.
                }
            } else {
                userId = null;
                console.log("User is signed out or anonymous.");
            }
        });

    } catch (error) {
        console.error("Firebase Initialization Error:", error);
        showMessage(`Initialization failed: ${error.message}`, true);
    }
}

// 5. Signup Function
async function handleSignup() {
    const email = getInputValue('signup-email');
    const password = getInputValue('signup-password');
    const confirmPassword = getInputValue('signup-confirm-password');

    if (!email || !password || !confirmPassword) {
        showMessage("Please fill in all fields.", true);
        return;
    }
    if (password !== confirmPassword) {
        showMessage("Passwords do not match.", true);
        return;
    }
    if (password.length < 6) {
        showMessage("Password must be at least 6 characters long.", true);
        return;
    }

    try {
        // Firebase creates the new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save basic user data to Firestore (private collection)
        const userDocRef = doc(db, `artifacts/${appId}/users/${user.uid}/user_data`, 'profile');
        await setDoc(userDocRef, {
            email: user.email,
            createdAt: serverTimestamp(),
            preferences: {}
        });

        showMessage("Signup successful! You are now logged in.", false);
        // Optionally clear form
        document.getElementById('signup-email').value = '';
        document.getElementById('signup-password').value = '';
        document.getElementById('signup-confirm-password').value = '';
        // Switch view to Login
        toggleView(true);

    } catch (error) {
        console.error("Signup Error:", error);
        // Firebase error codes are often user-friendly enough
        showMessage(`Signup Failed: ${error.message}`, true);
    }
}

// 6. Login Function
async function handleLogin() {
    const email = getInputValue('login-email');
    const password = getInputValue('login-password');

    if (!email || !password) {
        showMessage("Please enter both email and password.", true);
        return;
    }

    try {
        // Firebase signs in the user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        showMessage(`Login successful! Welcome back, ${userCredential.user.email}.`, false);
        // Optionally clear form
        document.getElementById('login-email').value = '';
        document.getElementById('login-password').value = '';

        // In a real app, you would redirect to the main page here.

    } catch (error) {
        console.error("Login Error:", error);
        showMessage(`Login Failed: ${error.message}`, true);
    }
}

// 7. Toggle between Login and Signup forms
function toggleView(showLogin) {
    const loginBox = document.querySelector('.container .box:first-child');
    const signupBox = document.getElementById('signup-box');

    if (showLogin) {
        loginBox.style.display = 'block';
        signupBox.style.display = 'none';
    } else {
        loginBox.style.display = 'none';
        signupBox.style.display = 'block';
    }
}

// 8. Add Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeAppAndAuth();

    // Login Button
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    
    // Signup Button
    document.getElementById('signup-btn').addEventListener('click', handleSignup);
    
    // Toggle links
    document.getElementById('show-signup-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleView(false);
    });
    
    document.getElementById('show-login-link').addEventListener('click', (e) => {
        e.preventDefault();
        toggleView(true);
    });
});