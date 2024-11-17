class DeleteCommentUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId, commentId, userId) {
    await this._threadRepository.checkThreadById(threadId);
    await this._threadRepository.checkCommentOwner(commentId, userId);
    const result = await this._threadRepository.deleteCommentById(commentId);
    return result;
  }
}

module.exports = DeleteCommentUseCase;
