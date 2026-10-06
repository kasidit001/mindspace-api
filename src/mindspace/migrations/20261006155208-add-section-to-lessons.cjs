'use strict';

/**
 * Adds lessons.section_en/section_th — an optional sidebar group label
 * ("The Layer Chain", "Deep Dive: Auth Stack", etc). Null on the vast
 * majority of lessons (the sidebar renders them flat, same as today);
 * only courses with a long, undifferentiated lesson list (starting with
 * secinsight-api-layers) populate it.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'section_en', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.addColumn('lessons', 'section_th', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('lessons', 'section_en');
    await queryInterface.removeColumn('lessons', 'section_th');
  },
};
