const InvariantError = require('../../Commons/exceptions/InvariantError');
const { ReplyPayloadSchema } = require('./schema');

const ReplyValidator = {
  validateReplyPayload: (payload) => {
    const validateResult = ReplyPayloadSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = ReplyValidator;
