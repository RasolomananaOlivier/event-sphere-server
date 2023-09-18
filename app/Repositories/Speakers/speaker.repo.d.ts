export interface CreateSpeakerPayload {
  name: string
  bio: string
  email: string
  phone: string
  photo?: string
  expertise?: string
}

export interface UpdateSpeakerPayload {
  name?: string
  bio?: string
  email?: string
  phone?: string
  photo?: string
  expertise?: string
}
