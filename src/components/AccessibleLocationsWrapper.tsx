'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const AccessibleLocationsMap = dynamic(() => import('./AccessibleLocationsMap'), {
    ssr: false,
});

interface Props {
    locations: any[];
}

const MapWrapper: React.FC<Props> = ({ locations }) => {
    return <AccessibleLocationsMap locations={locations} />;
};

export default MapWrapper;
