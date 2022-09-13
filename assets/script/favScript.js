var storedFavorites = [];
// takes the string items stored in local storage and places it into an array
function getFavorites() {
    storedFavorites = JSON.parse(window.localStorage.getItem("favoritesList"));
}
getFavorites();
//displays the local storage to the DOM
//problem: links are clickable but do not link back to the randomly generated item from the bored API
function showFavorites() {
    storedFavorites = JSON.parse(window.localStorage.getItem("favoritesList"));  
    let list = document.getElementById("favList");
    storedFavorites.forEach((item)=> {
    let li = document.createElement("li");
    list.appendChild(li);
    let a = document.createElement("a");
    a.href = "./index.html";
    a.innerText = item.suggestion;
    li.appendChild(a);
    
}) }
showFavorites();

addEventListener("click",  )
