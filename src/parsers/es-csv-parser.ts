import { GeoLocation, GeoLocParser } from '../geoloc-parsing'

const csvRx = new RegExp(/^-?\d+(\.\d+(e[+-]\d+)?)?,-?\d+(\.\d+(e[+-]\d+)?)?$/)

export const csvParser = new GeoLocParser(
  "CSV parser",
  "Comma-separated floats",
  input => csvRx.test(input),
  input => {
    const [ lat, lon ] = input.split(",").map(parseFloat)
    return new GeoLocation(lat, lon)
  }
)
