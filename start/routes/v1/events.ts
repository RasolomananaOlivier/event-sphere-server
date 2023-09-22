import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/events', 'EventsController.index')
  Route.get('/events/:id', 'EventsController.show')
  Route.get('/events/:id/attendees', 'EventsController.retrieveAttendees')

  /**
   * Sessions routes
   */
  Route.get('/events/:eventId/sessions', 'SessionsController.index')
  Route.get('/events/:eventId/sessions/:sessionId', 'SessionsController.show')

  /**
   * Feedbacks routes
   *
   * HTTP VERBS: GET - No auth required
   */
  Route.get('/events/:eventId/feedbacks', 'FeedbacksController.index')
  Route.get('/events/:eventId/feedbacks/:feedbackId', 'FeedbacksController.show')

  /**
   * List of the related events
   *
   * endpoint: GET /api/v1/events/:id/related
   */
  Route.get('/events/:id/related', 'EventsController.related')

  /**
   * Require authentication
   */
  Route.group(() => {
    /**
     * Create a new event
     *
     * endpoint: POST /api/v1/events
     */
    Route.post('/events', 'EventsController.create')

    /**
     * Update an event
     *
     * endpoint: PUT /api/v1/events/:id
     */
    Route.put('/events/:id', 'EventsController.update')

    /**
     * Delete an event
     *
     * endpoint: DELETE /api/v1/events/:id
     */
    Route.delete('/events/:id', 'EventsController.delete')

    /**
     * Register to an event
     *
     * endpoint: POST /api/v1/events/:id/register
     */
    Route.post('/events/:id/register', 'EventsController.register')

    /**
     * Unregister from an event
     *
     * endpoint: DELETE /api/v1/events/:id/unregister
     */
    Route.delete('/events/:id/unregister', 'EventsController.unregister')

    Route.post('/events/:eventId/sessions', 'SessionsController.create')
    Route.put('/events/:eventId/sessions/:sessionId', 'SessionsController.update')
    Route.post('/events/:eventId/sessions/:sessionId/speakers', 'SessionsController.addSpeakers')
    Route.put('/events/:eventId/sessions/:sessionId/speakers', 'SessionsController.syncSpeakers')
    Route.delete('/events/:eventId/sessions/:sessionId', 'SessionsController.delete')

    /**
     * Feedbacks routes
     *
     * HTTP VERBS: POST | DELETE | PUT - Auth required
     */
    Route.post('/events/:eventId/feedbacks', 'FeedbacksController.create')
    Route.put('/events/:eventId/feedbacks/:feedbackId', 'FeedbacksController.update')
    Route.delete('/events/:eventId/feedbacks/:feedbackId', 'FeedbacksController.delete')
  }).middleware('auth')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
