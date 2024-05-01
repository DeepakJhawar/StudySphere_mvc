function validateForm() {
  document.getElementById("emailError").textContent = "";
  document.getElementById("usernameError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  var email = document.getElementById("email").value.trim();
  var username = document.getElementById("username").value.trim();
  var password = document.getElementById("password").value;

  if (!isValidEmail(email)) {
    document.getElementById("emailError").textContent = "Please enter a valid email address";
    return false;
  }

  if (username.length < 4) {
    document.getElementById("usernameError").textContent = "Username must be at least 4 characters long";
    return false;
  }

  if (password.length < 6) {
    document.getElementById("passwordError").textContent = "Password too short";
    return false;
  }

  if (!/[a-z]/.test(password)) {
    document.getElementById("passwordError").textContent = "Need lowercase letter";
    return false;
  }

  if (!/[A-Z]/.test(password)) {
    document.getElementById("passwordError").textContent = "Need uppercase letter";
    return false;
  }

  if (!/\d/.test(password)) {
    document.getElementById("passwordError").textContent = "Need number";
    return false;
  }

  if (!/[@$!%*?&]/.test(password)) {
    document.getElementById("passwordError").textContent = "Need special symbol";
    return false;
  }

  return true; 
}

function isValidEmail(email) {
  var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}