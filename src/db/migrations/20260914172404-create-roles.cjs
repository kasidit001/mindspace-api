'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Mirrors src/models/Role.ts. This table already exists in dev DBs created
  // via sequelize.sync() before migrations were introduced — see the note in
  // src/db/README.md about backfilling SequelizeMeta on those DBs.
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('roles', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('roles');
  },
};
