const { QuestionSet } = require('../models');

function findAll() {
  return QuestionSet.findAll({ order: [['question_set_id', 'ASC']] });
}

function findAllByHost(hostId) {
  return QuestionSet.findAll({
    where: { host_id: hostId },
    order: [['question_set_id', 'ASC']],
  });
}

function findById(id) {
  return QuestionSet.findByPk(id); // a row, or null
}

function create(data) {
  return QuestionSet.create(data);
}

function update(questionSet, changes) {
  return questionSet.update(changes);
}

function remove(questionSet) {
  return questionSet.destroy();
}

module.exports = { findAll, findAllByHost, findById, create, update, remove };