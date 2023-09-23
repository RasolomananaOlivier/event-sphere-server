import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'invoices'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.dateTime('payment_date')
      table.decimal('amount', 10, 2)
      table.enum('status', ['pending', 'paid', 'failed']).defaultTo('pending')
      table.enum('method', ['bank_transfer', 'credit_card', 'paypal'])
      table.string('charge_description')
      table.string('billing_frequency').nullable()
      table.integer('billing_cycle').nullable()

      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').nullable()
      table
        .integer('attendee_id')
        .unsigned()
        .references('attendees.id')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('subscription_id')
        .unsigned()
        .references('subscriptions.id')
        .onDelete('CASCADE')
        .nullable()

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
