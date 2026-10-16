'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[host]] = await db.query("SELECT user_id FROM users WHERE school_id = '2099-0001'");

    await queryInterface.bulkInsert('question_sets', [{
      host_id: host.user_id,
      title: 'Library Orientation Basics',
      description: 'Sample questions about using a school library.',
      created_at: new Date(),
    }]);

    const [[set]] = await db.query(
      "SELECT question_set_id FROM question_sets WHERE title = 'Library Orientation Basics'"
    );

    await queryInterface.bulkInsert('questions', [
      {
        question_set_id: set.question_set_id,
        question_text: 'What does a call number on a book tell you?',
        choice_a: 'The price of the book', choice_b: 'Where the book sits on the shelf',
        choice_c: 'Who donated the book', choice_d: 'The year it was printed',
        correct_choice: 'B', points: 10,
      },
      {
        question_set_id: set.question_set_id,
        question_text: 'What should you do before leaving the library with a book?',
        choice_a: 'Hide it in your bag', choice_b: 'Put it on the wrong shelf',
        choice_c: 'Borrow it at the circulation desk', choice_d: 'Fold the page corner',
        correct_choice: 'C', points: 10,
      },
      {
        question_set_id: set.question_set_id,
        question_text: 'What is a library quiet zone mainly for?',
        choice_a: 'Holding concerts', choice_b: 'Studying without noise',
        choice_c: 'Selling snacks', choice_d: 'Playing games',
        correct_choice: 'B', points: 10,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('question_sets', { title: 'Library Orientation Basics' }, {});
  },
};