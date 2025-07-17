// todo anmol - make the city selectable from Dashboard
export async function fetchAccessibleLocations(city = 'Sydney') {
    // Overpass API query for wheelchair=yes POIs in city bounding box
    // For simplicity, let's fetch a small bounding box around Sydney
    const query = `
    [out:json][timeout:25];
    area["name"="${city}"]->.searchArea;
    (
      node["wheelchair"="yes"](area.searchArea);
      way["wheelchair"="yes"](area.searchArea);
      relation["wheelchair"="yes"](area.searchArea);
    );
    out center;
  `;

    const url = 'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query);
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch accessible locations');
    const data = await res.json();
    return data.elements; // array of nodes/ways/relations
}

const getLastNDates = (lastNDays: number) => {
    return Array.from({ length: lastNDays }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - i - 30);
        return d.toISOString().split('T')[0]; // 'YYYY-MM-DD'
    });
}

export const fetchCountForDate = async (date: string) => {
    const query = `
                      [out:json][timeout:25];
                      (
                        node["wheelchair"="yes"](newer:"${date}T00:00:00Z")( -44.0, 112.0, -10.0, 154.0 );
                      );
                      out count;
                    `;


    const url = 'https://overpass-api.de/api/interpreter';

    const res = await fetch(url, {
        method: 'POST',
        body: query,
    });

    const contentType = res.headers.get("content-type");

    if (!res.ok || !contentType?.includes("application/json")) {
        const text = await res.text(); // log raw HTML error page
        console.error("[Overpass API Error]", res.status, text.slice(0, 300));
        throw new Error(`[Overpass] Invalid response. Status: ${res.status}`);
    }

    const data = await res.json();
    console.log("here0: "+JSON.stringify(data))

    return data?.elements?.[0]?.tags?.total || 0;
};


export async function fetchAccessibilityTrends(days: number = 30) {
    const dates = getLastNDates(2);
    const res = await Promise.all(
        dates.map(async date => {
            const count = await fetchCountForDate(date);
            return {date, accessibleLocations: count};
        })
    );
    console.log("here: "+JSON.stringify(res))
    return res;
}

export async function fetchWheelchairToilets(lat = -34.0700, lon = 150.7900, radius = 1000) {
    const query = `
    [out:json][timeout:25];
    (
      node(around:${radius},${lat},${lon})[amenity=toilets][wheelchair=yes];
      way(around:${radius},${lat},${lon})[amenity=toilets][wheelchair=yes];
      relation(around:${radius},${lat},${lon})[amenity=toilets][wheelchair=yes];
    );
    out center;
  `;

    const url = 'https://overpass-api.de/api/interpreter';

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `data=${encodeURIComponent(query)}`,
        });
        if (!res.ok) throw new Error('Failed to fetch wheelchair places');

        const data = await res.json();

        const places = data.elements.map((el: any, index: number) => ({
            id: el.id,
            name: el.tags?.name || `Toilet ${index+1}`,
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
            opening_hours: el.tags?.opening_hours || null,
            unisex: el.tags?.unisex || null,
            wheelchair: el.tags?.wheelchair || null,
            note: el.tags?.note || null,
        }));

        return places;
    } catch (err) {
        console.error(err);
        return [];
    }
}
