$(document).ready(function () {

    var parkAPIKey = "Pjmdd03bG2N1jCIooMRyVf5RWpxWgOMFF2Eg0xC3"
    var state;
    var limit;
    var parkCode;
    var campResults = [];
    var parkCode = "";
    var parkName = "";
    var parkPic = "";
    var url = "";
    var description = "";
    var directionsURL = "";

    $("#submitBtn").on("click", function () {
        event.preventDefault();
        $("#resultcards").empty();
        campResults = [];
        state = $("#inputState").val();
        limit = $("#limitNumber").val();
        console.log(state);
        console.log(limit);

        // create loading gif and push onto page
        var loader = $("<div>");
        loader.attr("id", "loader");
        loader.html("<h3>Get excited, campgrounds are on the way!</h3>")
        loader.append("<img src=images/loader.gif>");
        $("#parksloader").html(loader);

        // call functions
        // getParks()
        getCamp();
    })

    $(document).ajaxStart(function () {
        // Show image container
        console.log("loader")
        $("#form").hide();
        $("#loader").show();
        setTimeout(function () {
            $("#loader").hide();
            $("#form").show();
        }, 3000);
    });

 

    function getCamp() {

        var queryURLCamp = "https://developer.nps.gov/api/v1/campgrounds?stateCode=" + state + "&limit=" + limit + "&api_key=" + parkAPIKey;
        console.log(queryURLCamp);

        $.ajax({
            url: queryURLCamp,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {

                var newCampObject = {
                    parkName: response.data[i].name,
                    url: response.data[i].url,
                    description: response.data[i].description,
                    directionsOverview: response.data[i].directionsoverview,
                    directionsURL: response.data[i].directionsUrl,
                };

                campResults.push(newCampObject);

            }

            for (var i = 0; i < campResults.length; i++) {
                var parkCards =
                    `<div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title" id="park-name">${campResults[i].parkName}</h5>
                            <p class="card-text" id="park-description">${campResults[i].description}</p>
                            <p class ="card-text" id ="park-url" <a href="${campResults[i].url}">Website</a></p>
                            <p class ="card-text" id ="directions-url" <a href="${campResults[i].directionsURL}">Directions</a></p>
                            <button class="view-campgrounds btn btn-success" value=${i}>PLACEHOLDER</button>
                        </div>
                </div>`

                $("#resultcards").append(parkCards);


            }
        })

    };
})
