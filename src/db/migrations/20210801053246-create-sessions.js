'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      'sessions', 
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        movie_id:{
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'movies', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        movie_title:{
          type: Sequelize.STRING,
          allowNull: false,
        },
        description: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        schedule: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        price: {
          type: Sequelize.REAL,
          allowNull: false
        },
        session_watchers_id: {
          type: Sequelize.ARRAY(Sequelize.INTEGER),
          allowNull: false,
        },
        available_seats: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        reserved_seats: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false
        },
        sold_seats: {
          type: Sequelize.ARRAY(Sequelize.STRING),
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
    await queryInterface.dropTable('sessions')
  }
};