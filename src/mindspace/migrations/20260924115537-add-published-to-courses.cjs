'use strict';

/**
 * Adds courses.published — gates whether a course shows up in the public
 * catalog (GET /api/courses) and is reachable at all (lesson detail),
 * vs. sitting as a draft only visible once an admin flips it live. New
 * courses default to unpublished (draft-first); this migration backfills
 * every course that already exists to published=true, since all of them
 * are real, already-live content — no regression for current users.
 *
 * `courses` predates migration tracking (created via sync()) — see
 * src/db/README.md and 20260922150000-add-lab-columns-to-lessons.cjs for
 * the same pattern applied to a different table.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('courses', 'published', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
    await queryInterface.sequelize.query('UPDATE courses SET published = true;');
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('courses', 'published');
  },
};
