# ESGeoLocParsing - parse geo locations like ElasticSearch

## Setup

```bash
$ npm install
```

## Usage

```typescript
import { ESGeoLocParsing } from 'es-geolocparsing'

const input         = "42.17,17.42"
const parsingResult = new ESGeoLocParsing().parseGeoLoc(input)

console.log(parsingResult.parserName + " did it!")
const geoLoc = parsingResult.geoLocation

// geoLoc.lat, geoLoc.lon, geoLoc.toArray()
```

## Authors and License

(c) 2022 Mirko Westermeier, Service Center for Digital Humanities, University of Muenster

Published under the MIT license. See [LICENSE](LICENSE) for details.
