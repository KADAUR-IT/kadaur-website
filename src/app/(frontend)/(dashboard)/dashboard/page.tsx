import { get } from "http";
import DashboardClientPage from "./page.client";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const key = "./src/keys/kadaurlocal-c97af6cb3d98.json";

const client = new BetaAnalyticsDataClient({
    keyFile: key,
})

export default async function DashboardPage()
{
    let metrics = null;

    async function getTraffic()
    {
        const [response] = await client.runReport({
            property: "properties/510175679",
            dateRanges: [{
                startDate: "today",
                endDate: "today"
            }],
            metrics: [
                {name: "activeUsers"},
                {name: "sessions"},
                {name: "screenPageViews"},
        ],
            
        })

        if(!response || !response.rows) return;

        console.log(response.rows);

        response.rows.forEach((row) => {
            const [activeUsers, sessions, screenPageViews] = row.metricValues.map(v => v.value);

            console.log("metrics" , row.metricValues.map(v => v.value));

            return { activeUsers, sessions, screenPageViews };
        });
    }

    metrics = await getTraffic();

    console.log('render');

    return(
        <>
            <DashboardClientPage metrics={metrics} />
        </>
    )
}