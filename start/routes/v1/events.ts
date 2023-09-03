import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/events', 'EventsController.index')
  Route.post('/events', 'EventsController.create')
  Route.get('/events/:id', 'EventsController.show')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
