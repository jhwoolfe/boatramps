export const getPointsFromBounds = bounds => [
  [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
  [bounds.getSouthEast().lng, bounds.getSouthEast().lat],
  [bounds.getNorthEast().lng, bounds.getNorthEast().lat],
  [bounds.getNorthWest().lng, bounds.getNorthWest().lat],
  [bounds.getSouthWest().lng, bounds.getSouthWest().lat],
]
