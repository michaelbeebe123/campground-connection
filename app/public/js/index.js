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

    $.get("/api/user_data").then(function (data) {
        userName = data.fname;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        $("#user-name").text(userName);
    });

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

    // $(document).ajaxStart(function () {
    $("#submitBtn").on("click", function () {
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
                    internet: response.data[i].amenities.internetconnectivity,
                    storageLocker: response.data[i].amenities.foodstoragelockers,
                    campStore: response.data[i].amenities.campstore,
                    laundry: response.data[i].amenities.laundry,
                    fireStove: response.data[i].accessibility.firestovepolicy,

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
                            <button class="btn btn-success save-campground" value=${i}>Save Campground</button>
                            <button class="view-campgrounds btn btn-success modal-button" data-toggle="modal" data-target="#campgroundModal" value=${i}>See More</button>
                        </div>
                </div>`

                $("#resultcards").append(parkCards);
            }

            $(".modal-button").on("click", function () {
                $("#exampleModalScrollableTitle").text(campResults[this.value].parkName);
                $("#description").text(campResults[this.value].description);

                if (campResults[this.value].url) {
                    $("#url").text(campResults[this.value].url);
                } else {
                    $("#url").text("N/A");
                }

                $("#weather").text(campResults[this.value].weatherOverview);

                if (campResults[this.value].directionsOverview) {
                    $("#directions").text(campResults[this.value].directionsOverview);
                } else {
                    $("#directions").text("N/A");
                }

                $("#dumpStation").text(campResults[this.value].dumpStation);
                $("#cellPhone").text(campResults[this.value].cellPhone);
                $("#toilets").text(campResults[this.value].toilets);
                $("#showers").text(campResults[this.value].showers);
                $("#internet").text(campResults[this.value].internet);
                $("#storageLocker").text(campResults[this.value].storageLocker);
                $("#campStore").text(campResults[this.value].campStore);
                $("#laundry").text(campResults[this.value].laundry);
                $("#fireStove").text(campResults[this.value].fireStove);

                if (campResults[this.value].regulationsOverview) {
                    $("#regulationsOverview").text(campResults[this.value].regulationsOverview);
                } else {
                    $("#regulationsOverview").text("N/A");
                }

                $("#regulationsURL").html("<a href='" + campResults[this.value].regulationsURL + "'>See regulations</a>");
            })

            $(".save-campground").on("click", function (event) {
                event.preventDefault();
                console.log(this.value);
                titleValue = campResults[this.value].parkName;

                $.get("/api/user_data").then(function (data) {
                    currentUser = data.id;

                    var newTrip = {
                        title: titleValue,
                        userTrip: titleValue + " - " + currentUser,
                        UserId: currentUser
                    };

                    $.post("/api/trips", newTrip, function () {
                        alert("Adding campsite!")
                    })
                })
            })
        })
    };
})
