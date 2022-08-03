import { ESGeoLocParsing, GeoLocParsingError } from '../src/es-geolocparser'

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
