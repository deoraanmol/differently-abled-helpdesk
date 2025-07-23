// todo anmol - make the searchTerms a dropdown in Dashboard (terms should focus on differently-abled)
import { Job } from "@/types/Job";

export async function fetchDisabilityJobs(searchTerm = 'disability') {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    const encodedSearch = encodeURIComponent(searchTerm);
    const url = `https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=${appId}&app_key=${appKey}&what=${encodedSearch}&results_per_page=10&content-type=application/json`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`[Adzuna API] Failed with status ${res.status}`);

        const data = await res.json();
        return data.results.map((job: Job) => ({
            title: job.title,
            company: job.company.display_name,
            location: job.location.display_name,
            url: job.redirect_url,
        }));
    } catch (err) {
        console.error("[Adzuna API] Error:", err);
        return [
            { title: 'Disability Support Worker', company: 'CareCo', location: 'Sydney', url: '#' },
            { title: 'Accessibility Consultant', company: 'Access Inc.', location: 'Melbourne', url: '#' },
        ];
    }
}
