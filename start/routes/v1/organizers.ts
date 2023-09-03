import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/organizers', 'OrganizersController.index')
  Route.get('/organizers/:id', 'OrganizersController.show')
  Route.post('/organizers', 'OrganizersController.create')
  Route.put('/organizers/:id', 'OrganizersController.update')
  Route.delete('/organizers/:id', 'OrganizersController.delete')

  Route.get('/organizers/events', 'OrganizersController.events')
  Route.get('/organizers/:id/events', 'OrganizersController.event')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
