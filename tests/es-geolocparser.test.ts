import { csvParser, pointParser, ESGeoLocParsing } from '../src/es-geolocparser'

describe('Testing CSV parser', () => {

  test('Parses something correctly', () => {
    const correctCSV = "42.17,-17.42"
    expect(csvParser.parses(correctCSV)).toBe(true)
    expect(csvParser.parseGeoLoc(correctCSV)).toEqual({lat: 42.17, lon: -17.42})
  })

  test('Doesn\'t parse "foo bar" correctly', () => {
    const incorrectCSV = "foo bar"
    expect(csvParser.parses(incorrectCSV)).toBe(false)
    expect(csvParser.parseGeoLoc(incorrectCSV)).toBeNull()
  })
})

describe('Testing POINT parser', () => {

  test('Parses something correctly', () => {
    const correctPoint = "POINT (42.17 -17.42)"
    expect(pointParser.parses(correctPoint)).toBe(true)
    expect(pointParser.parseGeoLoc(correctPoint)).toEqual({lat: 42.17, lon: -17.42})
  })

  test('Doesn\'t parse "foo bar" correctly', () => {
    const incorrectPoint = "foo bar"
    expect(pointParser.parses(incorrectPoint)).toBe(false)
    expect(pointParser.parseGeoLoc(incorrectPoint)).toBeNull()
  })
})

/*
describe('Testing GeoLocParsing API', () => {
  const parsing = new ESGeoLocParsing()

  test('Parsing a CSV location', () => {

  })

  test('Parsing a POINT location', () => {

  })

  test('Parsing invalid data', () => {

  })
})
*/
