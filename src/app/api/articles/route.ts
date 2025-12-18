import { NextResponse } from "next/server";
import { getPayload } from "payload";
import configPromise from "@payload-config";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const payload = await getPayload({ config: configPromise });
    const res = await payload.find({
        collection: "article",
        where: search ? { title: { contains: search } } : {},
        limit: 9,
        sort: "-createdAt"
    });
    return NextResponse.json({ articles: res.docs });
}