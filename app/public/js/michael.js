
// TODO: ADD VALUES FROM parkResults ARRAY TO THE DYNAMIC HTML
// TODO: ADD PARK IMAGE TO THE AJAX CALL

// VAR THAT CONTAINS html THAT WILL BE RENDERED ON THE FLY
for (var i = 0; i < parkResults.length; i++) {
    var parkCards =
        `<div class="card mb-3">
            <div class="card-body">
                <h5 class="card-title" id="park-name">${parkResults[i].parkName}</h5>
                <p class="card-text" id="park-description">${parkResults[i].description}</p>
                <p class ="card-text" id ="park-url" <a href="${parkResults[i].url}">Website</a>></p>
                <p class ="card-text" id ="directions-url" <a href="${parkResults[i].directionsURL}">Directions</a>></p>
                <button id="view-campgrounds">View Campgrounds</a></button>
            </div>
        </div>`

    $("#resultcards").append(parkCards);

    if (parkResults[i] === undefined) {
        
    }
}