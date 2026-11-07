'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        school_id: '2099-0007',
        full_name: 'Demo Second Host',
        email: 'second.host@quizspin.test',
        password_hash: 'not-a-real-hash',
        role: 'host',
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', { school_id: '2099-0007' }, {});
  },
};