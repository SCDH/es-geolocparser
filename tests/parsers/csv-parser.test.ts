import { csvParser } from '../../src/es-geolocparser'

describe('Testing CSV parser', () => {

  describe('Parses something correctly', () => {
    const correctCSV = "42.17,-17.42"
    test('Input can be parsed', () =>
      expect(csvParser.parses(correctCSV)).toBe(true))
    test('Correct parsed result', () =>
      expect(csvParser.parseGeoLoc(correctCSV)).toEqual({lat: 42.17, lon: -17.42}))
  })

  describe('Doesn\'t parse "foo bar" correctly', () => {
    const incorrectCSV = "foo bar"
    test('Input cannot be parsed', () =>
      expect(csvParser.parses(incorrectCSV)).toBe(false))
    test('Result is null', () =>
      expect(csvParser.parseGeoLoc(incorrectCSV)).toBeNull())
  })
})
