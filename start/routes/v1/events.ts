import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/events', 'EventsController.index')
  Route.get('/events/:id', 'EventsController.show')
  Route.get('/events/:id/attendees', 'EventsController.retrieveAttendees')

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
  }).middleware('auth')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
