import { DateTime } from 'luxon'
import type { MultipartFileContract } from '@ioc:Adonis/Core/BodyParser'

export interface CreateEventPayload {
  organizerId: number
  typeId: number
  title: string
  description: string
  date: DateTime
  location: string
  duration: number
  deadline: DateTime
  maxAttendees: number
  price: number
  banner?: MultipartFileContract
}

export interface UpdateEventPayload {
  typeId?: number
  title?: string
  description?: string
  date?: DateTime
  location?: string
  duration?: number
  deadline?: DateTime
  maxAttendees?: number
  price?: number
  banner?: MultipartFileContract
}
