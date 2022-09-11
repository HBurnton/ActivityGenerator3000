var searchPhrase= '';
var activity = '';
const anotherVideo = document.getElementById('anotherSuggestion');
const viewFavorites = document.getElementById('viewFavorites');
const randomSuggestion = document.getElementById('random');
const videoContainer = document.getElementById('video');
const addToFavorites = document.getElementById('addToFavorites');
const container = document.querySelector('#container');
const googleAPIkey= 'AIzaSyCsox4guV-52fcE4Q0nAtbVMQQy4N-oae4';
const youtubeAPI = function(){return `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${searchPhrase}&key=${googleAPIkey}`}
var favoritesList = [];
let videoId = ''

//Problem Breakdown

//Simple Version: User Clicks Button On Home Page, Sent to Landing Page

//Problem: Get Bored API Response using fetch. No parameters.
//http://www.boredapi.com/
const boredAPI = "http://www.boredapi.com/api/activity/"

//Problem: attach Parameters from HTML

function loadFavorites(){
    let storedFavorites = window.localStorage.getItem('favoritesList');
    if(storedFavorites){
        favoritesList = JSON.parse(storedFavorites);
        console.log('favorites loaded');
        console.log(favoritesList);
    }else{
        console.log('nothing here')
    }
}

function loadVideo(){
    fetch(boredAPI)
    .then((response)=>response.json())
    .then((data) =>{
        activity = data.activity;
        searchPhrase = `How to ${data.activity.toLowerCase()}`
        console.log(searchPhrase)
    
        fetch(youtubeAPI())
        .then((response)=>response.json())
        .then((data) => {console.log(data)
  try{          
    videoId=data.items[0].id.videoId;
  videoContainer.innerHTML = `<div class='content'><h2 class='has-text-dark'>${searchPhrase}</h2><iframe id="ytplayer" type="text/html" width="640" height="360"
  src="https://www.youtube.com/embed/${videoId}?autoplay=1&origin=http://example.com"
  frameborder="0"></iframe></div>`;

  }catch(error){
    console.log(error);
  }
})

});

}

function goToFavorites(){
    window.location = './favorites.html'
}

function addSuggestionToFavs(){
    var theSuggestion = {
        video: videoId,
        suggestion: searchPhrase,
    }
    favoritesList.push(theSuggestion);
    window.localStorage.setItem('favoritesList', JSON.stringify(favoritesList))
}

loadVideo();
loadFavorites();

anotherVideo.addEventListener('click', loadVideo)
viewFavorites.addEventListener('click', goToFavorites)
randomSuggestion.addEventListener('click', loadVideo)
addToFavorites.addEventListener('click', addSuggestionToFavs)

//Problem:

//Problem:build expanded bored API call:
//http://www.boredapi.com/api/activity?type=recreational&type=education&minaccessibility=0.3&maxaccessibility=0.5&minprice=0&maxprice=0.3

//Problem: Basic Youtube DATA API Call and Response

//testButton.addEventListener('click',clickHandler)
//testButton.addEventListener('click',clickHandler)