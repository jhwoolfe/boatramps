import initialData from "./data/boat_ramps.js"
import { getPointsFromBounds } from "./utils.js"
import turf from "turf"
const initialState = {
  initialData,
  filteredData: {},
}

export default (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_BOUNDS":
      const points = getPointsFromBounds(action.bounds)
      const turfPolygon = turf.polygon([points])
      return {
        ...state,
        filteredData: {
          ...state.initialData,
          features: state.initialData.features.filter(
            f => f && Boolean(turf.intersect(f, turfPolygon))
          ),
        },
      }
    default:
      return initialState
  }
}
