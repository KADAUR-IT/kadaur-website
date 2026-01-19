"use server"
import { getPayload } from 'payload' // ou ton import payload habituel
import config from '@payload-config' // ton config promise

export async function fetchMoreArticles(page: number) {
    const payload = await getPayload({ config })
    
    const res = await payload.find({
        collection: "article",
        where : {
            _status: { equals: "published" }
        },
        limit: 9,
        page: page
    })

    return {docs : res.docs, hasNextPage: res.hasNextPage}
}