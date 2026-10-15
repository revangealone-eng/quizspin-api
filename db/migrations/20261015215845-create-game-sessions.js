'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('game_sessions', {
      session_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      question_set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'question_sets', key: 'question_set_id' },
        onDelete: 'RESTRICT',
      },
      join_code: { type: Sequelize.STRING(6), allowNull: false, unique: true },
      status: { type: Sequelize.STRING(12), allowNull: false, defaultValue: 'waiting' },
      created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
      started_at: { type: Sequelize.DATE, allowNull: true },
      ended_at: { type: Sequelize.DATE, allowNull: true },
    });

    await queryInterface.addConstraint('game_sessions', {
      type: 'check',
      name: 'ck_game_sessions_status',
      fields: ['status'],
      where: { status: { [Sequelize.Op.in]: ['waiting', 'active', 'completed'] } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('game_sessions');
  },
};