
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

module.exports = {parseQueryString};
