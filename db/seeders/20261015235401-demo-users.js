'use strict';

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const row = (school_id, full_name, email, role) => ({
      school_id, full_name, email, role,
      password_hash: 'not-a-real-hash',
      created_at: now,
    });

    await queryInterface.bulkInsert('users', [
      row('2099-0001', 'Demo Host', 'demo.host@quizspin.test', 'host'),
      row('2099-0002', 'Demo Player Alpha', 'alpha@quizspin.test', 'player'),
      row('2099-0003', 'Demo Player Bravo', 'bravo@quizspin.test', 'player'),
      row('2099-0004', 'Demo Player Charlie', 'charlie@quizspin.test', 'player'),
      row('2099-0005', 'Demo Player Delta', 'delta@quizspin.test', 'player'),
      row('2099-0006', 'Demo Never Joined', 'neverjoined@quizspin.test', 'player'),
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', {
      school_id: ['2099-0001', '2099-0002', '2099-0003', '2099-0004', '2099-0005', '2099-0006'],
    }, {});
  },
};