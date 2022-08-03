import { ESGeoLocParsing } from "./es-geolocparser";

const esGLP = new ESGeoLocParsing()

console.log(esGLP.parseGeoLoc("POINT (42 17.42)"))
