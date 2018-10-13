import React, { Component } from 'react';
import MapView from './MapView';
import ListView from './ListView';
import {createFilter} from 'react-search-input';
import './App.css';


var markers = [];
var infoWindows = [];

class App extends Component {

  constructor(props) {
    super(props);
    this.addMarkers = this.addMarkers.bind(this);
    this.state = {
      markers: [],
      infoWindows: [],
      places: [],
      map: {},
      query: '',
      successfulRequest: true
    }
  }

  componentDidMount() {
    this.loadMapApi()
  }
//
  loadMapApi = ()=> {
    addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3QzWGUHpJnCpzT2cItd6A5cahBuBDyI0&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = ()=> {
    var map = new window.google.maps.Map
    (document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 14
    });
    this.addMarkers(map);
    this.setState({map});
}

addMarkers = (map)=> {
  var markersRequest = this.createCORSRequest('GET',"https://api.foursquare.com/v2/venues/search?ll=40.7413549,-73.9980244&query=restaurant&radius=2500&client_id=IUEOXWI5VCY3RMI2ISMBM4AEH54TJM3YBDEZ5KMYLRNLTDR5&client_secret=D0XCWFQ5PZHSK43AJHYZN41ZU30O52BCLBWW5XHUN5MQYEQU&v=20180323&limit=20");

  markersRequest.onload = () => {
    this.setState({ places: JSON.parse(markersRequest.responseText).response.venues.filter(createFilter(this.state.query, ['name', 'location.address']))});
    markers.forEach(m => { m.setMap(null) });
    // Clearing the markers and the infoWindows arrays so that the old
    // objects wouldn't be stacked below the new objects.
    this.state.places.map(place => {
      var infoContent = `<div id="${place.name}">
                           <strong>${place.name}</strong>
                         </div>
                         <div>${place.location.address}</div>
                         <div> ${place.location.formattedAddress[1]}</div>`

      var infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
        name: place.name
      });

      var marker = new window.google.maps.Marker({
        map: map,
        position: place.location,
        animation: window.google.maps.Animation.DROP,
        name : place.name
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {marker.setAnimation(null);}, 800)
        }
      });
      marker.addListener('click', function() {
        infoWindow.open(map, marker);
  });
      markers.push(marker);
      infoWindows.push(infoWindow);
      this.setState({markers});
      this.setState({infoWindows});
    })
  };
  markersRequest.onerror = () => {
    this.setState({successfulRequest: false});
  }
  markersRequest.send();
}

// Used the tutorial in https://www.html5rocks.com/en/tutorials/cors/ to create a CORS request function.
createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest !== "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {
    // Otherwise, alert the user that CORS is not supported by their browser.
    xhr = null;
    alert("CORS Requests are not supported by your browser please switch to another browser to have access to the website.");
  }
  return xhr;
}

// queryHandler takes the query from the ListView sets the state and reloads the markers.
handleQuery = (query)=> {
  this.setState({query});
  this.addMarkers(this.state.map);
}

  render() {
    const {map, places, successfulRequest} = this.state;
    return (
      <div className="container">
        <div className="top-bar">
          <h4 className="header">Restaurant Map</h4>
        </div>
        <MapView/>
        <ListView
            addQuery={(query) => {this.handleQuery(query)}}
            markers={markers}
            places={places}
            infoWindows={infoWindows}
            map={map}
        />
      </div>
    );
  }
}

function addScript(url) {
    var index = window.document.getElementsByTagName('script')[0]
    var script = window.document.createElement('script')
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

export default App;
