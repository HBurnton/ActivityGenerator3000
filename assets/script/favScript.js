const favContainer = document.getElementById('favoritesContainer');
function loadFavorites() {
    var favorites = JSON.parse(window.localStorage.getItem('favoritesList'));
    for (let i = 0; i < favorites.length; i++) {
        favContainer.innerHTML +=
            `<button class="js-modal-trigger" data-target="modal-js-${i}">${favorites[i].suggestion}</button>

            <div id="favoritesContainer"></div>

            <div id="modal-js-${i}" class="modal">
                <div class="modal-background"></div>
      
            <div class="modal-content">
            <div class="box">
                <p>${favorites[i].suggestion}</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${favorites[i].video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>          </div>
            </div>
        
            <button class="modal-close is-large" aria-label="close"></button>
        </div>`
    }
}

if (window.localStorage.getItem('favoritesList') !== null) {
    loadFavorites()
} else {
    console.log(`Go add some favorites you dingus`);
}

/*All of the below taken from Bulma Documentation https://bulma.io/documentation/components/modal/ */

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
        $el.classList.add('is-active');
    }

    function closeModal($el) {
        $el.classList.remove('is-active');
    }

    function closeAllModals() {
        (document.querySelectorAll('.modal') || []).forEach(($modal) => {
            closeModal($modal);
        });
    }

    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
        const modal = $trigger.dataset.target;
        const $target = document.getElementById(modal);

        $trigger.addEventListener('click', () => {
            openModal($target);
        });
    });

    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
        const $target = $close.closest('.modal');

        $close.addEventListener('click', () => {
            closeModal($target);
        });
    });

    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
        const e = event || window.event;

        if (e.keyCode === 27) { // Escape key
            closeAllModals();
        }
    });
});