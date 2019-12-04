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
        $("#resultcards").hide();
        $("#loader").show();
        setTimeout(function () {
            $("#loader").hide();
            $("#resultcards").show();
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
                    regulationsOverview: response.data[i].regulationsoverview,
                    regulationsURL: response.data[i].regulationsurl,
                    description: response.data[i].description,
                    directionsOverview: response.data[i].directionsoverview,
                    weatherOverview: response.data[i].weatheroverview,
                    directionsURL: response.data[i].directionsUrl,
                    dumpStation: response.data[i].amenities.dumpstation,
                    cellPhone: response.data[i].amenities.cellphonereception,
                    toilets: response.data[i].amenities.toilets,
                    showers: response.data[i].amenities.showers,
                    internet:response.data[i].amenities.internetconnectivity, 
                    storageLocker: response.data[i].amenities.foodstoragelockers,
                    campStore: response.data[i].amenities.campstore,
                    laundry: response.data[i].amenities.laundry,
                    fireStove: response.data[i].accessability.firestovepolicy,

                };

                campResults.push(newCampObject);

            }

            for (var i = 0; i < campResults.length; i++) {
                var parkCards =
                    `<div class="card mb-3">
                        <div class="card-body">
                            <h3 class="card-title" id="park-name">${campResults[i].parkName}</h3>
                            <hr>
                            <p class="card-text" id="park-description">${campResults[i].description}</p>
                            <h5 class="card-title">Directions</h5>
                            <p class="card-text" id="directions-overview">${campResults[i].directionsOverview}</p>
                            <hr>
                            <button class="btn btn-success" id ="directions-url" href="${campResults[i].directionsURL}">Map</button>
                            <button class="view-campgrounds btn btn-success" value=${i}>See More</button>
                        </div>
                </div>`

                $("#resultcards").append(parkCards);


            }
        })

    };
})
