// IMPORTING THE AJAX RESPONSES THAT WILL BE USED TO MAKE HTML ON THE FLY
require("./index");

var campName            = response.name;
var description         = response.description;

//amenities
var toilets             = response.amenities.toilets;
var showers             = response.amenities.showers;
var dumpstation         = response.amenities.dumpstation;
var firestovepolicy     = response.accessibility.firestovepolicy;

//accessibility
var adainfo             = response.accessibility.adainfo;
var wheelchairaccess    = response.accessibility.wheelchairaccess;
var rvinfo              = response.accessibility.rvinfo;

// ==================================================================

{/* <div>Park Name, State</div>
<div>Designation</div>
<div>Description</div>
<div>Direction Link</div><div>Park Website</div>
<div>List of Campgrounds</div> */}

$("#").html("<p>" + var + "</p>");
$("#").html("<p>" + var + "</p>"); 
$("#").html("<p>" + var + "</p>");
$("#").html("<p>" + var + "</p>");
$("#").html("<p>" + var + "</p>");