import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * Auth routes
   */
  Route.post('/register', 'AuthController.register')
  Route.post('/login', 'AuthController.login')
  Route.post('/refresh', 'AuthController.refresh')
  Route.post('/forgot-password', 'AuthController.forgotPassword')
  Route.post('/reset-password', 'AuthController.resetPassword')

  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/me', 'AuthController.me').middleware('auth')
})
  .prefix('api/v1/auth')
  .namespace('App/Controllers/Http/v1')
