import * as fc from 'fast-check'
import { csvParser } from '../../src/parsers/es-csv-parser'

function generateCSVData(...numbers: number[]): string {
  return numbers.map(String).join(',')
}

describe('Property tests for ES CSV parsing', () => {

  test('Correct parsing of CSV strings of numbers', () => {
    fc.assert(fc.property(
      fc.tuple(
        fc.float({noDefaultInfinity: true, noNaN: true}),
        fc.float({noDefaultInfinity: true, noNaN: true}),
      ),
      ([lat, lon]) => {
        const csv     = generateCSVData(lat, lon)
        const geoLoc  = csvParser.parseGeoLoc(csv)
        return    geoLoc != null
              &&  geoLoc.lat == lat
              &&  geoLoc.lon == lon
      }
    ))
  })
})
