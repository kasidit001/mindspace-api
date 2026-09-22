'use strict';

/**
 * Splits lessons.title/content into per-language columns (title_en/title_th,
 * content_en/content_th) so course content can be authored in English and Thai.
 * Existing rows are backfilled into the _en columns; _th columns start NULL and
 * are filled in as Thai translations are authored (see src/models/Lesson.ts —
 * *Th fields are nullable, the API/frontend fall back to English when absent).
 *
 * `lessons` predates migration tracking (created via sync()) — this is the first
 * real schema change made against it, per src/db/README.md.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'title_en', { type: Sequelize.STRING });
    await queryInterface.addColumn('lessons', 'title_th', { type: Sequelize.STRING });
    await queryInterface.addColumn('lessons', 'content_en', { type: Sequelize.TEXT });
    await queryInterface.addColumn('lessons', 'content_th', { type: Sequelize.TEXT });

    await queryInterface.sequelize.query(
      `UPDATE lessons SET title_en = title, content_en = content;`
    );

    await queryInterface.changeColumn('lessons', 'title_en', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('lessons', 'content_en', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.removeColumn('lessons', 'title');
    await queryInterface.removeColumn('lessons', 'content');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'title', { type: Sequelize.STRING });
    await queryInterface.addColumn('lessons', 'content', { type: Sequelize.TEXT });

    await queryInterface.sequelize.query(
      `UPDATE lessons SET title = title_en, content = content_en;`
    );

    await queryInterface.changeColumn('lessons', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.changeColumn('lessons', 'content', {
      type: Sequelize.TEXT,
      allowNull: false,
    });

    await queryInterface.removeColumn('lessons', 'title_en');
    await queryInterface.removeColumn('lessons', 'title_th');
    await queryInterface.removeColumn('lessons', 'content_en');
    await queryInterface.removeColumn('lessons', 'content_th');
  },
};
