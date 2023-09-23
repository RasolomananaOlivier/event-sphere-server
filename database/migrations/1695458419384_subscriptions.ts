import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'subscriptions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('plan_id').unsigned().references('plans.id').onDelete('CASCADE')
      table.string('stripe_id')
      table.enum('status', ['active', 'past_due', 'canceled', 'unpaid']).defaultTo('unpaid')
      table.dateTime('current_period_start').nullable()
      table.dateTime('current_period_end').nullable()
      table.dateTime('cancelled_at').nullable()

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
