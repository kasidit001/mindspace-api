'use strict';

/**
 * Adds lessons.lab_starter_code / lessons.lab_test_code — the pilot "Code
 * Lab" exercise a lesson can optionally carry: starter code shown in an
 * in-browser editor, and a test script that runs against it in a sandboxed
 * Web Worker (see mindspace-web's CodeLab.vue / useCodeLab.ts) to gate the
 * "Mark as Read" button behind actually solving something, not just
 * clicking a button. Both are nullable — most lessons still have no lab
 * (nothing but self-reported reading, same as before) until more get
 * authored past this pilot course.
 *
 * `lessons` predates migration tracking (created via sync()) — see
 * src/db/README.md and 20260920030000-add-content-type-to-lessons.cjs for
 * the same pattern applied to this table before.
 */

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'lab_starter_code', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
    await queryInterface.addColumn('lessons', 'lab_test_code', {
      type: Sequelize.TEXT,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('lessons', 'lab_test_code');
    await queryInterface.removeColumn('lessons', 'lab_starter_code');
  },
};
