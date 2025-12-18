import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import payloadConfig from "@/payload.config";
import { getServerSideURL } from "@/utils/getURL";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const payload = await getPayload({config : payloadConfig})

    const pages = await payload.find({
        collection: "pages",
        limit: 0,
        where: {}
    })

    const url = getServerSideURL()

    return [
        ...pages.docs.map( ({slug, updatedAt}: {slug: string | null | undefined, updatedAt: string}) => ({
            url: `${url}/${slug}`,
            lastModified: new Date(updatedAt)
        }) )
    ]
}