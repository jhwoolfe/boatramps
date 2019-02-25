import React from "react"
import { Map, TileLayer, GeoJSON } from "react-leaflet"
import turf from "turf"
import { connect } from "react-redux"
import { updateBounds } from "./actions.js"

class BoatMap extends React.Component {
  constructor(props) {
    super(props)
    const { data } = props
    this.geoKey = 0

    // Get the center of the geo data
    const [long, lat] = turf.center(
      turf.featureCollection(data.features)
    ).geometry.coordinates

    this.state = {
      center: [lat, long],
      data,
      zoom: 13,
    }
  }

  handleMoveEnd = () => {
    const bounds = this.refs.map.leafletElement.getBounds()
    this.props.dispatch(updateBounds(bounds))
  }

  render() {
    return (
      <Map
        center={this.state.center}
        ref="map"
        zoom={this.state.zoom}
        onMoveend={this.handleMoveEnd}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          key={this.geoKey++}
          data={this.state.data}
          style={{ color: "#006400", weight: 25, opacity: 0.65 }}
        />
      </Map>
    )
  }
}

export default connect()(BoatMap)
