# ESGeoLocParsing - parse geo locations like ElasticSearch

[![Build and test](https://github.com/SCDH/es-geolocparser/actions/workflows/test.yml/badge.svg)](https://github.com/SCDH/es-geolocparser/actions/workflows/test.yml)

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
