const generateButton = document.getElementById('generate');
const favoritesButton = document.getElementById('favorites');
let queryString = '';

function favoritesPage(){
    window.location = './favorites.html'
}

function buildActivityType(){
    var activities = document.querySelectorAll('input[class=activity]:checked');
    //if all checkboxes are checked, does not add anything to query as this is the default
    if (activities.length == 9){
    }else{
        for(let i=0; i < activities.length; i++){
            queryString += `&type=${activities[i].id}`
        }
    }
}

function buildCost(){
    var cost = document.getElementById('cost');
    console.log(cost.value);
    switch (cost.value){
        case 'lowCost':
            queryString += '&minprice=0.0&maxprice=0.2';
            break;
        case 'medCost':
            queryString += '&minprice=0.2&maxprice=0.4';
            break;
        case 'highCost':
            queryString += '&minprice=0.4&maxprice=0.9';
            break;
    }

}

function buildQuery(event){
    event.preventDefault();
    buildActivityType();
    buildCost();
    //buildParticipants();
    //buildWhen();
    changePage();
}

function changePage(){
    boredAPI = 'http://www.boredapi.com/api/activity?'+ queryString;
    queryString = '';
    window.localStorage.setItem('boredApiUrl', boredAPI);
    document.location = './landingpage.html';

}

generateButton.addEventListener('click', buildQuery );
favoritesButton.addEventListener('click', favoritesPage);

/*
If defining by too many parameters, often too specific and no video returned

function buildParticipants(){
    var participants = document.getElementById('people');
    console.log(participants.value);
    switch(participants.value){
        case 'none':
            queryString += '&participants=0';
            break;
        case 'few':
            queryString += '&participants=0.4';
            break;
        case 'many':
            queryString += '&participants=0.5'
            break;
    }

}

function buildWhen(){
    var when = document.querySelectorAll('[name="accessibility"]:checked');
    queryString += `&accessibility=${when[0].id}`
    console.log(when)

} */