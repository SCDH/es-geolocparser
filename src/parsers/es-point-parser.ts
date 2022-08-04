import { GeoLocation, GeoLocParser } from "../geoloc-parsing"

const pointRx = new RegExp(/^POINT \((?<lat>-?\d+(?:\.\d+(e[+-]\d+)?)?) (?<lon>-?\d+(?:\.\d+)?(e[+-]\d+)?)\)$/)

export const pointParser = new GeoLocParser(
  "POINT parser",
  "POINT() notation",
  input => pointRx.test(input),
  input => {
    const m = input.match(pointRx)
    if (m && m.groups && m.groups.lat !== null && m.groups.lon !== null)
      return new GeoLocation(
        parseFloat(m.groups.lat),
        parseFloat(m.groups.lon),
      )
    throw new Error("Couldn't match!")
  }
)
