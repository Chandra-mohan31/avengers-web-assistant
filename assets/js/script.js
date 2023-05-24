
let map, infoWindow;
const infinityStonesAndThanosLocations = {
  "infinityStones": [
    {
      "name": "Time Stone",
      "location": {
        "latitude": 51.5074,
        "longitude": -0.1278,
        "city": "London"
      },
      "image":"../assets/images/time-stone.png"
    },
    {
      "name": "Space Stone",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "city": "New York City"
      },
      "image":"../assets/images/space-stone.png"

    },
    {
      "name": "Reality Stone",
      "location": {
        "latitude": -33.8651,
        "longitude": 151.2099,
        "city": "Sydney"
      },
      "image":"../assets/images/reality-stone.png"

    },
    {
      "name": "Mind Stone",
      "location": {
        "latitude": -26.2041,
        "longitude": 28.0473,
        "city": "Johannesburg"
      },
      "image":"../assets/images/mind-stone.png"

    },
    {
      "name": "Power Stone",
      "location": {
        "latitude": 34.0522,
        "longitude": -118.2437,
        "city": "Los Angeles"
      },
      "image":"../assets/images/power-stone.png"

    },
    {
      "name": "Soul Stone",
      "location": {
        "latitude": -22.9068,
        "longitude": -43.1729,
        "city": "Rio de Janeiro"
      },
      "image":"../assets/images/soul-stone.png"

    }
  ],
  "thanosLocation": {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "city": "San Francisco"
  }
}




const thanosLocation = infinityStonesAndThanosLocations.thanosLocation;

// Function to calculate the distance between two points using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
    Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

// Calculate distances between each Infinity Stone and Thanos' location
const distances = infinityStonesAndThanosLocations.infinityStones.map(infinityStone => {
  const distance = calculateDistance(
    thanosLocation.latitude,
    thanosLocation.longitude,
    infinityStone.location.latitude,
    infinityStone.location.longitude
  );
  return {
    name: infinityStone.name,
    distance: distance
  };
});

// Sort the distances in ascending order
distances.sort((a, b) => a.distance - b.distance);

// Get the three nearest locations
// const nearestLocations = distances.slice(0, 3);

// center lat long - { lat: -34.397, lng: 150.644 },
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: thanosLocation?.latitude, lng: thanosLocation?.longitude },
    zoom: 3,
  });
  var iconSize = new google.maps.Size(40, 40); // Define the desired size of the icon
  infoWindow = new google.maps.InfoWindow();
  infinityStonesAndThanosLocations?.infinityStones.forEach(infinityStone => {
    const pos = {
      lat: infinityStone.location.latitude,
      lng: infinityStone.location.longitude,
    };
    var marker = new google.maps.Marker({
      position: pos,
      map: map,
      title: `${infinityStone.name} : ${infinityStone.location.city}`,
      icon: {
        url: infinityStone.image,
        scaledSize: iconSize
      }
    });
    const isInDistance = distances.find(distanceStone => distanceStone.name === infinityStone.name);
    console.log(isInDistance);
    if(isInDistance){
      // marker.setIcon({
        
      //   scale: 8
      // });
      const infowindow = new google.maps.InfoWindow({
        content: "<p>Thanos is: " + Math.round(isInDistance?.distance) + " kms away of" + isInDistance?.name + "</p>",
      });
    
      google.maps.event.addListener(marker, "click", () => {
        infowindow.open(map, marker);
      });
    
    }

    marker.setMap(map);
    
    
  });
  
  


  

  var thanosMarker = new google.maps.Marker({
    position: {
      lat : infinityStonesAndThanosLocations?.thanosLocation.latitude,
      lng: infinityStonesAndThanosLocations?.thanosLocation.longitude
    },
    map: map,
    title: `Thanos Location :${infinityStonesAndThanosLocations?.thanosLocation.city}`,
    icon: {
      url: '../assets/images/thanos.png',
      scaledSize: iconSize
    }
  });
  thanosMarker.setMap(map);


  const locationButton = document.createElement("button");

  locationButton.textContent = "View your location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  const toggleSatelliteView = document.createElement("button");
  toggleSatelliteView.textContent ="Toggle Satellite View";
  toggleSatelliteView.classList.add("custom-map-control-button");

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(toggleSatelliteView);
  var satelliteView = false;

  toggleSatelliteView.addEventListener('click',()=>{
    if(satelliteView){
      satelliteView = false;
      map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    }else{
      satelliteView = true;
      map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    }
  })
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





