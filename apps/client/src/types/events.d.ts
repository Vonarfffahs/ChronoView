export interface Event {
    name: string;
    description: string;
    date: string;
    type: string;
    coordinates: {
        type: string;
        coordinates: [number, number];
    };
}
