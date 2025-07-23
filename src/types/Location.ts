export interface Location {
    id: number;
    lat: number;
    lon: number;
    center: {
        lat: number;
        lon: number;
    }
    tags?: { [key: string]: string };
}