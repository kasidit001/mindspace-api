'use strict';

/**
 * Scopes lesson progress to an account. Existing rows predate auth (the app
 * was single-user/global until now — see the removed comment in
 * src/models/Progress.ts) and have no owner to backfill, so they're wiped
 * rather than assigned to an arbitrary user.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`DELETE FROM user_progress;`);

    // The old unique-on-lesson_id constraint doesn't make sense once progress
    // is per-user (two different users must each be able to complete the same
    // lesson) — drop it before adding user_id, replace with unique(user_id, lesson_id).
    await queryInterface.removeConstraint('user_progress', 'user_progress_lesson_id_key');

    await queryInterface.addColumn('user_progress', 'user_id', {
      type: Sequelize.UUID,
      allowNull: false,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('user_progress', {
      fields: ['user_id', 'lesson_id'],
      type: 'unique',
      name: 'user_progress_user_id_lesson_id_key',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user_progress', 'user_progress_user_id_lesson_id_key');
    await queryInterface.removeColumn('user_progress', 'user_id');
    await queryInterface.addConstraint('user_progress', {
      fields: ['lesson_id'],
      type: 'unique',
      name: 'user_progress_lesson_id_key',
    });
  },
};
