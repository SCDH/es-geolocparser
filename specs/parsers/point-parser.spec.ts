import * as fc from 'fast-check'
import { pointParser } from '../../src/parsers/es-point-parser'

function generatePOINTData(...numbers: number[]): string {
  return "POINT (" + numbers.map(String).join(' ') + ")"
}

describe('Property tests for ES POINT parsing', () => {

  test('Correct parsing of POINT strings of numbers', () => {
    fc.assert(fc.property(
      fc.tuple(
        fc.float({noDefaultInfinity: true, noNaN: true}),
        fc.float({noDefaultInfinity: true, noNaN: true}),
      ),
      ([lat, lon]) => {
        const point   = generatePOINTData(lat, lon)
        const geoLoc  = pointParser.parseGeoLoc(point)
        return    geoLoc != null
              &&  geoLoc.lat == lat
              &&  geoLoc.lon == lon
      }
    ))
  })
})
