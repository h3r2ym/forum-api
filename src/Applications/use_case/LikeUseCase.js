class LikeUseCase {
  constructor({ threadRepository, likeRepository }) {
    this._threadRepository = threadRepository;
    this._likeRepository = likeRepository;
  }

  async execute(threadId, commentId, userId) {
    await this._threadRepository.checkThreadById(threadId);
    await this._threadRepository.getCommendsByThreadIdAndCommentId(
      threadId,
      commentId
    );
    try {
      const like = await this._likeRepository.findLikeByCommentIdAndUserId(
        commentId,
        userId
      );

      if (!like.deleted_at) {
        const result = await this._likeRepository.deleteLike(commentId, userId);
        return result;
      }

      const result = await this._likeRepository.updateLike(commentId, userId);
      return result;
    } catch (error) {
      const result = this._likeRepository.addLike(commentId, userId);

      return result;
    }
  }
}

module.exports = LikeUseCase;
