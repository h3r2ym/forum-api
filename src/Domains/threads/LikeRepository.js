class LikeRepository {
  async addLike(commentId, userId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async updateLike(commentId, userId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteLike(commentId, userId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findLikeByCommentIdAndUserId(commentId, userId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async findCountLikeByCommentId(commentId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = LikeRepository;
