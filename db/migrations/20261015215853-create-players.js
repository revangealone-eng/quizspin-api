'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('players', {
      player_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      session_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'game_sessions', key: 'session_id' },
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'user_id' },
        onDelete: 'RESTRICT',
      },
      nickname: { type: Sequelize.STRING(24), allowNull: false },
      score: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      joined_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('players', {
      type: 'unique',
      name: 'uq_one_seat',
      fields: ['session_id', 'user_id'],
    });
    await queryInterface.addConstraint('players', {
      type: 'unique',
      name: 'uq_player_nickname',
      fields: ['session_id', 'nickname'],
    });
    await queryInterface.addConstraint('players', {
      type: 'check',
      name: 'ck_players_score_nonnegative',
      fields: ['score'],
      where: { score: { [Sequelize.Op.gte]: 0 } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('players');
  },
};