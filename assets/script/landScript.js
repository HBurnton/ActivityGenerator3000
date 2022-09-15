var searchPhrase = '';
var activity = '';
const googleAPIkey = 'AIzaSyCsox4guV-52fcE4Q0nAtbVMQQy4N-oae4';
const anotherVideo = document.getElementById('anotherSuggestion');
const viewFavorites = document.getElementById('viewFavorites');
const randomSuggestion = document.getElementById('random');
const videoContainer = document.getElementById('video');
const addToFavorites = document.getElementById('addToFavorites');
const container = document.querySelector('#container');

let buttons = document.querySelector('.buttons');
let youtubeAPI = function () { return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchPhrase}&key=${googleAPIkey}` }
let favoritesList = [];

let videoId = '';

let boredAPI = "http://www.boredapi.com/api/activity/";
if(window.localStorage.getItem('boredApiUrl')){
    boredAPI = window.localStorage.getItem('boredApiUrl');
}else{
    window.localStorage.setItem('boredApiUrl', boredAPI);
}

//loads prior favorites to add to later
function loadFavorites() {
    let storedFavorites = window.localStorage.getItem('favoritesList');
    if (storedFavorites) {
        favoritesList = JSON.parse(storedFavorites);
    }
}

//loads a random video and makes buttons if they were hidden by error message
function loadRandomVideo() {
    boredAPI = "http://www.boredapi.com/api/activity/";
    loadVideo();
}

//fetches video using same parameters and specs
function loadSimilar() {
    boredAPI = window.localStorage.getItem('boredApiUrl');
    loadVideo();
}

//if user's parameters are too specific, an error will display
function displayError() {
    videoContainer.innerHTML = `<h2 class='title is-2'>Sorry! No available suggestions!<h2><p>Please feel free to add suggestions at <a href='https://www.boredapi.com/contributing'>boredapi.com</a></p>`;
    var randomButton = document.createElement('button');
    randomButton.className = 'button is-primary';
    randomButton.textContent = 'Click Here for a Random Suggestion';
    randomButton.addEventListener('click', loadRandomVideo);
    buttons.style.display = 'none';
    videoContainer.appendChild(randomButton);
}

function resetButtons(){
    if (buttons.style.display == 'none') {
        buttons.style.display = 'flex';
    }
}

//the big mom that fetches the bored API and uses that to search youtube
function loadVideo() {
    fetch(boredAPI)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if ('error' in data) {
                displayError();
            } else {
                activity = data.activity;
                searchPhrase = `How to ${data.activity.toLowerCase()}`
                fetch(youtubeAPI())
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        try {
                            videoId = data.items[0].id.videoId;
                            videoContainer.innerHTML = `<div class='content'><h2 class='has-text-dark'>${searchPhrase}</h2><iframe id="ytplayer" type="text/html" width="640" height="360"
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com"
                        frameborder="0"></iframe></div>`;
                            resetButtons()

                        } catch (error) {
                            console.log(error);
                        }
                    })

            }
        });

}

//function to allow click to favorites
function goToFavorites() {
    window.location = './favorites.html'
}

//saves the retrieved video ID and Search phrase in an object and pushes into favoritesList array
function addSuggestionToFavs() {
    var theSuggestion = {
        video: videoId,
        suggestion: searchPhrase,
    }
    favoritesList.push(theSuggestion);
    window.localStorage.setItem('favoritesList', JSON.stringify(favoritesList))
}

//Add event listeners to various buttons
anotherVideo.addEventListener('click', loadSimilar)
viewFavorites.addEventListener('click', goToFavorites)
randomSuggestion.addEventListener('click', loadRandomVideo)
addToFavorites.addEventListener('click', addSuggestionToFavs)

//Calls for video load and favorites loading
loadVideo();
loadFavorites();