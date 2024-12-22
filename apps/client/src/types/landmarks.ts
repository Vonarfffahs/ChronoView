export interface Landmark {
  name: string;
  location: string;
  coordinates: {
    type: string;
    coordinates: [number, number];
  };
}
