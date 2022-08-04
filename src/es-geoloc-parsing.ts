import { GeoLocParsing }  from "./geoloc-parsing"
import { csvParser }      from "./parsers/es-csv-parser"
import { pointParser }    from "./parsers/es-point-parser"

export class ESGeoLocParsing extends GeoLocParsing {
  constructor() {
    super([
      csvParser,
      pointParser,
    ])
  }
}
