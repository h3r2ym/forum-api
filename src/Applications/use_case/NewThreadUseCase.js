const InvariantError = require('../../Commons/exceptions/InvariantError');
const NewThread = require('../../Domains/threads/entities/NewThread');

class NewThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userid, useCasePayload) {
    try {
      const newThread = new NewThread({ ...useCasePayload, owner: userid });
      const result = await this._threadRepository.addThread(userid, newThread);
      return result;
    } catch (error) {
      throw new InvariantError('Data yang dikirimkan kurang atau salah.');
    }
  }
}

module.exports = NewThreadUseCase;
