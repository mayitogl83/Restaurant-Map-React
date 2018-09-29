import React, { Component } from 'react';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.loadMap()
  }

  loadMap = ()=> {
    addScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC3QzWGUHpJnCpzT2cItd6A5cahBuBDyI0&callback=initMap")
    window.initMap = this.initMap
  }

  initMap =()=> {
    var map = new window.google.maps.Map
    (document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 13
    });
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
