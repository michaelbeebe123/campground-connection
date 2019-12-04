$(document).ready(function () {
    $("#trips").empty();

    $.get("/api/user_data").then(function (data) {
        var currentUser = data.id;

        $.get("/api/trips/" + currentUser, function (data) {
            for (var i = 0; i < data.length; i++) {
                var newDiv = $("<div>").text(data[i].title);
                $("#trips").append(newDiv);
            }
        })
    })

});