const { GameSession } = require('../models');

function findByCode(code) {
  return GameSession.findOne({ where: { join_code: code } }); // a row, or null
}

function create(data) {
  return GameSession.create(data);
}

function update(session, changes) {
  return session.update(changes);
}

module.exports = { findByCode, create, update };