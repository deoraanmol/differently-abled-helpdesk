'use client';

import React, { useState } from 'react';

interface Place {
    id: number;
    name?: string;
    lat: number;
    lon: number;
    opening_hours?: string | null;
    unisex?: string | null;
    wheelchair?: string | null;
    note?: string | null;
}

interface Props {
    places: Place[];
}

const WheelchairToilets: React.FC<Props> = ({ places }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const placesPerPage = 5;

    const totalPages = Math.ceil(places.length / placesPerPage);
    const startIndex = (currentPage - 1) * placesPerPage;
    const currentPlaces = places.slice(startIndex, startIndex + placesPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2 text-left">Name</th>
                    <th className="border border-gray-300 p-2 text-left">Opening Hours</th>
                    <th className="border border-gray-300 p-2 text-left">Unisex</th>
                    <th className="border border-gray-300 p-2 text-left">Wheelchair</th>
                    <th className="border border-gray-300 p-2 text-left">Note</th>
                </tr>
                </thead>
                <tbody>
                {currentPlaces.map((place) => {
                    const gmapsLink = `https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lon}`;
                    return (
                        <tr key={place.id}>
                            <td className="border border-gray-300 p-2">
                                <a
                                    href={gmapsLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    {place.name || 'Unnamed'}
                                </a>
                            </td>
                            <td className="border border-gray-300 p-2">{place.opening_hours || 'N/A'}</td>
                            <td className="border border-gray-300 p-2">
                                {place.unisex ? (place.unisex.toLowerCase() === 'yes' ? 'Yes' : place.unisex) : 'N/A'}
                            </td>
                            <td className="border border-gray-300 p-2">
                                {place.wheelchair ? (place.wheelchair.toLowerCase() === 'yes' ? 'Yes' : place.wheelchair) : 'N/A'}
                            </td>
                            <td className="border border-gray-300 p-2">{place.note || 'N/A'}</td>
                        </tr>
                    );
                })}
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={5} className="border border-gray-300 p-2">
                        <div className="flex justify-between items-center">
                            <button
                                onClick={handlePrev}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <span>
            Page {currentPage} of {totalPages}
          </span>
                            <button
                                onClick={handleNext}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default WheelchairToilets;
