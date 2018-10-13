import React, {Component} from 'react';

class MapView extends Component {

  render() {
    return(
      <div className="map-container">
        <section id="map" className="map" role="application" tabIndex="-1"></section>
      </div>
    )
  }
}

export default MapView;
