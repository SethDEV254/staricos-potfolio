// Email validation
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Contact form validation
const validateContactForm = ({ name, email, subject, message }) => {
  if (!name || name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (!email || !isValidEmail(email)) {
    return { valid: false, error: 'Invalid email address' };
  }
  
  if (!subject || subject.trim().length < 3) {
    return { valid: false, error: 'Subject must be at least 3 characters' };
  }
  
  if (!message || message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters' };
  }
  
  return { valid: true };
};

module.exports = {
  isValidEmail,
  validateContactForm
};
