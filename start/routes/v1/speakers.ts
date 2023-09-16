import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'SpeakersController.index')

  Route.get('/:speakerId', 'SpeakersController.show')

  Route.group(() => {
    Route.post('/', 'SpeakersController.create')

    Route.put('/:speakerId', 'SpeakersController.update')

    Route.delete('/:speakerId', 'SpeakersController.delete')
  }).middleware('auth')
}).prefix('api/v1/speakers')
