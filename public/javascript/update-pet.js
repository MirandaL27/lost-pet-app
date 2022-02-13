
async function uploadPhotoHandler() {
    const imageDivEl = document.querySelector(".image-section"); 
    const path =  document.querySelector(".path").textContent;
    //delete the file from the uploads folder
    
    const pet_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch('/api/pets/'+ pet_id , {
        method: 'DELETE',
        body: JSON.stringify({
          pet_id,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

    let obj = document.querySelector(".file-uploaded");
    obj.remove();

    let labelEl = document.createElement("label");
    labelEl.textContent = "Upload pet picture: "
    let inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.name = "img-post";
    let divEl = document.createElement("div");
    divEl.className="upload-a-pic";
    divEl.appendChild(labelEl);
    divEl.appendChild(inputEl); 
    imageDivEl.appendChild(divEl);
};








document.querySelector('.different-photo').addEventListener('click', uploadPhotoHandler);