async function uploadFormHandler(event) {
    event.preventDefault();
  
    const image = document.querySelector('input[name="img-post"]').files[0];
    console.log("image = ",image);
    const response = await fetch('/upload', {
        method: 'POST',
        body: image,
        // headers: {
        //   'Content-Type': '*'
        // }
      });
      if (response.ok) {
        //document.location.replace('/dashboard/');
        alert("file uploaded successfully");
      } else {
        alert(response.statusText);
      }

  };

document.querySelector('.pet-image-upload-form').addEventListener('submit', uploadFormHandler);