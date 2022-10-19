'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'Histories',
        'roomId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Rooms",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      );
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.removeColumn(
        'Histories',
        'roomId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: "Rooms",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE"
        }
      );
  }
};
