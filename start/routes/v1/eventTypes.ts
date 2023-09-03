import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/event-types', 'EventTypesController.index')
  Route.post('/event-types', 'EventTypesController.create')
  Route.put('/event-types/:id', 'EventTypesController.update')
  Route.delete('/event-types/:id', 'EventTypesController.delete')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
