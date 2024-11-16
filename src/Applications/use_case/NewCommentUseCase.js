const NewComment = require('../../Domains/threads/entities/NewComment');

class NewCommentUseCase {
  constructor({ threadRepository, validator }) {
    this._threadRepository = threadRepository;
    this._validator = validator;
  }

  async execute(threadId, userId, useCasePayload) {
    this._validator.validateCommentsPayload(useCasePayload);
    const newThread = new NewComment({ ...useCasePayload });
    await this._threadRepository.checkThreadById(threadId);
    const result = await this._threadRepository.addComment(
      threadId,
      userId,
      newThread
    );
    return result;
  }
}

module.exports = NewCommentUseCase;
