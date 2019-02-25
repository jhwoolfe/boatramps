import React, { Component } from "react"
import "./App.css"
import BoatMap from "./BoatMap.js"
import "leaflet/dist/leaflet.css"
import Visualisations from "./Visualisations.js"
import data from "./data/boat_ramps.js"

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="App">
        <div className="mapContainer">
          <BoatMap data={data} />
        </div>
        <div className="visualisationsContainer">
          <Visualisations />
        </div>
      </div>
    )
  }
}

export default App
