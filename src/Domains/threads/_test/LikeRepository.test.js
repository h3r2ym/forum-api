const LikeRepository = require('../LikeRepository');

describe('LikeRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const likeRepository = new LikeRepository();

    // Action and Assert
    await expect(likeRepository.addLike({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(likeRepository.updateLike({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(likeRepository.deleteLike({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      likeRepository.findLikeByCommentIdAndUserId({})
    ).rejects.toThrowError('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(
      likeRepository.findCountLikeByCommentId({})
    ).rejects.toThrowError('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
