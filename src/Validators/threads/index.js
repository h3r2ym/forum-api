const InvariantError = require('../../Commons/exceptions/InvariantError');
const { ThreadPayloadSchema } = require('./schema');

const ThreadsValidator = {
  validateThreadsPayload: (payload) => {
    const validateResult = ThreadPayloadSchema.validate(payload);

    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
};

module.exports = ThreadsValidator;
