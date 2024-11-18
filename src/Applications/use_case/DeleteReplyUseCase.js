class DeleteReplyUseCase {
  constructor({ threadRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId, commentId, replyId, userId) {
    await this._threadRepository.getCommendsByThreadIdAndCommentId(
      threadId,
      commentId
    );
    await this._replyRepository.checkReplyOwnerById(replyId, userId);
    await this._replyRepository.deleteReplyById(replyId);
  }
}

module.exports = DeleteReplyUseCase;
