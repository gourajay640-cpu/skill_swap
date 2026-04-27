// ===============================
// Dashboard JavaScript
// ===============================

// Check authentication on page load
document.addEventListener('DOMContentLoaded', () => {
    if (!api.isAuthenticated()) {
        window.location.href = './index.html';
        return;
    }
    
    setupDashboard();
    loadUserProfile();
    setupEventListeners();
});

// Setup dashboard
function setupDashboard() {
    // Setup sidebar links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
        });
    });

    // Setup edit profile form
    document.getElementById('editProfileForm')?.addEventListener('submit', handleProfileUpdate);
}

// Setup event listeners
function setupEventListeners() {
    // Edit mode toggle
    document.getElementById('editProfileForm')?.addEventListener('submit', handleProfileUpdate);
}

// Show section
function showSection(sectionId, event) {
    if (event) {
        event.preventDefault();
    }

    // Hide all sections
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });

    // Remove active class from all links
    document.querySelectorAll('.sidebar-link').forEach(link => {
        link.classList.remove('active');
    });

    // Show selected section
    const section = document.getElementById(sectionId);
    if (section) {
        section.classList.add('active');
    }

    // Add active class to clicked link
    event.target.closest('.sidebar-link').classList.add('active');

    // Load data for specific sections
    if (sectionId === 'users') {
        loadAllUsers();
    }
}

// Load user profile
async function loadUserProfile() {
    try {
        showLoading(true);
        const response = await api.getProfile();

        if (response.success) {
            const user = response.user;
            
            // Update profile display
            document.getElementById('profileName').textContent = user.name;
            document.getElementById('profileEmail').textContent = user.email;
            
            const joinDate = new Date(user.createdAt).toLocaleDateString();
            document.getElementById('profileJoinDate').textContent = `Joined: ${joinDate}`;

            // Set form values
            document.getElementById('editName').value = user.name;
            document.getElementById('editEmail').value = user.email;
        }
    } catch (error) {
        showAlert(error.message || 'Failed to load profile', 'error');
    } finally {
        showLoading(false);
    }
}

// Toggle edit mode
function toggleEditMode() {
    const form = document.getElementById('editProfileForm');
    const displayInfo = document.querySelector('.edit-toggle');
    
    if (form.style.display === 'none') {
        form.style.display = 'block';
        displayInfo.style.display = 'none';
    } else {
        form.style.display = 'none';
        displayInfo.style.display = 'block';
    }
}

// Handle profile update
async function handleProfileUpdate(event) {
    event.preventDefault();

    try {
        showLoading(true);

        const name = document.getElementById('editName').value;
        const email = document.getElementById('editEmail').value;

        if (!name || !email) {
            showAlert('Please fill all fields', 'error');
            return;
        }

        const response = await api.updateProfile(name, email);

        if (response.success) {
            showAlert('Profile updated successfully', 'success');
            toggleEditMode();
            loadUserProfile();
        }
    } catch (error) {
        showAlert(error.message || 'Failed to update profile', 'error');
    } finally {
        showLoading(false);
    }
}

// Load all users
async function loadAllUsers() {
    try {
        showLoading(true);
        const response = await api.getAllUsers();

        if (response.success) {
            const usersGrid = document.getElementById('usersGrid');
            usersGrid.innerHTML = '';

            if (response.users.length === 0) {
                usersGrid.innerHTML = '<p class="loading-text">No users found</p>';
                return;
            }

            response.users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card glass';
                userCard.innerHTML = `
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <h3>${user.name}</h3>
                    <p>${user.email}</p>
                    <button class="btn btn-primary" style="width: 100%;">
                        <i class="fas fa-handshake"></i> Connect
                    </button>
                `;
                usersGrid.appendChild(userCard);
            });
        }
    } catch (error) {
        showAlert(error.message || 'Failed to load users', 'error');
    } finally {
        showLoading(false);
    }
}

// Confirm delete account
function confirmDeleteAccount() {
    const confirmModal = document.getElementById('confirmModal');
    document.getElementById('confirmMessage').textContent = 
        'Are you sure you want to delete your account? This action cannot be undone.';
    
    window.confirmAction = deleteAccount;
    confirmModal.style.display = 'flex';
}

// Execute confirmation
function executeConfirm() {
    if (window.confirmAction) {
        window.confirmAction();
    }
    closeConfirm();
}

// Close confirmation
function closeConfirm() {
    document.getElementById('confirmModal').style.display = 'none';
    window.confirmAction = null;
}

// Delete account
async function deleteAccount() {
    try {
        showLoading(true);
        const response = await api.deleteAccount();

        if (response.success) {
            showAlert('Account deleted successfully', 'success');
            api.setToken(null);
            
            setTimeout(() => {
                window.location.href = './index.html';
            }, 1500);
        }
    } catch (error) {
        showAlert(error.message || 'Failed to delete account', 'error');
    } finally {
        showLoading(false);
    }
}

// Show alert message
function showAlert(message, type = 'info') {
    const alertMessage = document.getElementById('alertMessage');
    alertMessage.textContent = message;
    alertMessage.className = `alert ${type}`;
    alertMessage.style.display = 'block';
    
    setTimeout(() => {
        alertMessage.style.display = 'none';
    }, 4000);
}

// Show/hide loading spinner
function showLoading(show) {
    document.getElementById('loadingSpinner').style.display = show ? 'flex' : 'none';
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
