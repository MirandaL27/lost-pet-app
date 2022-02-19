const populateFilterOnLoad = () => {
    const filterObj = JSON.parse(localStorage.getItem("filter"));
    document.querySelector(".status").selectedIndex = (filterObj.status ? (filterObj.status =="lost" ? 1 : 2) : 0);
    document.querySelector(".name").value = (filterObj.name ? filterObj.name : "");
    document.querySelector(".species").value = (filterObj.species ? filterObj.species: "");
    document.querySelector(".breed").value = (filterObj.breed ? filterObj.breed: "");
    document.querySelector(".gender").selectedIndex = (filterObj.gender ? (filterObj.gender == "male" ? 1 : 2 ): 0);
    document.querySelector(".color").value = filterObj.color;
    document.querySelector(".age").value = (filterObj.age ? filterObj.age : "");
    document.querySelector(".username").value = (filterObj.username ? filterObj.username : "");

}

const clearFilter = (event) => {
    //clear filter fields
    console.log("clear button clicked");
    document.querySelector(".status").selectedIndex = 0;
    document.querySelector(".name").value = "";
    document.querySelector(".species").value = "";
    document.querySelector(".breed").value = "";
    document.querySelector(".gender").selectedIndex = 0;
    document.querySelector(".color").selectedIndex = 0;
    document.querySelector(".age").value = "";
    document.querySelector(".username").value = "";
    localStorage.removeItem("filter");
}

async function filterPets() {
    //make another get request for filtered pets
    //make fetch url with parameters from search fields
    let queryUrl = '/?';

    let formData = {};
    formData.status = document.querySelector(".status").value.toLowerCase();
    formData.name = document.querySelector(".name").value;
    formData.species = document.querySelector(".species").value;
    formData.breed = document.querySelector(".breed").value;
    formData.gender = document.querySelector(".gender").value;
    formData.color = document.querySelector(".color").value;
    formData.age = document.querySelector(".age").value;
    formData.username = document.querySelector(".username").value;

    localStorage.setItem("filter", JSON.stringify(formData));

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
document.querySelector(".filter-wrapper").addEventListener("submit", filterPets);
populateFilterOnLoad();