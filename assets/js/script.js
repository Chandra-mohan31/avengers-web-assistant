
let map, infoWindow;
const infinityStonesAndThanosLocations = {
  "infinityStones": [
    {
      "name": "Time Stone",
      "location": {
        "latitude": 51.5074,
        "longitude": -0.1278,
        "city": "London"
      }
    },
    {
      "name": "Space Stone",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "city": "New York City"
      }
    },
    {
      "name": "Reality Stone",
      "location": {
        "latitude": -33.8651,
        "longitude": 151.2099,
        "city": "Sydney"
      }
    },
    {
      "name": "Mind Stone",
      "location": {
        "latitude": -26.2041,
        "longitude": 28.0473,
        "city": "Johannesburg"
      }
    },
    {
      "name": "Power Stone",
      "location": {
        "latitude": 34.0522,
        "longitude": -118.2437,
        "city": "Los Angeles"
      }
    },
    {
      "name": "Soul Stone",
      "location": {
        "latitude": -22.9068,
        "longitude": -43.1729,
        "city": "Rio de Janeiro"
      }
    }
  ],
  "thanosLocation": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "city": "San Francisco"
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow();
  infinityStonesAndThanosLocations?.infinityStones.forEach(infinityStone => {
    const pos = {
      lat: infinityStone.location.latitude,
      lng: infinityStone.location.longitude,
    };
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: `${infinityStone.name} : ${infinityStone.location.city}`
    });
    marker.setMap(map);
    
  });
  
  //  var thanosMarker = new google.maps.Marker({
    // position: {
    //   lat : infinityStonesAndThanosLocations?.thanosLocation.latitude,
    //   lng: infinityStonesAndThanosLocations?.thanosLocation.longitude
    // },
  //   map: map,
  //   title: 'Thanos Location'
  //  })
  //  thanosMarker.setMap(map);
  //  thanosMarker.setIcon("../assets/images/thanos.jpg");


  var iconSize = new google.maps.Size(40, 40); // Define the desired size of the icon

  var thanosMarker = new google.maps.Marker({
    position: {
      lat : infinityStonesAndThanosLocations?.thanosLocation.latitude,
      lng: infinityStonesAndThanosLocations?.thanosLocation.longitude
    },
    map: map,
    title: `Thanos Location :${infinityStonesAndThanosLocations?.thanosLocation.city}`,
    icon: {
      url: '../assets/images/thanos.jpg',
      scaledSize: iconSize
    }
  });
  thanosMarker.setMap(map);


  const locationButton = document.createElement("button");

  locationButton.textContent = "View your location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);



  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Your Location Found.");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;





