export interface CreateFeedbackPayload {
  eventId: number
  attendeeId: number
  rating: number
  comment: string
}

export interface UpdateFeedbackPayload {
  rating?: number
  comment?: string
}
