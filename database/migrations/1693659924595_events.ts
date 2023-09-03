import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('type_id').unsigned().references('id').inTable('event_types')
      table.integer(
        'organizer_id'
      ) /* .unsigned().references('organizers.id').onDelete('CASCADE') */
      table.string('title')
      table.text('description')
      table.dateTime('date')
      table.string('location')
      table.integer('duration')
      table.dateTime('deadline')
      table.integer('max_attendees')
      table.double('price')
      table.string('banner')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
