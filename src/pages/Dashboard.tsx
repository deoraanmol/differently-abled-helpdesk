import React from 'react'
import {fetchAccessibleLocations, fetchWheelchairToilets} from "@/lib/apis/overpass-apis";
import {fetchDisabilityJobs} from "@/lib/apis/jobsearch-api";
import AccessibleLocationsWrapper from "@/components/AccessibleLocationsWrapper";
import JobListings from "@/components/JobListings";
import WheelchairToilets from "@/components/WheelchairToilets";
import LatestArticles from "@/components/LatestArticles";
import {fetchLatestAccessibilityArticles} from "@/lib/apis/news-api";

const Dashboard = async () => {
    const [locations, jobs, places, articles] = await Promise.all([
        fetchAccessibleLocations(),
        fetchDisabilityJobs(),
        fetchWheelchairToilets(),
        fetchLatestAccessibilityArticles()
    ]);
    return (
        <main className="p-6">
            <h1 className="text-3xl font-bold mb-6">Disability Accessibility Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-2xl mb-4">Job Listings (from Adzuna)</h2>
                <JobListings jobs={jobs} />
            </section>

            <section className="mb-8">
                <h2 className="text-2xl mb-4">Accessible Toilets</h2>
                {places && places.length > 0 && <WheelchairToilets places={places}/>}
            </section>

            <section className="mb-8">
                <h2 className="text-2xl mb-4">Accessible Locations</h2>
                {locations?.length > 0 && <AccessibleLocationsWrapper locations={locations}/>}
            </section>

            <section className="mb-8">
                <h2 className="text-2xl mb-4">Latest Articles</h2>
                <LatestArticles articles={articles}/>
            </section>
        </main>
    )
}

export default Dashboard
