// ===============================
// Main App JavaScript
// ===============================

// DOM Elements
const navMenu = document.getElementById('navMenu');
const hamburger = document.getElementById('hamburger');
const authModal = document.getElementById('authModal');
const authContainer = document.getElementById('authContainer');
const alertMessage = document.getElementById('alertMessage');
const loadingSpinner = document.getElementById('loadingSpinner');

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    checkAuth();
});

// Setup event listeners
function setupEventListeners() {
    // Hamburger menu
    hamburger?.addEventListener('click', toggleMobileMenu);

    // Close modal when clicking outside
    authModal?.addEventListener('click', (e) => {
        if (e.target === authModal) closeModal();
    });

    // Navigation links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            closeMenu();
        });
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    navMenu?.classList.toggle('active');
}

// Close menu
function closeMenu() {
    navMenu?.classList.remove('active');
}

// Check authentication status
function checkAuth() {
    if (api.isAuthenticated()) {
        // User is logged in, hide auth link
        const authLink = document.querySelector('.nav-link[onclick="handleAuthClick(event)"]');
        if (authLink) {
            authLink.textContent = 'Dashboard';
            authLink.onclick = (e) => {
                e.preventDefault();
                window.location.href = './dashboard.html';
            };
        }
    }
}

// Handle auth click
function handleAuthClick(event) {
    event.preventDefault();
    if (api.isAuthenticated()) {
        window.location.href = './dashboard.html';
    } else {
        showAuthModal('login');
    }
}

// Navigate to page
function navigateTo(page) {
    showAuthModal(page);
}

// Show auth modal
function showAuthModal(page) {
    authModal.style.display = 'flex';
    
    if (page === 'login') {
        authContainer.innerHTML = getLoginForm();
        setupLoginForm();
    } else if (page === 'register') {
        authContainer.innerHTML = getRegisterForm();
        setupRegisterForm();
    }
}

// Close modal
function closeModal() {
    authModal.style.display = 'none';
    authContainer.innerHTML = '';
}

// Get login form HTML
function getLoginForm() {
    return `
        <div class="form-container">
            <h2 class="form-title">Welcome Back</h2>
            <p class="form-subtitle">Sign in to your account</p>
            <form id="loginForm">
                <div class="form-group">
                    <label for="loginEmail">Email</label>
                    <input type="email" id="loginEmail" class="form-input" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label for="loginPassword">Password</label>
                    <input type="password" id="loginPassword" class="form-input" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">
                    Sign In
                </button>
            </form>
            <p class="form-toggle" style="margin-top: 1.5rem;">
                Don't have an account? <a href="#" onclick="showAuthModal('register')">Sign up</a>
            </p>
        </div>
    `;
}

// Get register form HTML
function getRegisterForm() {
    return `
        <div class="form-container">
            <h2 class="form-title">Get Started</h2>
            <p class="form-subtitle">Create your account</p>
            <form id="registerForm">
                <div class="form-group">
                    <label for="registerName">Full Name</label>
                    <input type="text" id="registerName" class="form-input" placeholder="John Doe" required>
                </div>
                <div class="form-group">
                    <label for="registerEmail">Email</label>
                    <input type="email" id="registerEmail" class="form-input" placeholder="your@email.com" required>
                </div>
                <div class="form-group">
                    <label for="registerPassword">Password</label>
                    <input type="password" id="registerPassword" class="form-input" placeholder="••••••••" required>
                </div>
                <div class="form-group">
                    <label for="registerConfirmPassword">Confirm Password</label>
                    <input type="password" id="registerConfirmPassword" class="form-input" placeholder="••••••••" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1.5rem;">
                    Create Account
                </button>
            </form>
            <p class="form-toggle" style="margin-top: 1.5rem;">
                Already have an account? <a href="#" onclick="showAuthModal('login')">Sign in</a>
            </p>
        </div>
    `;
}

// Setup login form
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        await handleLogin(email, password);
    });
}

// Setup register form
function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        await handleRegister(name, email, password, confirmPassword);
    });
}

// Handle login
async function handleLogin(email, password) {
    try {
        showLoading(true);
        
        const response = await api.login(email, password);
        
        if (response.success) {
            api.setToken(response.token);
            showAlert('Login successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showAlert(error.message || 'Login failed', 'error');
    } finally {
        showLoading(false);
    }
}

// Handle register
async function handleRegister(name, email, password, confirmPassword) {
    try {
        showLoading(true);
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        const response = await api.register(name, email, password, confirmPassword);
        
        if (response.success) {
            api.setToken(response.token);
            showAlert('Registration successful! Redirecting...', 'success');
            
            setTimeout(() => {
                window.location.href = './dashboard.html';
            }, 1500);
        }
    } catch (error) {
        showAlert(error.message || 'Registration failed', 'error');
    } finally {
        showLoading(false);
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    alertMessage.textContent = message;
    alertMessage.className = `alert ${type}`;
    alertMessage.style.display = 'block';
    
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 4000);
}

// Show/hide loading spinner
function showLoading(show) {
    loadingSpinner.style.display = show ? 'flex' : 'none';
}

// Logout
function logout(event) {
    event.preventDefault();
    api.setToken(null);
    showAlert('Logged out successfully', 'success');
    setTimeout(() => {
        window.location.href = './index.html';
    }, 1000);
}
