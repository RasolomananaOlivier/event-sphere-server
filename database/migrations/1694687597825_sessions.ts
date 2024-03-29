import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'sessions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.text('description').nullable()
      table.dateTime('start_at')
      table.integer('duration')
      table.enum('status', ['upcoming', 'live', 'completed']).defaultTo('upcoming')
      table.integer('session_type_id').unsigned().references('session_types.id').onDelete('CASCADE')
      table.integer('event_id').unsigned().references('events.id').onDelete('CASCADE')

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
