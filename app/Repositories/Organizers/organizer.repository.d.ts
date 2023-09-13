import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CreateOrganizerPayload {
  userId: number
  name: string
  email: string
  phone: string
  description?: string
  address?: string
  website?: string
  logo?: MultipartFileContract | undefined
}

export interface UpdateOrganizerPayload {
  name?: string
  email?: string
  phone?: string
  description?: string
  address?: string
  website?: string
  logo?: MultipartFileContract | undefined
}

export interface SocialMediaPayload {
  id: number
  url: string
}
