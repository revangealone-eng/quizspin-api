const { body, param } = require('express-validator');

const idParam = param('id')
  .isInt({ min: 1 }).withMessage('id must be a positive whole number')
  .toInt();

const title = () => body('title')                   // title VARCHAR(100) NOT NULL
  .exists().withMessage('title is required')
  .bail()                                           // stop this field at the first failure
  .isString().withMessage('title must be text')
  .bail()
  .trim()                                           // cut spaces BEFORE measuring
  .isLength({ min: 3, max: 100 }).withMessage('title must be 3 to 100 characters long');

const description = () => body('description')       // description TEXT, may be NULL
  .optional({ values: 'null' })
  .isString().withMessage('description must be text')
  .bail()
  .trim()
  .isLength({ max: 500 }).withMessage('description must be at most 500 characters long');

const createRules = [title(), description()];

// PATCH changes only what is sent: every field is optional, but not all of them at once.
const updateRules = [
  idParam,
  title().optional(),
  description(),
  body().custom((value) => {
    const sent = Object.keys(value || {});
    if (!sent.some((key) => ['title', 'description'].includes(key))) {
      throw new Error('send at least one of: title, description');
    }
    return true;
  }),
];

module.exports = { idParam, createRules, updateRules };