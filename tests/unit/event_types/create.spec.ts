import { test } from '@japa/runner'

test.group('POST: api/v1/event_types', () => {
  test('create_event_type_when_all_fields_are_populated_expect_data_saved', async ({ client }) => {
    const response = await client.post('/api/v1/event-types').json({
      name: 'Test name',
      description: 'Test descr',
    })

    response.assertStatus(201)
  })

  test('create_event_type_when_one_field_is_missed_expect_error_return', async ({ client }) => {
    const response = await client.post('/api/v1/event-types').json({
      name: 'Test name',
    })

    response.assertStatus(422)
  })
})
