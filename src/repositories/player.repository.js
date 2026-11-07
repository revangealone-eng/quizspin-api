const { Player } = require('../models');

// The seat of one account in one session, or null. This one query is the rejoin rule.
function findSeat(sessionId, userId) {
  return Player.findOne({ where: { session_id: sessionId, user_id: userId } });
}

function countBySession(sessionId) {
  return Player.count({ where: { session_id: sessionId } });
}

function listBySession(sessionId) {
  return Player.findAll({
    where: { session_id: sessionId },
    order: [['score', 'DESC'], ['player_id', 'ASC']],
  });
}

function create(data) {
  return Player.create(data);
}

module.exports = { findSeat, countBySession, listBySession, create };