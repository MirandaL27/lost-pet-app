// async function newPet(event) {
//     event.preventDefault();
  
//     const title = document.querySelector('input[name="pet-title"]').value;
//     const pet_url = document.querySelector('input[name="pet-url"]').value;
  
//     const response = await fetch(`/api/pets`, {
//       method: 'POST',
//       body: JSON.stringify({
//         nane,
//         pet_url,
//       }),
//       headers: {
//         'Content-Type': 'application/json'
//       }
//     });
  
//     if (response.ok) {
//       document.location.replace('/dashboard');
//     } else {
//       alert(response.statusText);
//     }
//   }
  
//   document.querySelector('.new-pet-form').addEventListener('submit', newPet);
  