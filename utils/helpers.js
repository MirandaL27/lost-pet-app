
const parseQueryString = (params) => {
    var finalObj = {};
    console.log(params);
    if(params){
        if(params.colors){
            finalObj.color = params.colors;
        }
        if(params.status){
            finalObj.is_lost = (params.status==="lost");
        }
        if(params.name){
            finalObj.name = params.name;
        }
        if(params.gender){
            finalObj.gender = params.gender;
        }
        if(params.breed){
            finalObj.breed = params.breed;
        }
        if(params.species){
            finalObj.species = params.species;
        }
        if(params.age){
            finalObj.age = params.age;
        }
    }
    else{
        {};
    }
    return finalObj;
}

const format_date = date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(
      date
    ).getFullYear()}`;
  }
const format_plural = (word, amount) => {
  if (amount !== 1) {
    return `${word}s`;
  }

  return word;
}

module.exports = {parseQueryString, format_date, format_plural};
