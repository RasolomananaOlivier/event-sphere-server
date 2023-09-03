import { test } from '@japa/runner'

test('get list of event types', async ({ client }) => {
  const response = await client.get('/api/v1/event-types')

  response.assertStatus(200)
})

test('create a new event type', async ({ client }) => {
  const response = await client.post('/api/v1/event-types').json({
    name: 'Test name',
    description: 'Test descr',
  })

  response.assertStatus(201)
})

test('update an event type', async ({ client }) => {
  const response = await client.put('/api/v1/event-types/1').json({
    name: 'Test name',
    description: 'Test descr',
  })

  response.assertStatus(200)
})

test('delete an event type', async ({ client }) => {
  const response = await client.delete('/api/v1/event-types/1')

  response.assertStatus(200)
})
