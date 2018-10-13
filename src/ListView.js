import React, {Component} from 'react';
import SortBy from 'sort-by';


class ListView extends Component {

  constructor(props) {
    super(props);
    this.showMarker = this.showMarker.bind(this);
    this.state = {
      query: ''
    };
  }

  showMarker = (e)=> {
    this.props.markers.map(marker => {
      if (e.target.value === marker.name) {
        this.props.infoWindows.map(infoWindow => {
          if (marker.name === infoWindow.name) {
            infoWindow.open(this.props.map, marker);
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
              setTimeout(() => {marker.setAnimation(null);}, 800)
            }
          }
        })
      }
    })
  }

  render() {
    const {places, addQuery} = this.props;

    places.sort(SortBy('name'));
    return(
      <div id="mySidenav" className="sidenav">
        <div id="filter-field" className="filter-field">
          <div className="list-header">Restaurant List</div>
          <input id="filter" className="filter"
            type="text"
            placeholder="Filter"
            value={ this.state.query }
            onChange={(event) => {
              this.setState({ query: event.target.value });
              addQuery(event.target.value)}
            }
            role="search"
            aria-labelledby="Filter"
          />
        </div>
        <ul id="list">
          {places ? (
              places.map(place => {
                return (
            <li key={place.id}>
              <button
              onClick={this.showMarker}
              value={place.name}>{place.name}</button>
            </li>
          )
       })
     ) : (
       <li>Loading</li>
     )}
        </ul>
      </div>
    )
  }
}


export default ListView;
