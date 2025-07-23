'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Location } from "@/types/Location";

const AccessibleLocationsMap = dynamic(() => import('./AccessibleLocationsMap'), {
    ssr: false,
});

interface Props {
    locations: Location[];
}

const MapWrapper: React.FC<Props> = ({ locations }) => {
    return <AccessibleLocationsMap locations={locations} />;
};

export default MapWrapper;
