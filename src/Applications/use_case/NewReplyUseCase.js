const InvariantError = require('../../Commons/exceptions/InvariantError');
const NewReply = require('../../Domains/threads/entities/NewReply');

class NewReplyUseCase {
  constructor({ threadRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId, commentId, userId, useCasePayload) {
    await this._threadRepository.getCommendsByThreadIdAndCommentId(
      threadId,
      commentId
    );
    const newReply = new NewReply({ ...useCasePayload });
    const result = await this._replyRepository.addReply(
      commentId,
      userId,
      newReply
    );
    return result;
  }
}

module.exports = NewReplyUseCase;
