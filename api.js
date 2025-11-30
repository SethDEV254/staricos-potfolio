// API Configuration
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://your-backend-url.com/api'; // Update with your deployed backend URL

// API Helper Functions
const api = {
  // Submit contact form
  async submitContact(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }
      
      return result;
    } catch (error) {
      console.error('Contact API error:', error);
      throw error;
    }
  },

  // Get all projects
  async getProjects(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await fetch(`${API_BASE_URL}/projects?${params}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Projects API error:', error);
      throw error;
    }
  },

  // Get single project
  async getProject(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${id}`);
      
      if (!response.ok) {
        throw new Error('Project not found');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Project API error:', error);
      throw error;
    }
  },

  // Track page view
  async trackPageView(page, referrer = document.referrer) {
    try {
      await fetch(`${API_BASE_URL}/analytics/pageview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          page,
          referrer,
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  },

  // Track custom event
  async trackEvent(event, category, label, value) {
    try {
      await fetch(`${API_BASE_URL}/analytics/event`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          event,
          category,
          label,
          value
        })
      });
    } catch (error) {
      console.error('Analytics error:', error);
    }
  }
};

// Track page view on load
document.addEventListener('DOMContentLoaded', () => {
  api.trackPageView(window.location.pathname);
});
