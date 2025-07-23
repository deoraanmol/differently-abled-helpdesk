export interface OverpassResult {
    id: number;
    lat: number;
    lon: number;
    center: {
        lat: number;
        lon: number;
    }
    tags?: { [key: string]: string };
}
