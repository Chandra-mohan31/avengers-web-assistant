let api_key = 'AIzaSyDSfh59EbWyWLsuWpqMZo--JeNy0_0Psjs';
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
const avengersData = {
  "avengers": [
    {
      "name": "Iron Man",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "city": "New York City"
      },
      "image": "../assets/images/iron-man-removebg-preview.png"
    },
    {
      "name": "Captain America",
      "location": {
        "latitude": 34.0522,
        "longitude": -118.2437,
        "city": "Los Angeles"
      },
      "image": "../assets/images/captain-america-removebg-preview.png"
    },
    {
      "name": "Thor",
      "location": {
        "latitude": 51.5074,
        "longitude": -0.1278,
        "city": "London"
      },
      "image": "../assets/images/thor-icon-removebg-preview.png"
    },
    {
      "name": "Black Widow",
      "location": {
        "latitude": 55.7558,
        "longitude": 37.6176,
        "city": "Moscow"
      },
      "image": "../assets/images/black-widow-removebg-preview.png"
    },
    {
      "name": "Hulk",
      "location": {
        "latitude": -23.5505,
        "longitude": -46.6333,
        "city": "São Paulo"
      },
      "image": "../assets/images/hulk-icon-removebg-preview.png"
    }
  ]
};





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


//get avengers location or thanos location on click of marker
const getMarkerLocation = (latitude,longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDSfh59EbWyWLsuWpqMZo--JeNz0_0Psjs`;

  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'OK') {
        const results = data.results;
        if (results.length > 0) {
          console.log(results[0].formatted_address);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoding API request failed');
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  
}

// getMarkerLocation(-22.9068,-43.1729);

// Calculate distances between each Infinity Stone and Thanos' location
var distances = infinityStonesAndThanosLocations.infinityStones.map(infinityStone => {
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
var thanosMarker;
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
      
      
    
      google.maps.event.addListener(marker, "click", () => {
        const infowindow = new google.maps.InfoWindow({
          content: "<p>Thanos is: " + Math.round(calculateDistance(thanosLocation.latitude,thanosLocation.longitude,pos.lat,pos.lng)) + " kms away of" + isInDistance?.name + "</p>",
        });
        infowindow.open(map, marker);
      });
    
    }

    marker.setMap(map);
    
    
  });
  

  avengersData?.avengers.map(avenger=>{
    
    const pos = {
      lat: avenger.location.latitude,
      lng: avenger.location.longitude,
    };
    var avengerMarker = new google.maps.Marker({
      position: pos,
      map: map,
      draggable: true,
      title: `${avenger.name}`,
       icon: {
         url: avenger.image,
         scaledSize: new google.maps.Size(40, 40)
       }
    });

   
  
    google.maps.event.addListener(avengerMarker, "click", (event) => {
      const infowindowA = new google.maps.InfoWindow({
        //get location of marker
        content: `<div>${avenger.name}'s Location : Lat : ${event.latLng.lat()} Lng : ${ event.latLng.lng()}</div>`,
      });
      infowindowA.open(map, avengerMarker);

    });

    avengerMarker.setMap(map);
  });
  




  

  thanosMarker = new google.maps.Marker({
    position: {
      lat : infinityStonesAndThanosLocations?.thanosLocation.latitude,
      lng: infinityStonesAndThanosLocations?.thanosLocation.longitude
    },
    map: map,
    draggable: true,
    title: `Thanos Location`,
    icon: {
      url: '../assets/images/thanos.png',
      scaledSize: iconSize
    }
    
  });
  google.maps.event.addListener(thanosMarker, "click", (event) => {
    const infowindowThanos = new google.maps.InfoWindow({
      //get location of marker
      content: `<div>Thanos's Location : Lat : ${event.latLng.lat()} Lng : ${ event.latLng.lng()}</div>`,
    });
    infowindowThanos.open(map, thanosMarker);

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
          var avengersIcon = "../assets/images/avengers.png";
          infoWindow.setContent(`<div><p>Your Location.</p><img src=${avengersIcon} alt="avengers icon" style="width: 50px; height: 50px;" /></div>`);
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

const moveThanos = () => {
  const maxLat = 90;
  const minLat = -90;
  const maxLng = 180;
  const minLng = -180;

  const newLat = Math.random() * (maxLat - minLat) + minLat;
  const newLng = Math.random() * (maxLng - minLng) + minLng;
  
  thanosMarker.setPosition(new google.maps.LatLng(newLat, newLng));
  thanosLocation.latitude = newLat;
  thanosLocation.longitude = newLng;
  let alertMessage = '';
  infinityStonesAndThanosLocations.infinityStones.map(infinityStone => {
    let distance = calculateDistance(
      newLat,
      newLng,
      infinityStone.location.latitude,
      infinityStone.location.longitude
    );
    console.log(distance);
    if(distance < 5000){
      alertMessage = alertMessage + `Alert Avengers Thanos is near to ${infinityStone.name} : Location : ${infinityStone.location.city}\n`;

    }
    
  
  });
  if(alertMessage.length != 0){
    alert(alertMessage);
  }

   

  

}


//move thanos check every 20sec
//  setInterval(moveThanos,20000);


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





