
const parseQueryString = (params) => {
    var finalObj = {};
    if(params){
        if(params.color){
            finalObj.color = params.color;
        }
        if(params.status){
            finalObj.is_lost = params.status;
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
        if(params.username){
            finalObj.username = params.username;
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
