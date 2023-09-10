import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/users', 'UsersController.index')
  Route.get('/users/:id', 'UsersController.show')
  Route.delete('/users/:id', 'UsersController.delete').middleware('auth')
  Route.put('/users/:id', 'UsersController.update').middleware('auth')
})
  .prefix('api/v1')
  .namespace('App/Controllers/Http/v1')
