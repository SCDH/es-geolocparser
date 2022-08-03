import { pointParser } from '../../src/es-geolocparser'

describe('Testing POINT parser', () => {

  describe('Parses something correctly', () => {
    const correctPoint = "POINT (42.17 -17.42)"
    test('Input can be parsed', () =>
      expect(pointParser.parses(correctPoint)).toBe(true))
    test('Correct parsed result', () =>
      expect(pointParser.parseGeoLoc(correctPoint)).toEqual({lat: 42.17, lon: -17.42}))
  })

  describe('Doesn\'t parse "foo bar" correctly', () => {
    const incorrectPoint = "foo bar"
    test('Input cannot be parsed', () =>
      expect(pointParser.parses(incorrectPoint)).toBe(false))
    test('Result is null', () =>
      expect(pointParser.parseGeoLoc(incorrectPoint)).toBeNull())
  })
})
