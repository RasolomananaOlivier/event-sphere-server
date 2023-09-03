import { test } from '@japa/runner'

test.group('PUT: api/v1/event_types/:id', () => {
  test('update_event_type_when_all_fields_are_populated_expect_data_modified', async ({
    client,
  }) => {
    const response = await client.put('/api/v1/event-types/1').json({
      name: 'Test name',
      description: 'Test descr',
    })

    response.assertStatus(200)
  })

  test('update_event_type_when_one_field_is_missed_expect_data_modified', async ({ client }) => {
    const response = await client.put('/api/v1/event-types/1').json({
      name: 'Test name',
    })

    response.assertStatus(200)
  })

  test('update_event_type_when_row_not_found_expect_not_found_error', async ({ client }) => {
    const response = await client.put('/api/v1/event-types/10').json({
      name: 'Test name',
    })

    response.assertStatus(404)
  })
})
