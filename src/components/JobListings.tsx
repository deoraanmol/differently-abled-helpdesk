'use client';

import React, {useState} from 'react';

interface Job {
    title: string;
    company: string;
    location: string;
    url: string;
}

interface Props {
    jobs: Job[];
}

const JobListings: React.FC<Props> = ({ jobs }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const jobsPerPage = 5;

    const totalPages = Math.ceil(jobs.length / jobsPerPage);
    const startIndex = (currentPage - 1) * jobsPerPage;
    const currentJobs = jobs.slice(startIndex, startIndex + jobsPerPage);

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                <tr>
                    <th className="border border-gray-300 p-2 text-left">Title</th>
                    <th className="border border-gray-300 p-2 text-left">Company</th>
                    <th className="border border-gray-300 p-2 text-left">Location</th>
                    <th className="border border-gray-300 p-2 text-left">Link</th>
                </tr>
                </thead>
                <tbody>
                {currentJobs.map((job, idx) => (
                    <tr key={idx}>
                        <td className="border border-gray-300 p-2 max-w-[600px] overflow-hidden whitespace-nowrap text-ellipsis">
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {job.title}
                            </a>
                        </td>
                        <td className="border border-gray-300 p-2">{job.company}</td>
                        <td className="border border-gray-300 p-2">{job.location}</td>
                        <td className="border border-gray-300 p-2">
                            <a
                                href={job.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                            >
                                View
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={4} className="border p-2">
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

export default JobListings;
