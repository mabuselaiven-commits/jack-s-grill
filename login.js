/**
 * Jack's Grill - Admin Authentication
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorMsg = document.getElementById('errorMessage');
  const errorTxt = document.getElementById('errorText');

  // Clear existing authentication state on load
  localStorage.removeItem('jacks_grill_admin_authenticated');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value.trim();
    const passwordInput = document.getElementById('password').value;

    // Load active credentials
    let allowedUsername = 'admin';
    let allowedPassword = 'JacksGrill2026';

    const saved = localStorage.getItem('jacks_grill_live_data');
    if (saved) {
      try {
        const db = JSON.parse(saved);
        if (db.credentials) {
          if (db.credentials.username) allowedUsername = db.credentials.username;
          if (db.credentials.password) allowedPassword = db.credentials.password;
        }
      } catch (e) {}
    }

    if (usernameInput === allowedUsername && passwordInput === allowedPassword) {
      // Set authenticated token
      localStorage.setItem('jacks_grill_admin_authenticated', 'true');
      localStorage.setItem('jacks_grill_auth_timestamp', Date.now().toString());
      
      // Redirect to admin dashboard
      window.location.href = 'admin.html';
    } else {
      // Display failure notice
      errorMsg.style.display = 'flex';
      if (usernameInput !== allowedUsername) {
        errorTxt.textContent = 'Invalid username.';
      } else {
        errorTxt.textContent = 'Incorrect password.';
      }
    }
  });
});
