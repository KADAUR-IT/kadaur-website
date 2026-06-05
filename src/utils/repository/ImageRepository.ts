import { Media } from '@/payload-types'
import payloadConfig from '@/payload.config'
import { getPayload, Payload } from 'payload'

export interface ImageRepository {
  findById(id: string): Promise<Media>
  findManyById(ids: string[]): Promise<Media[]>
  findAll(): Promise<Media[]>
}

export class PayloadImageRepository implements ImageRepository {
  private payload

  constructor(payload: Payload) {
    this.payload = payload
  }

  async findById(id: string): Promise<Media> {
    const res = await this.payload.findByID({
      collection: 'media',
      id: id,
    })

    return res
  }

  async findManyById(ids: string[]): Promise<Media[]> {
    const res = await this.payload.find({
      collection: 'media',
      where: {
        id: { in: ids },
      },
    })

    return res.docs
  }

  async findAll(): Promise<Media[]> {
    const res = await this.payload.find({
      collection: 'media',
    })

    return res.docs || []
  }
}
