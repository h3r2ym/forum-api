const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new ThreadRepository();

    // Action and Assert
    await expect(userRepository.addThread({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.addComment({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.checkThreadById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.getThreadById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.getCommendsByThreadId({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.checkCommentOwner({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(userRepository.deleteCommentById({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
