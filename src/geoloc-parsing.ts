export class GeoLocation {
  lat: number
  lon: number
  constructor(lat: number, lon: number) {
    this.lat = lat
    this.lon = lon
  }
  toArray(): number[] {
    return [this.lat, this.lon]
  }
}

type ParserName = string

export type GeoLocParsingResult = {
  geoLocation: GeoLocation
  parserName: ParserName
}

type ParserCheck    = (input: string) => boolean
type ParserFunction = (input: string) => GeoLocation

export class GeoLocParser {
  name: ParserName
  description: string
  parses: ParserCheck
  private parse: ParserFunction
  parseGeoLoc(input: string): GeoLocation | null {
    if (! this.parses(input)) return null
    return this.parse(input)
  }
  constructor(name: ParserName, desc: string, parses: ParserCheck, parse: ParserFunction) {
    this.name         = name
    this.description  = desc
    this.parses       = parses
    this.parse        = parse
  }
}

export class GeoLocParsingError extends Error {
  input: string
  unableParsers: ParserName[]
  constructor(input: string, unableParsers: ParserName[]) {
    super()
    this.input          = input
    this.unableParsers  = unableParsers
  }
}

export class GeoLocParsing {
  parsers: GeoLocParser[]

  constructor(parsers: GeoLocParser[] = []) {
    this.parsers = parsers
  }

  parseGeoLoc(input: string): GeoLocParsingResult  {
    
    // Try to find a parser that parses the input
    for (const parser of this.parsers) {
      if (parser.parses(input)) {
        const geoLoc = parser.parseGeoLoc(input)
        if (geoLoc) return {geoLocation: geoLoc, parserName: parser.name}
        throw new Error("Invalid reality!")
      }
    }

    // Nothing found
    throw new GeoLocParsingError(input, this.parsers.map(p => p.name))
  }
}
