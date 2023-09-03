import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/events', 'EventsController.index')
  Route.post('/events', 'EventsController.create')
  Route.get('/events/:id', 'EventsController.show')
  Route.put('/events/:id', 'EventsController.update')
  Route.delete('/events/:id', 'EventsController.delete')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
