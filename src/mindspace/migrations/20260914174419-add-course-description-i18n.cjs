'use strict';

/**
 * Splits courses.description into description_en/description_th, mirroring the
 * lessons.title_en/title_th split (20260914173729-add-lesson-i18n-columns.cjs).
 * course.title stays single-language — course names ("TypeScript OOP") are treated
 * as proper nouns, unlike lesson titles/content.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'description_en', { type: Sequelize.TEXT });
    await queryInterface.addColumn('courses', 'description_th', { type: Sequelize.TEXT });

    await queryInterface.sequelize.query(
      `UPDATE courses SET description_en = description;`
    );

    await queryInterface.removeColumn('courses', 'description');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'description', { type: Sequelize.TEXT });

    await queryInterface.sequelize.query(
      `UPDATE courses SET description = description_en;`
    );

    await queryInterface.removeColumn('courses', 'description_en');
    await queryInterface.removeColumn('courses', 'description_th');
  },
};
