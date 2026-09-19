'use strict';

/**
 * Adds lessons.content_type — every lesson today is rendered the same way
 * (Markdown text via app/components/mdc/*), so this defaults every existing
 * and new row to 'article', the only format that actually exists yet. The
 * column exists so authors can genuinely mark a lesson 'video'/'advlab'/'ctf'
 * once those reader experiences are built — see mindspace-web's Content Type
 * Indicator, which maps this field to an icon on the dashboard's "Continue
 * Learning" card. A CHECK constraint keeps the value from drifting to
 * something the frontend doesn't know how to render.
 *
 * `lessons` predates migration tracking (created via sync()) — see
 * src/db/README.md and 20260914173729-add-lesson-i18n-columns.cjs for the
 * same pattern applied to this table before.
 */

const ALLOWED_VALUES = ['article', 'video', 'advlab', 'ctf'];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'content_type', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'article',
    });

    await queryInterface.sequelize.query(
      `ALTER TABLE lessons ADD CONSTRAINT lessons_content_type_check CHECK (content_type IN (${ALLOWED_VALUES.map((v) => `'${v}'`).join(', ')}));`
    );
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query('ALTER TABLE lessons DROP CONSTRAINT lessons_content_type_check;');
    await queryInterface.removeColumn('lessons', 'content_type');
  },
};
