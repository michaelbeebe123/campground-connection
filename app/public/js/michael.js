
// TODO: ADD VALUES FROM parkResults ARRAY TO THE DYNAMIC HTML
// TODO: ADD PARK IMAGE TO THE AJAX CALL

// VAR THAT CONTAINS html THAT WILL BE RENDERED ON THE FLY
var parkCards = 
`<div class="card mb-3">
    <img src="${parkResults[i].parkPic}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title" id="park-name">${parkResults[i].name}</h5>
            <p class="card-text" id="park-description">${parkResults[i].description}</p>
            <p class ="card-text" id ="park-url">${parkResults[i].url}</p>
            <p class ="card-text" id ="directions-url">${parkResults[i].directionsUrl}</p>
        </div>
</div>`

// TODO: DUMPS THE PARK CARDS WHEN USER CLICKS SUBMIT BUTTON
$("#submitBtn").on("click", function(){
        for (var i =0; i < parkResults.length; i++) {
            $("#resultcards").html(parkCards);
        }
})