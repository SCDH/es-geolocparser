import { GeoLocParsingError } from '../src/geoloc-parsing'
import { ESGeoLocParsing }    from '../src/es-geoloc-parsing'

describe('Testing GeoLocParsing API', () => {
  const parsing = new ESGeoLocParsing()

  describe('Parsing a CSV location', () => {
    const result = parsing.parseGeoLoc("-17,42.666")
    test('Got a result', () =>
      expect(result).not.toBeNull())
    test('Correct GeoLoc', () =>
      expect(result.geoLocation).toEqual({lat: -17, lon: 42.666}))
    test('Correct parser name', () =>
      expect(result.parserName).toBe('CSV parser'))

  })

  describe('Parsing a POINT location', () => {
    const result = parsing.parseGeoLoc("POINT (3.14 1024)")
    test('Got a result', () =>
      expect(result).not.toBeNull())
    test('Correct GeoLoc', () =>
      expect(result.geoLocation).toEqual({lat: 3.14, lon: 1024}))
    test('Correct parser name', () =>
      expect(result.parserName).toBe('POINT parser'))
  })

  describe('Parsing invalid data', () => {
    const input = "Nope."
    try {
      parsing.parseGeoLoc(input)
      test('Exception should be thrown by now', fail)
    } catch (e) {
      test('Correct error type', () =>
        expect(e).toBeInstanceOf(GeoLocParsingError))
      if (e instanceof GeoLocParsingError) {
        const glpe: GeoLocParsingError = e
        test('Correct error input', () =>
          expect(glpe.input).toBe(input))
        for (const name of parsing.parsers.map(p => p.name)) {
          test(`Contains name ${name}`, () =>
            expect(glpe.unableParsers).toContain(name))
        }
      } else {
        test('Exception of an other type found', fail)
      }
    }
  })
})
