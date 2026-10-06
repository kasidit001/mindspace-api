'use strict';

/**
 * Adds lessons.labs — the "Code Lab" exercises a lesson can optionally
 * carry, as a JSON array (a lesson can have more than one exercise, each
 * with its own starter code, test script, and hint). Each element shape:
 * { id, title, instructions, starterCode, testCode, hint }. Rendered and
 * run entirely client-side (see mindspace-web's CodeLab.vue / runCodeLab.ts
 * — a sandboxed Web Worker, no server execution) to gate the "Mark as Read"
 * button behind actually solving something. Nullable/empty — most lessons
 * still have no lab (nothing but self-reported reading, same as before).
 *
 * `lessons` predates migration tracking (created via sync()) — see
 * src/db/README.md and 20260920030000-add-content-type-to-lessons.cjs for
 * the same pattern applied to this table before.
 */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('lessons', 'labs', {
      type: Sequelize.JSONB,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('lessons', 'labs');
  },
};
