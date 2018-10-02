import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  state = {
    venues: []
  }

  componentDidMount() {
    this.addVenues()
  }

  loadMap = ()=> {
    addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3QzWGUHpJnCpzT2cItd6A5cahBuBDyI0&callback=initMap")
    window.initMap = this.initMap
  }

  initMap =()=> {
    var map = new window.google.maps.Map
    (document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.9980244},
      zoom: 13
    });

    var infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(myVenue => {
    var contentString = `${myVenue.venue.name}
    ${myVenue.venue.location.address}`;


    var marker = new window.google.maps.Marker({
            position: {lat: myVenue.venue.location.lat,
            lng: myVenue.venue.location.lng},
            map: map,
            title: myVenue.venue.name
    });

    marker.addListener('click', function() {
       infowindow.open(map, marker);
       infowindow.setContent(contentString)
  });
    })
  }

  addVenues = ()=> {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "IUEOXWI5VCY3RMI2ISMBM4AEH54TJM3YBDEZ5KMYLRNLTDR5",
      client_secret: "D0XCWFQ5PZHSK43AJHYZN41ZU30O52BCLBWW5XHUN5MQYEQU",
      query: "food",
      near: "New York",
      v: "20180323"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items
      }, this.loadMap())
    })
    .catch(error => {
      console.log("ERROR" + error)
    })
  }

  render() {
    return (
      <div className="App">
        <div id="map"></div>
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
