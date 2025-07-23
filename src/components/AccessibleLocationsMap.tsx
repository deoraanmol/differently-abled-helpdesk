'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import React from 'react';
import { Location } from "@/types/Location";
import { LatLngExpression } from "leaflet";

interface Props {
    locations: Location[];
}

const AccessibleLocationsMap: React.FC<Props> = ({ locations }) => {
    const center: LatLngExpression = { lat: -33.8688, lng: 151.2093 }; // Sydney coordinates

    return (
        <div className="h-[400px] rounded shadow overflow-hidden">
            <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {locations
                    .map((loc) => {
                        const lat = loc.lat ?? loc.center?.lat;
                        const lon = loc.lon ?? loc.center?.lon;

                        if (lat === undefined || lon === undefined) return null;

                        return (
                            <Marker key={loc.id} position={[lat, lon]}>
                                <Popup>
                                    {loc.tags?.name || 'Accessible Location'}<br />
                                    Wheelchair: {loc.tags?.wheelchair || 'unknown'}
                                </Popup>
                            </Marker>
                        );
                    })
                }

            </MapContainer>
        </div>
    );
};

export default AccessibleLocationsMap;
