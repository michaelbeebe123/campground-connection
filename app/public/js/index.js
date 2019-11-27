$(document).ready(function () {

    var parkAPIKey = "Pjmdd03bG2N1jCIooMRyVf5RWpxWgOMFF2Eg0xC3"
    var state;
    var limit;
    var parkCode;
    var parkResults = [];
    var parkCode = "";
    var parkName = "";
    var parkPic = "";
    var url = "";
    var description = "";
    var directionsURL = "";

    $("#submitBtn").on("click", function () {
        event.preventDefault();
        $("#resultcards").empty();
        parkResults = [];
        state = $("#inputState").val();
        limit = $("#limitNumber").val();
        console.log(state);
        console.log(limit);

        // create loading gif and push onto page
        var loader = $("<div>");
        loader.attr("id", "loader");
        loader.html("<h3>Get excited parks are on the way!</h3>")
        loader.append("<img src=images/loader.gif>");
        $("#parksloader").html(loader);

        // call functions
        getParks()
    })

    $(document).ajaxStart(function () {
        // Show image container
        console.log("loader")
        $("#form").hide();
        $("#loader").show();
        setTimeout(function () {
            $("#loader").hide();
            $("#form").show();
        }, 4000);
    });

    // TODO: ADD PARK IMAGE TO THE AJAX CALL
    function getParks() {
        var queryURLParks = "https://developer.nps.gov/api/v1/parks?&stateCode=" + state + "&limit=" + limit + "&api_key=" + parkAPIKey;
        console.log(queryURLParks)

        $.ajax({
            url: queryURLParks,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            for (var i = 0; i < response.data.length; i++) {
                // console.log(i)
                // var newParkArray = [];
                // parkCode = response.data[i].parkCode;
                // parkName = response.data[i].name;
                // url = response.data[i].url;
                // description = response.data[i].description;
                // directionsURL = response.data[i].directionsUrl;

                // newParkArray.push(parkCode);
                // newParkArray.push(parkName);
                // newParkArray.push(description);
                // newParkArray.push(url);
                // newParkArray.push(directionsURL);

                // parkResults.push(newParkArray);

                // console.log(parkResults);

                var newParkObject = {
                    parkCode: response.data[i].parkCode,
                    parkName: response.data[i].name,
                    parkPic: response.data[i].images,
                    url: response.data[i].url,
                    description: response.data[i].description,
                    directionsURL: response.data[i].directionsUrl,
                };

                parkResults.push(newParkObject);

            }

            for (var i = 0; i < parkResults.length; i++) {
                var parkCards =
                    `<div class="card mb-3">
                        <div class="card-body">
                            <h5 class="card-title" id="park-name">${parkResults[i].parkName}</h5>
                            <p class="card-text" id="park-description">${parkResults[i].description}</p>
                            <p class ="card-text" id ="park-url">Park Website: ${parkResults[i].url}</p>
                            <p class ="card-text" id ="directions-url">Directions: ${parkResults[i].directionsURL}</p>
                            <button id="view-campgrounds"><a href="">View Campgrounds</a></button>
                        </div>
                </div>`

                $("#resultcards").append(parkCards);

                if (parkResults[i] === undefined) {

                }
            }

            $(".card-button").on("click", function (event) {
                event.preventDefault();
                parkCode = parkResults[this.value].parkCode
            })

        })

    }

    function getCamp() {

        var queryURLCamp = "https://developer.nps.gov/api/v1/campgrounds?parkCode=" + parkCode + "&limit=" + limit + "&api_key=" + parkAPIKey;

        $.ajax({
            url: queryURLCamp,
            method: "GET"
        }).then(function (response) {

            for (var i = 0; i < response.length; i++) {
                var campName = response.data[i].name;
                var description = response.data[i].description;

                //amenities
                var toilets = response.data[i].amenities.toilets;
                var showers = response.data[i].amenities.showers;
                var dumpstation = response.data[i].amenities.dumpstation;
                var firestovepolicy = response.data[i].accessibility.firestovepolicy;

                //accessibility
                var adainfo = response.data[i].accessibility.adainfo;
                var wheelchairaccess = response.data[i].accessibility.wheelchairaccess;
                var rvinfo = response.data[i].accessibility.rvinfo;

            }


        })
    }

});

