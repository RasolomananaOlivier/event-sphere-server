import { AuthContract } from '@ioc:Adonis/Addons/Auth'
import LogicalException from 'App/Exceptions/LogicalException'
import NotFoundException from 'App/Exceptions/NotFoundException'
import Organizer from 'App/Models/Organizer'
import SocialMedia from 'App/Models/SocialMedia'
import { logger } from 'Config/app'

interface CreateOrganizerPayload {
  userId: number
  name: string
  email: string
  phone: string
  description?: string
  address?: string
  website?: string
  logo?: string
}

interface UpdateOrganizerPayload {
  name?: string
  email?: string
  phone?: string
  description?: string
  address?: string
  website?: string
  logo?: string
}

interface SocialMediaPayload {
  id: number
  url: string
}

export default class OrganizerRepository {
  public static async create(payload: CreateOrganizerPayload) {
    const organizer = await Organizer.create(payload)

    return organizer
  }

  public static async attachSocialMedia(
    organizerId: number,
    socialMedias: { id: number; url: string }[]
  ) {
    const organizer = await Organizer.find(organizerId)
    if (!organizer) throw new NotFoundException(`Organizer with id ${organizerId} not found`)

    for (let index = 0; index < socialMedias.length; index++) {
      const id = socialMedias[index].id

      const socialMedia = SocialMedia.find(id)
      if (!socialMedia) throw new NotFoundException(`Social media with id ${id} not found`)

      await organizer.related('socialMedias').attach({
        [id]: {
          url: socialMedias[index].url,
        },
      })
    }
  }

  public static async withSocialMedia(organizer: Organizer) {
    await organizer.load('socialMedias', (query) => {
      query.pivotColumns(['url'])
    })

    const socialMedias = organizer.socialMedias.map((s) => {
      return {
        ...s.$attributes,
        url: s.$extras.pivot_url,
      }
    })

    return {
      ...organizer.serialize(),
      socialMedias,
    }
  }

  public static async findAll() {
    return await Organizer.all()
  }

  public static async find(organizerId: number) {
    const organizer = await Organizer.find(organizerId)

    if (!organizer) throw new NotFoundException(`Organizer with ${organizerId} could not be found`)

    return organizer
  }

  public static async findBy(key: string, value: any) {
    const organizer = await Organizer.findBy(key, value)

    if (!organizer) throw new NotFoundException(`Organizer with ${key} as ${value} not found`)

    return organizer
  }

  public static async update(
    auth: AuthContract,
    organizerId: number,
    payload: UpdateOrganizerPayload
  ) {
    const userId = auth.user!.id

    const organizer = await Organizer.findBy('userId', userId)

    if (!organizer) throw new NotFoundException(`Organizer with userId ${userId} not found`)

    if (organizer.id !== organizerId)
      throw new LogicalException(`Not allowed to update organizer with id ${organizerId} `)

    organizer.merge(payload)
    await organizer.save()

    return organizer
  }

  public static async updateSocialMedias(
    auth: AuthContract,
    organizerId: number,
    payload: SocialMediaPayload[]
  ) {
    const userId = auth.user!.id
    const organizer = await Organizer.findBy('userId', userId)

    if (!organizer) throw new NotFoundException(`Organizer with userId ${userId} not found`)

    if (organizer.id !== organizerId)
      throw new LogicalException(`Not allowed to update organizer with id ${organizerId} `)

    const syncPayload = payload.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: {
          url: curr.url,
        },
      }
    }, {})

    await organizer.related('socialMedias').sync(syncPayload)

    return organizer
  }

  public static async delete(organizerId: number) {
    const organizer = await Organizer.find(organizerId)
    if (!organizer)
      throw new NotFoundException(`Organizer with id ${organizerId} could not be found`)

    await organizer.delete()
  }
}
