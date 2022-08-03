import { csvParser, pointParser, ESGeoLocParsing, GeoLocParsingError } from '../src/es-geolocparser'

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

describe('Testing GeoLocParsing API', () => {
  const parsing = new ESGeoLocParsing()

  test('Parsing a CSV location', () => {
    const result = parsing.parseGeoLoc("-17,42.666")
    expect(result).not.toBeNull()
    expect(result.geoLocation).toEqual({lat: -17, lon: 42.666})
    expect(result.parserName).toBe('CSV parser')

  })

  test('Parsing a POINT location', () => {
    const result = parsing.parseGeoLoc("POINT (3.14 1024)")
    expect(result).not.toBeNull()
    expect(result.geoLocation).toEqual({lat: 3.14, lon: 1024})
    expect(result.parserName).toBe('POINT parser')
  })

  test('Parsing invalid data', () => {
    const input = "Nope."
    try {
      parsing.parseGeoLoc(input)
      test('Exception should be thrown by now', fail)
    } catch (e) {
      expect(e).toBeInstanceOf(GeoLocParsingError)
      if (e instanceof GeoLocParsingError) {
        expect(e.input).toBe(input)
        for (const name of parsing.parsers.map(p => p.name)) {
          expect(e.unableParsers).toContain(name)
        }
      } else {
        test('Exception of an other type found', fail)
      }
    }
  })
})
