const NewThread = require('../../Domains/threads/entities/NewThread');

class NewThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(userid, useCasePayload) {
    const newThread = new NewThread({ ...useCasePayload, owner: userid });
    const result = await this._threadRepository.addThread(userid, newThread);
    return result;
  }
}

module.exports = NewThreadUseCase;
