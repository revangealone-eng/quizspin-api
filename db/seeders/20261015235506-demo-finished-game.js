'use strict';

module.exports = {
  async up(queryInterface) {
    const db = queryInterface.sequelize;

    const [[set]] = await db.query(
      "SELECT question_set_id FROM question_sets WHERE title = 'Library Orientation Basics'"
    );
    const [users] = await db.query("SELECT user_id, school_id FROM users WHERE school_id LIKE '2099-%'");
    const uid = {};
    users.forEach((u) => { uid[u.school_id] = u.user_id; });

    await queryInterface.bulkInsert('game_sessions', [{
      question_set_id: set.question_set_id,
      join_code: '418263',
      status: 'completed',
      created_at: new Date('2026-10-09T00:55:00Z'),
      started_at: new Date('2026-10-09T01:00:00Z'),
      ended_at: new Date('2026-10-09T01:12:00Z'),
    }]);

    const [[session]] = await db.query("SELECT session_id FROM game_sessions WHERE join_code = '418263'");
    const joined = new Date('2026-10-09T00:58:00Z');

    await queryInterface.bulkInsert('players', [
      { session_id: session.session_id, user_id: uid['2099-0002'], nickname: 'Alpha', score: 30, joined_at: joined },
      { session_id: session.session_id, user_id: uid['2099-0003'], nickname: 'Bravo', score: 20, joined_at: joined },
      { session_id: session.session_id, user_id: uid['2099-0004'], nickname: 'Charlie', score: 20, joined_at: joined },
      { session_id: session.session_id, user_id: uid['2099-0005'], nickname: 'Delta', score: 10, joined_at: joined },
    ]);

    const [players] = await db.query(
      'SELECT player_id, nickname FROM players WHERE session_id = :sid',
      { replacements: { sid: session.session_id } }
    );
    const pid = {};
    players.forEach((p) => { pid[p.nickname] = p.player_id; });

    const [questions] = await db.query(
      'SELECT question_id, correct_choice FROM questions WHERE question_set_id = :qs ORDER BY question_id',
      { replacements: { qs: set.question_set_id } }
    );

    const answer = (nickname, q, choice) => ({
      player_id: pid[nickname],
      question_id: q.question_id,
      submitted_choice: choice,
      is_correct: choice === q.correct_choice,
      points_awarded: choice === q.correct_choice ? 10 : 0,
      answered_at: new Date('2026-10-09T01:05:00Z'),
    });

    await queryInterface.bulkInsert('answers', [
      answer('Alpha', questions[0], 'B'), answer('Alpha', questions[1], 'C'), answer('Alpha', questions[2], 'B'),
      answer('Bravo', questions[0], 'B'), answer('Bravo', questions[1], 'C'), answer('Bravo', questions[2], 'A'),
      answer('Charlie', questions[0], 'A'), answer('Charlie', questions[1], 'C'), answer('Charlie', questions[2], 'B'),
      answer('Delta', questions[0], 'B'),
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('game_sessions', { join_code: '418263' }, {});
  },
};