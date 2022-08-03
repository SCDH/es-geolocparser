import { GeoLocation } from '../src/es-geolocparser'

describe('Basics', () => {

  test('GeoLocation creation', () => {
    expect(new GeoLocation(42.17, 17.42)).toEqual({lat: 42.17, lon: 17.42})
  })

  test('Arrayfication of a GeoLocation', () => {
    expect(new GeoLocation(17.42, 42.17).toArray()).toEqual([17.42, 42.17])
  })
})
