const clearFilter = () =>{
//clear filter fields
    document.querySelector(".name").value = "";
    document.querySelector(".species").value = "";
    document.querySelector(".breed").value = "";
    document.querySelector(".gender").selectedIndex = 0;
    document.querySelector(".color").selectedIndex = 0;
    document.querySelector(".age").value="";
    document.querySelector(".username").value="";
}

async function filterPets() {
    //make another get request for filtered pets
    //make fetch url with parameters from search fields
    let queryUrl = '/?';

    let formData = {};
    formData.name = document.querySelector(".name").value;
    formData.species = document.querySelector(".species").value;
    formData.breed = document.querySelector(".breed").value;
    formData.gender = document.querySelector(".gender").value;
    formData.color = document.querySelector(".color").value;
    formData.age = document.querySelector(".age").value;
    formData.username = document.querySelector(".username").value;

    Object.entries(formData).forEach(([key, value]) => {
      queryUrl += `${key}=${value}&`;
    });
  
    console.log(queryUrl);
    //fetch request
    let response = await fetch(queryUrl);
    if (!response.ok) {
        return alert('Error: ' + response.statusText);
    }
}

document.querySelector(".clear-btn").addEventListener("click", clearFilter);
document.querySelector(".search-btn").addEventListener("click", filterPets);