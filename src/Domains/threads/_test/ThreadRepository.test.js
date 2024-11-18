const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const threadRepository = new ThreadRepository();

    // Action and Assert
    await expect(threadRepository.addThread({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadRepository.addComment({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadRepository.checkThreadById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadRepository.getThreadById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(
      threadRepository.getCommendsByThreadId({})
    ).rejects.toThrowError('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
    await expect(threadRepository.checkCommentOwner({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(threadRepository.deleteCommentById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
