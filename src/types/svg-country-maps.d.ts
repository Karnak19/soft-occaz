declare module '@svg-country-maps/france.departments' {
  interface Location {
    id: string;
    name: string;
    path: string;
  }

  interface FranceMap {
    viewBox: string;
    locations: Location[];
  }

  const France: FranceMap;
  export default France;
}
