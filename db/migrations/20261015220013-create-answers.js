'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('answers', {
      answer_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      player_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'players', key: 'player_id' },
        onDelete: 'CASCADE',
      },
      question_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'questions', key: 'question_id' },
        onDelete: 'RESTRICT',
      },
      submitted_choice: { type: Sequelize.STRING(1), allowNull: false },
      is_correct: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
      points_awarded: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      answered_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('now') },
    });

    await queryInterface.addConstraint('answers', {
      type: 'unique',
      name: 'uq_one_answer_per_question',
      fields: ['player_id', 'question_id'],
    });
    await queryInterface.addConstraint('answers', {
      type: 'check',
      name: 'ck_answers_submitted_choice',
      fields: ['submitted_choice'],
      where: { submitted_choice: { [Sequelize.Op.in]: ['A', 'B', 'C', 'D'] } },
    });
    await queryInterface.addConstraint('answers', {
      type: 'check',
      name: 'ck_answers_points_nonnegative',
      fields: ['points_awarded'],
      where: { points_awarded: { [Sequelize.Op.gte]: 0 } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('answers');
  },
};