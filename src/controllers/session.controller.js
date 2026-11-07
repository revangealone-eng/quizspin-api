const { matchedData } = require('express-validator');
const sessionService = require('../services/session.service');

// What a client is allowed to see of a game. The code is the public name.
function toJson(session) {
  return {
    code: session.join_code,
    status: session.status,
    question_set_id: session.question_set_id,
    started_at: session.started_at,
    ended_at: session.ended_at,
    created_at: session.created_at,
  };
}

async function create(req, res) {
  const { question_set_id } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.create(question_set_id, req.user);
  res.status(201).json(toJson(session));
}

async function get(req, res) {
  const { code } = matchedData(req);
  const session = await sessionService.get(code);
  res.status(200).json(toJson(session));
}

async function changeStatus(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { status } = matchedData(req, { locations: ['body'] });
  const session = await sessionService.changeStatus(code, status, req.user);
  res.status(200).json(toJson(session));
}

module.exports = { create, get, changeStatus };