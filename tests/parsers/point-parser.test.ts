import { pointParser } from '../../src/es-geolocparser'

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
