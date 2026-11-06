const questionSetRepository = require('../repositories/question-set.repository');
const { notFound, forbidden } = require('../errors/app-error');

async function findOrFail(id) {
  const questionSet = await questionSetRepository.findById(id);
  if (!questionSet) throw notFound('QUESTION_SET_NOT_FOUND', `No question set has the id ${id}.`);
  return questionSet;
}

function isOwner(questionSet, user) {
  return questionSet.host_id === user.user_id;
}

// Rule: a host sees only their own question sets.
function list(user) {
  return questionSetRepository.findAllByHost(user.user_id);
}

// Rule: a question set can be read only by the host who owns it.
async function get(id, user) {
  const questionSet = await findOrFail(id);
  if (!isOwner(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }
  return questionSet;
}

// Rule: the owner is the caller. A client can never choose host_id.
function create(data, user) {
  return questionSetRepository.create({ ...data, host_id: user.user_id });
}

// Rule: only the owner may change a question set.
async function update(id, changes, user) {
  const questionSet = await findOrFail(id);
  if (!isOwner(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }
  return questionSetRepository.update(questionSet, changes);
}

// Rule: only the owner may delete a question set.
async function remove(id, user) {
  const questionSet = await findOrFail(id);
  if (!isOwner(questionSet, user)) {
    throw forbidden('This question set belongs to another host.');
  }
  await questionSetRepository.remove(questionSet);
}

module.exports = { list, get, create, update, remove };