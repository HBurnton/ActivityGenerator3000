const generateButton = document.getElementById('generate');
const favoritesButton = document.getElementById('favorites');

function favoritesPage(){
    window.location = './favorites.html'
}

function changePage(event){
    event.preventDefault();
    document.location = './landingpage.html?q=';
}

generateButton.addEventListener('click', changePage )
favoritesButton.addEventListener('click', favoritesPage)