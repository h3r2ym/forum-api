const InvariantError = require('../../Commons/exceptions/InvariantError');
const { CommentPayloadSchema } = require('./schema');

const CommentsValidator = {
  validateCommentsPayload: (payload) => {
    const validateResult = CommentPayloadSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = CommentsValidator;
