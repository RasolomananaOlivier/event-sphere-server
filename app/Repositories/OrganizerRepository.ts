import Organizer from 'App/Models/Organizer'
import SocialMedia from 'App/Models/SocialMedia'

interface OrganizerPayload {
  userId: number
  name: string
  email: string
  phone: string
  description?: string
  address?: string
  website?: string
  logo?: string
}

export default class OrganizerRepository {
  public static async create(payload: OrganizerPayload) {
    const organizer = await Organizer.create(payload)

    return organizer
  }

  public static async attachSocialMedia(
    organizerId: number,
    socialMedias: { id: number; url: string }[]
  ) {
    const organizer = await Organizer.find(organizerId)
    if (!organizer) throw new Error(`Organizer with id ${organizerId} not found`)

    for (let index = 0; index < socialMedias.length; index++) {
      const id = socialMedias[index].id

      const socialMedia = SocialMedia.find(id)
      if (!socialMedia) throw new Error(`Social media with id ${id} not found`)

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

  public static async find() {}

  public static async update() {}

  public static async delete() {}
}
