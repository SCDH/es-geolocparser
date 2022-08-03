import { csvParser } from '../../src/es-geolocparser'

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
