import { csvParser } from '../../src/parsers/es-csv-parser'

describe('Testing CSV parser', () => {

  describe('Parses something correctly', () => {
    const correctCSV = "42,17"
    test('Input can be parsed', () =>
      expect(csvParser.parses(correctCSV)).toBe(true))
    test('Correct parsed result', () =>
      expect(csvParser.parseGeoLoc(correctCSV)).toEqual({lat: 42, lon: 17}))
  })

  describe('Doesn\'t parse "foo bar" correctly', () => {
    const incorrectCSV = "foo bar"
    test('Input cannot be parsed', () =>
      expect(csvParser.parses(incorrectCSV)).toBe(false))
    test('Result is null', () =>
      expect(csvParser.parseGeoLoc(incorrectCSV)).toBeNull())
  })
})
