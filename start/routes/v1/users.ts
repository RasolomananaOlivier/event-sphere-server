import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.show')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
