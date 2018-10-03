import React, {Component} from 'react';

class MapView extends Component {

  openNav = ()=> {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

  closeNav = ()=> {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
}

  render() {
    return(
        <div className="container">
          <div id="mySidenav" className="sidenav">
            <a className="closebtn" onClick={this.closeNav}>&times;</a>
            <input id="search" className="search" placeholder="search"></input>
          </div>
          <div id="main"className="main">
          <div className="top-bar">
            <span className="menu" onClick={this.openNav}>&#9776;</span>
            <h4 className="header">Neigborhood Map</h4>
          </div>
          <div id="map"></div>
          </div>
        </div>
    )
  }
}

export default MapView;
