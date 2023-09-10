import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * Auth local routes
   */
  Route.group(() => {
    Route.post('/register', 'AuthController.register')
    Route.post('/login', 'AuthController.login')
  }).prefix('local')

  /**
   * Auth social routes
   */
  Route.group(() => {
    Route.get('redirect', 'AuthController.redirectToGoogle')
    Route.get('callback', 'AuthController.handleGoogleCallback')
  }).prefix('google')

  Route.post('/refresh', 'AuthController.refresh')
  Route.post('/forgot-password', 'AuthController.forgotPassword')
  Route.post('/reset-password', 'AuthController.resetPassword')

  Route.post('/logout', 'AuthController.logout').middleware('auth')
  Route.get('/me', 'AuthController.me').middleware('auth')
  Route.get('/verify-email', 'AuthController.verifyEmail')
})
  .prefix('api/v1/auth')
  .namespace('App/Controllers/Http/v1')
