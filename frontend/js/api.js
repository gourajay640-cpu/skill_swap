// ===============================
// API Configuration and Functions
// ===============================

const API_BASE_URL = 'http://localhost:5000/api';

class API {
    constructor() {
        this.token = localStorage.getItem('token');
    }

    // Helper method to make API calls
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        // Add token to headers if available
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'An error occurred');
            }

            return data;
        } catch (error) {
            throw error;
        }
    }

    // Auth Endpoints
    async register(name, email, password, confirmPassword) {
        return this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, confirmPassword }),
        });
    }

    async login(email, password) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
    }

    // User Endpoints
    async getProfile() {
        return this.request('/user/profile', {
            method: 'GET',
        });
    }

    async updateProfile(name, email) {
        return this.request('/user/profile', {
            method: 'PUT',
            body: JSON.stringify({ name, email }),
        });
    }

    async getAllUsers() {
        return this.request('/user/all', {
            method: 'GET',
        });
    }

    async deleteAccount() {
        return this.request('/user/account', {
            method: 'DELETE',
        });
    }

    // Set token
    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }

    // Check if user is authenticated
    isAuthenticated() {
        return !!this.token;
    }
}

// Create API instance
const api = new API();
