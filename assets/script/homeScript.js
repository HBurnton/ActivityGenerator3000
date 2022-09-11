const generateButton = document.getElementById('generate');
const favoritesButton = document.getElementById('favorites');

function favoritesPage(){
    window.location = './favorites.html'
}

function buildActivityType(){
    var activities = document.querySelectorAll('input[class=activity]');
    for(let i=0; i< activities.length; i++){
        if(activities[i].checked){
            console.log(activities[i].id);
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
    var when = document.querySelectorAll('[name="accessibility"]');
    console.log(when)

}

function buildQuery(event){
    event.preventDefault();
    buildActivityType();
    //buildCost();
    //buildParticipants();
    //buildWhen();
    //changePage();
}

function changePage(){
    //document.location = './landingpage.html?q=';
}

generateButton.addEventListener('click', buildQuery )
favoritesButton.addEventListener('click', favoritesPage)