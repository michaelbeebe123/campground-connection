$(document).ready(function(){

var parkAPIKey= "Pjmdd03bG2N1jCIooMRyVf5RWpxWgOMFF2Eg0xC3"
var state;
var limit;
var parkCode;
var parkResults = [];

$("#submitBtn").on("click", function () {
    event.preventDefault();
    state = $("#inputState").val();
    limit = $("#limitNumber").val();
    console.log(state);
    console.log(limit);
    // create loading gif and push onto page
    // var loader = $("<div>");
    // loader.attr("id", "loader");
    // loader.html("<h3>Get excited parks are on the way!</h3>")
    // loader.append("<img src=https://giphy.com/gifs/5tfqO7ClftEsoa6J7h>");
    // $("#loader").html(loader);

    // call functions
    getParks()
})

// $(document).ajaxStart(function () {
//     // Show image container
//     $("#row1").hide();
//     $("#row2").hide();
//     $("#loader").show();
//     setTimeout(function () {
//         $("#loader").hide();
//         $("#row1").show();
//         $("#row2").show();
//     }, 3000);
// });


function getParks(){
    var queryURLParks= "https://developer.nps.gov/api/v1/parks?&stateCode="+ state +"&limit="+ limit + "&api_key=" + parkAPIKey;
    console.log(queryURLParks)
    
    $.ajax({
        url:queryURLParks,
        method: "GET"
    }).then(function (response){
        console.log(response);

        for (var i = 0; i <response.length; i++){
        parkCode= response[i].data.parkCode;
        var cityName= response[i].data.name;
        var url = response[i].data.url;
        var description = response[i].data.description;
        var directionsURL = response[i].data.directionsURL;
        
        $(parkResults).push(parkCode);
        $(parkResults).push(cityName);
        $(parkResults).push(description);
        $(parkResults).push(url);
        $(parkResults).push(directionsURL);

        console.log(parkResults)
  
    }
      

    })

}

function getCamp (){

 var queryURLCamp= "https://developer.nps.gov/api/v1/campgrounds?parkCode=" + parkCode + "&limit="+ limit+ "&api_key="+ parkAPIKey;

 $.ajax({
     url: queryURLCamp,
     method: "GET"
 }).then(function (response){
    var campName=response.name;
    var description=response.description;

    //amenities
    var toilets= response.amenities.toilets;
    var showers= response.amenities.showers;
    var dumpstation= response.amenities.dumpstation;
    var firestovepolicy= response.accessibility.firestovepolicy;

    //accessibility
    var adainfo= response.accessibility.adainfo;
    var wheelchairaccess= response.accessibility.wheelchairaccess;
    var rvinfo= response.accessibility.rvinfo;


 })
}

});

