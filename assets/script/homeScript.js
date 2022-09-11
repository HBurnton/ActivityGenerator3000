const generateButton = document.getElementById('generate');
const favoritesButton = document.getElementById('favorites');
let queryString = '';

function favoritesPage(){
    window.location = './favorites.html'
}

function buildActivityType(){
    var activities = document.querySelectorAll('input[class=activity]:checked');
    if (activities.length == 9){
    }else{
        queryString += 'type=';
        for(let i=0; i < activities.length; i++){
            queryString += `${activities[i].id}`
        }
    }
}

function buildCost(){
    var cost = document.getElementById('cost');
    console.log(cost.value)

}

function buildParticipants(){
    var participants = document.getElementById('people');
    console.log(participants.value);

}

function buildWhen(){
    var when = document.querySelectorAll('[name="accessibility"]:checked');
    queryString += `&accessibility=${when[0].id}`
    console.log(when)

}

function buildQuery(event){
    event.preventDefault();
    buildActivityType();
    //buildCost();
    //buildParticipants();
    buildWhen();
    changePage();
}

function changePage(){
    document.location = './landingpage.html?q='+queryString;
}

generateButton.addEventListener('click', buildQuery )
favoritesButton.addEventListener('click', favoritesPage)