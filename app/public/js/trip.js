$(document).ready(function () {
    $("#trips").empty();
    $("#no-trips").empty();

    $.get("/api/user_data").then(function (data) {
        var currentUser = data.id;

        $.get("/api/trips/" + currentUser, function (data) {
            if (data[0]) {
                for (var i = 0; i < data.length; i++) {
                    var newDiv = $("<div>").text(data[i].title);
                    $("#trips").append(newDiv);
                }
            } else {
                $("#no-trips").text("You don't have any saved trips");
            }

        })
    })

});