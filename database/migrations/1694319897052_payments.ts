import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'payments'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('attendee_id').unsigned().references('attendees.id').onDelete('CASCADE')
      table.dateTime('payment_date')
      table.decimal('amount', 10, 2)
      table.enum('status', ['pending', 'paid', 'failed']).defaultTo('pending')
      table.enum('method', ['bank_transfer', 'credit_card', 'paypal'])

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
