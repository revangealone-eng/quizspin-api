// Which database constraint answers with which message. The key is the constraint's name.
module.exports = {
  uq_player_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },
  uq_one_seat: {
    status: 409,
    code: 'ALREADY_JOINED',
    message: 'This account already has a seat in this game.',
  },
  game_sessions_question_set_id_fkey: {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'This question set was used in a game and cannot be deleted.',
  },
  uq_one_answer_per_question: {
    status: 409,
    code: 'ALREADY_ANSWERED',
    message: 'This player already answered that question.',
  },
};