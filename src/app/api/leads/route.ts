import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'

export async function POST(req: Request) {
  const payload = await getPayload({ config: payloadConfig })

  try {
    const db = await payload.create({
      collection: 'leads',
      data: await req.json(),
    })

    return Response.json({ message: 'Enregistrement réussi!' }, { status: 200 })
  } catch (error) {
    return Response.json({ message: 'Une erreur est survenue', error }, { status: 500 })
  }
}
