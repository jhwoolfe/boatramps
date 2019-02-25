import React, { Component } from "react"
import Chart from "react-apexcharts"
import { connect } from "react-redux"

// Range labels are hardcoded
const rangeKeys = {
  r1: "0 - 49",
  r2: "50 - 199",
  r3: "200 - 525",
}

class Visualisations extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Chart
          options={this.props.materialChartOptions}
          series={this.props.materialSeries}
          type="bar"
          width={500}
          height={320}
        />
        <Chart
          options={this.props.areaChartOptions}
          series={this.props.areaSeries}
          type="bar"
          width={500}
          height={320}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  let { initialData: data, filteredData } = state

  // Check filteredData exists and is not empty...
  if (filteredData && Object.keys(filteredData).length) data = filteredData

  const materials = {}
  const ranges = {
    // Ranges are hardcoded for now
    [rangeKeys.r1]: 0,
    [rangeKeys.r2]: 0,
    [rangeKeys.r3]: 0,
  }

  data.features.forEach(({ properties }) => {
    // Increment the material counts
    if (!materials[properties.material]) {
      materials[properties.material] = 0
    }
    materials[properties.material]++

    // Increment the ranges (just working under the assumption that no ramps exceed 526 in area)
    if (properties.area_ <= 50) ranges[rangeKeys.r1]++
    else if (properties.area_ >= 200) ranges[rangeKeys.r3]++
    else ranges[rangeKeys.r2]++
  })

  return {
    materialChartOptions: {
      chart: {
        id: "ramps-per-material",
      },
      xaxis: {
        categories: Object.keys(materials),
      },
    },
    materialSeries: [
      {
        name: "Materials",
        data: Object.values(materials),
      },
    ],
    areaChartOptions: {
      chart: {
        id: "ramps-per-area",
      },
      xaxis: {
        categories: Object.keys(ranges),
      },
    },
    areaSeries: [
      {
        name: "Materials",
        data: Object.values(ranges),
      },
    ],
  }
}

export default connect(mapStateToProps)(Visualisations)
