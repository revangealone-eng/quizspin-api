'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('questions', {
      question_id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      question_set_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'question_sets', key: 'question_set_id' },
        onDelete: 'CASCADE',
      },
      question_text: { type: Sequelize.TEXT, allowNull: false },
      choice_a: { type: Sequelize.STRING(255), allowNull: false },
      choice_b: { type: Sequelize.STRING(255), allowNull: false },
      choice_c: { type: Sequelize.STRING(255), allowNull: true },
      choice_d: { type: Sequelize.STRING(255), allowNull: true },
      correct_choice: { type: Sequelize.STRING(1), allowNull: false },
      points: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 10 },
    });

    await queryInterface.addConstraint('questions', {
      type: 'check',
      name: 'ck_questions_correct_choice',
      fields: ['correct_choice'],
      where: { correct_choice: { [Sequelize.Op.in]: ['A', 'B', 'C', 'D'] } },
    });
    await queryInterface.addConstraint('questions', {
      type: 'check',
      name: 'ck_questions_points_positive',
      fields: ['points'],
      where: { points: { [Sequelize.Op.gte]: 0 } },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('questions');
  },
};