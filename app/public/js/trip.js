$(document).ready(function () {
    $("#trips").empty();
    $("#no-trips").empty();

    $(document).on("click", "button.delete", deleteCamp);

    $.get("/api/user_data").then(function (data) {
        userName = data.fname;
        userName = userName.charAt(0).toUpperCase() + userName.slice(1);
        $("#user-name").text(userName + "'s Campgrounds");
    });

    initializePage();

    function makeCards(cardTitle, Url, timestamp, number) {
        var userCards =
            `<div class="card mb-3">
                <div class="card-body">
                    <h3 class="card-title" >${cardTitle}</h3>
                    <hr>
                    <p class="card-text" ><a href='${Url}'>See Regulations</a></p>
                    <p class="card-text">Saved on: ${timestamp}</p>
                    <hr>
                    <button class="btn btn-danger delete" value=${number}>Delete Campground</button>
                </div>
            </div>`

        $("#trips").append(userCards);

    }

    function initializePage() {
        $("#trips").empty();
        $("#no-trips").empty();

        $.get("/api/user_data").then(function (data) {
            var currentUser = data.id;

            $.get("/api/trips/" + currentUser, function (data) {
                if (data[0]) {
                    for (var i = 0; i < data.length; i++) {
                        var title = data[i].title;
                        var createdAt = data[i].createdAt;
                        var id = data[i].id;

                        if (data[i].regUrl) {
                            var regUrl = data[i].regUrl;
                        }

                        makeCards(title, regUrl, createdAt, id);
                    }
                } else {
                    $("#no-trips").text("You don't have any saved trips");
                }
            })
        })
    }

    function deleteCamp(event) {
        // event.stopPropagation();
        // var id = $(this).data("id");
        var id = this.value
        $.ajax({
            method: "DELETE",
            url: "/api/trips/" + id
        }).then(initializePage);
    }
});