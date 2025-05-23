document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const role = document.getElementById('role').value;
  const code = document.getElementById('code').value;
  const newPassword = document.getElementById('newPassword').value;
  const confirmPassword = document.getElementById("confirmpassword")?.value.trim();

    // ✅ Password Validation
    if (newPassword.length < 6) {
        alert("Password must be at least 6 characters long!");
        return false;
    }

    if (newPassword !== confirmPassword) {
        alert("Passwords do not match!");
        return false;
    }
  try {
      const response = await fetch('/resetPassword', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, role, code, newPassword }),
      });

      if (response.ok) {
          const data = await response.json(); // Parse JSON response
          alert(data.message); // Show alert with the success message
          window.location.href = '/login'; // Redirect to login page
      } else {
          const errorMessage = await response.text(); // Get error message
          alert(`Error: ${errorMessage}`); // Show alert with error message
      }
  } catch (error) {
      alert('Error: ' + error.message); // Handle any unexpected errors
  }
});