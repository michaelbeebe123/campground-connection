var campDetails =
    `<div class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${newCampObject.parkName}</h5>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <ul>
          <li>Description: ${newCampObject.description}</li>
          <li>URL: ${newCampObject.url}</li>
          <li>Weather Overview: ${newCampObject.weatherOverview}</li>
          <li>Directions Overview: ${newCampObject.directionsOverview}</li>
          <h5>Amenities</h5>
            <ul>
                <li>Dump Station: ${newCampObject.dumpStation}</li>
                <li>Cell-Phone Reception: ${newCampObject.cellPhone}</li>
                <li>Toilets: ${newCampObject.toilets}</li>
                <li>Showers: ${newCampObject.showers}</li>
                <li>Internet Connectivity: ${newCampObject.internet}</li>
                <li>Storage: ${newCampObject.storageLocker}</li>
                <li>Camp Store: ${newCampObject.campStore}</li>
                <li>Laundry: ${newCampObject.laundry}</li>
                <li>Fire Stove: ${newCampObject.fireStove}</li>
            </ul>
          <h5>Regulations</h5>
            <ul>
                <li>Overview: ${newCampObject.regulationsOverview}</li>
                <li>URL: ${newCampObject.regulationsURL}</li>
            </ul>
        </ul>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Go Back</button>
          <button type="button" class="btn btn-primary">Add</button>
        </div>
      </div>
    </div>
  </div>`