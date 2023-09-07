import { DateTime } from 'luxon'

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
  banner: string
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
  banner?: string
}
