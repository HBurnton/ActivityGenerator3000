var searchPhrase = '';
var activity = '';
var googleAPIkey = 'AIzaSyC_6H4IcqUv1r-WxdCfaHGjohtT1uDhKqQ';
const anotherVideo = document.getElementById('anotherSuggestion');
const viewFavorites = document.getElementById('viewFavorites');
const randomSuggestion = document.getElementById('random');
const videoContainer = document.getElementById('video');
const addToFavorites = document.getElementById('addToFavorites');
const container = document.querySelector('#container');

var notification = document.querySelector('.notification');



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
                            videoContainer.innerHTML = `<div class='content'><h2 class='has-text-light'>${searchPhrase}</h2><iframe id="ytplayer" type="text/html" width="640" height="360"
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com"
                        frameborder="0"></iframe></div>`;
                            resetButtons()

                        } catch (error) {//swaps API Key if error from over query
                            googleAPIkey = 'AIzaSyBqZzNDB6lXVvcNSKYIvUfDFLa4A3pX-1o';
                            loadVideo()
                            console.log('triggered')
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

function displayMessage(){ //JQUERY TOAST FROM https://kamranahmed.info/toast
    $.toast({
        text: "Video has been added to favorites", // Text that is to be shown in the toast
        heading: 'Added to Favorites', // Optional heading to be shown on the toast
        icon: 'success', // Type of toast icon
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'top-left', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
        
        
        
        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#9EC600',  // Background color of the toast loader
        beforeShow: function () {}, // will be triggered before the toast is shown
        afterShown: function () {}, // will be triggered after the toat has been shown
        beforeHide: function () {}, // will be triggered before the toast gets hidden
        afterHidden: function () {}  // will be triggered after the toast has been hidden
    });
}

//Add event listeners to various buttons
anotherVideo.addEventListener('click', loadSimilar);
viewFavorites.addEventListener('click', goToFavorites);
randomSuggestion.addEventListener('click', loadRandomVideo);
addToFavorites.addEventListener('click', addSuggestionToFavs);
addToFavorites.addEventListener('click', displayMessage);

//Calls for video load and favorites loading
loadVideo();
loadFavorites();