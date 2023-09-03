import { test } from '@japa/runner'

test.group('DELETE: api/v1/event_types/1', () => {
  test('delete_event_type_when_row_found_expect_data_deleted', async ({ client }) => {
    const response = await client.delete('/api/v1/event-types/2')

    response.assertStatus(200)
  })

  test('delete_event_type_when_row_not_found_expect_not_found_error', async ({ client }) => {
    const response = await client.delete('/api/v1/event-types/2')

    response.assertStatus(404)
  })
})
