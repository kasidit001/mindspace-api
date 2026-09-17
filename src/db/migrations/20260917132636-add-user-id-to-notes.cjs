'use strict';

/**
 * Scopes notes to an account. Existing rows predate auth and have no owner
 * to backfill, so they're wiped rather than assigned to an arbitrary user
 * (same reasoning as 20260917132635-add-user-id-to-progress.cjs).
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM notes;`);

    await queryInterface.addColumn('notes', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('notes', 'user_id');
  },
};
