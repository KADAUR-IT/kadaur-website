import { Media } from '@/payload-types'
import { ImageRepository } from '../repository/ImageRepository'

type ImageCacheEntry<T> = {
  value: T
  expiresAt: number
}

export class ImageCacheProxy implements ImageRepository {
  private cache = new Map<string, ImageCacheEntry<Media>>()
  private allPhotosCache: ImageCacheEntry<Media[]> | null = null

  constructor(
    private target: ImageRepository,
    private ttlMs = 24 * 60 * 60 * 1000,
  ) {}

  private isExpired<T>(entry: ImageCacheEntry<T> | null | undefined): boolean {
    return !entry || Date.now() > entry.expiresAt
  }
  private createEntry<T>(value: T): ImageCacheEntry<T> {
    return { value, expiresAt: Date.now() + this.ttlMs }
  }

  async findById(id: string): Promise<Media> {
    const entry = this.cache.get(id)
    if (entry && !this.isExpired(entry)) return entry.value
    if (entry && this.isExpired(entry)) this.cache.delete(id)

    const photo = await this.target.findById(id)
    if (photo) this.cache.set(id, this.createEntry(photo))
    return photo
  }

  async findManyById(ids: string[]): Promise<Media[]> {
    const photos: Media[] = []

    for (let id of ids) {
      photos.push(await this.findById(id))
    }
    return photos
  }

  async findAll(): Promise<Media[]> {
    const entry = this.allPhotosCache
    if (entry && !this.isExpired(entry)) return entry.value
    if (entry && this.isExpired(entry)) this.allPhotosCache = null

    const photos = await this.target.findAll()
    if (photos) this.allPhotosCache = this.createEntry(photos)
    return photos
  }

  clearCache(): void {
    this.allPhotosCache = null
    this.cache = new Map<string, ImageCacheEntry<Media>>()
  }
}
