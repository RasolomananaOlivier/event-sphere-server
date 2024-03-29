import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'organizer_social_media'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('organizer_id').unsigned().references('organizers.id').onDelete('CASCADE')
      table.integer('social_media_id').unsigned().references('social_medias.id').onDelete('CASCADE')
      table.unique(['organizer_id', 'social_media_id'])
      table.string('url')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
