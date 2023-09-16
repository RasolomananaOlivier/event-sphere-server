import { SessionStatus } from 'App/Models/Session'
import { DateTime } from 'luxon'

export interface CreateSessionPayload {
  sessionTypeId: number
  title: string
  description?: string
  startAt: DateTime
  duration: number
  status?: SessionStatus
  speakers: number[]
}

export interface UpdateSessionPayload {
  sessionTypeId?: number
  title?: string
  description?: string
  startAt?: DateTime
  duration?: number
  status?: SessionStatus
  speakers?: number[]
}
