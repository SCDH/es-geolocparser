export class GeoLocation {
  lat: number
  lon: number
  constructor(lat: number, lon: number) {
    this.lat = lat
    this.lon = lon
  }
}

type ParserName = string

export type GeoLocParsingResult = {
  geoLocation: GeoLocation
  parserName: ParserName
}

type ParserCheck    = (input: string) => boolean
type ParserFunction = (input: string) => GeoLocation

class GeoLocParser {
  name: ParserName
  description: string
  parses: ParserCheck
  parse: ParserFunction
  constructor(name: ParserName, desc: string, parses: ParserCheck, parse: ParserFunction) {
    this.name         = name
    this.description  = desc
    this.parses       = parses
    this.parse        = parse
  }
}

export class GeoLocParsingError extends Error {
  input: string
  unableParsers: Array<ParserName>
  constructor(input: string, unableParsers: Array<ParserName>) {
    super()
    this.input          = input
    this.unableParsers  = unableParsers
  }
}

class GeoLocParsing {
  parsers: Array<GeoLocParser>

  constructor(parsers: Array<GeoLocParser> = []) {
    this.parsers = parsers
  }

  parseGeoLoc(input: string): GeoLocParsingResult  {
    
    // Try to find a parser that parses the input
    for (const parser of this.parsers) {
      if (parser.parses(input))
        return {
          geoLocation: parser.parse(input),
          parserName: parser.name
        }
    }

    // Nothing found
    throw new GeoLocParsingError(input, this.parsers.map(p => p.name))
  }
}

const csvRx   = new RegExp(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/)
const pointRx = new RegExp(/^POINT \((?<lat>-?\d+(?:\.\d+)?) (?<lon>-?\d+(?:\.\d+)?)\)$/)

const esGeoLocParsers: Array<GeoLocParser> = [

  new GeoLocParser(
    "CSVParser",
    "Comma-separated floats",
    input => csvRx.test(input),
    input => {
      const [ lat, lon ] = input.split(",").map(parseFloat)
      return new GeoLocation(lat, lon)
    }
  ),

  new GeoLocParser(
    "POINT parser",
    "POINT() notation",
    input => pointRx.test(input),
    input => {
      const m = input.match(pointRx)
      if (m && m.groups && m.groups.lat !== null && m.groups.lon !== null)
        return new GeoLocation(
          parseFloat(m.groups.lat),
          parseFloat(m.groups.lon),
        )
      throw new Error("Couldn't match!")
    }
  )
]

export class ESGeoLocParsing extends GeoLocParsing {
  constructor() {
    super(esGeoLocParsers)
  }
}
