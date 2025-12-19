import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import { getPayload } from 'payload'
import payloadConfig from '@/payload.config'

export default async function Page({ params }: { params: Promise<{id: string}> }) {
  const {id} = await params;
  const payload = await getPayload({ config: payloadConfig })

  const page = await payload.findByID({
    collection: 'mails',
    id: id,
    draft: true,
  })

  return (
    <>
      <RefreshRouteOnSave />
      <div dangerouslySetInnerHTML={{__html: page.htmlContent}}></div>
    </>
  )
}