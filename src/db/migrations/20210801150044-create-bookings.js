'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'bookings', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        session_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'sessions', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        price: {
          type: Sequelize.REAL,
          allowNull: false,
        },
        seat:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        session_date:{
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        type: {
          type: Sequelize.ENUM('Meia-Entrada', 'Inteira'),
          allowNull: false
        },
        status: {
          type: Sequelize.ENUM('PENDING', 'FAILED','COMPLETED', 'CANCELED'),
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bookings')
  }
}