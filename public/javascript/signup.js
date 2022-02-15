//sign up form
async function signupForm(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const contactMethod = document.querySelector("#contactMethod").value.trim();
    console.log(contactMethod);
  
    if (username && email && password) {
      const response =  await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          contactMethod
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      //check response status
      if (response.ok) {
         document.location.replace('/');
      } else {
          alert(response.statusText);
      }
    }
  }
  document.querySelector('.signup-form').addEventListener('submit', signupForm);
