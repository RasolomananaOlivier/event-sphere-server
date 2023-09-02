import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/event-types', 'EventTypesController.index')
}).prefix('api/v1')
