$(document).ready(function () {
    $("#trips").empty();
    $("#no-trips").empty();

    $.get("/api/user_data").then(function (data) {
        userName = data.fname;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        $("#user-name").text(userName);
    });

    function makeCards(cardTitle, Url, timestamp, number) {
        var userCards =
            `<div class="card mb-3">
                <div class="card-body">
                    <h3 class="card-title" >${cardTitle}</h3>
                    <hr>
                    <p class="card-text" ><a href='${Url}'>See Regulations</a></p>
                    <p class="card-text">Saved on: ${timestamp}</p>
                    <hr>
                    <button class="btn btn-success delete-campground" value=${number}>Delete Campground</button>
                </div>
            </div>`

        $("#trips").append(userCards);
    }

    $.get("/api/user_data").then(function (data) {
        var currentUser = data.id;

        $.get("/api/trips/" + currentUser, function (data) {
            if (data[0]) {
                for (var i = 0; i < data.length; i++) {
                    var title = data[i].title;
                    var createdAt = data[i].createdAt;

                    if (data[i].regUrl) {
                        var regUrl = data[i].regUrl;
                    }

                    makeCards(title, regUrl, createdAt, i);
                }
            } else {
                $("#no-trips").text("You don't have any saved trips");
            }

        })
    })

});