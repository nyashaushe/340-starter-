// register form 

 // Password visibility toggle
 const passwordInput = document.getElementById('password')
 const showPasswordToggle = document.getElementById('showPassword')
 
 showPasswordToggle.addEventListener('click', function() {
   if (passwordInput.type === 'password') {
     passwordInput.type = 'text'
     showPasswordToggle.textContent = 'Hide'
   } else {
     passwordInput.type = 'password' 
     showPasswordToggle.textContent = 'Show'
   }
 })
