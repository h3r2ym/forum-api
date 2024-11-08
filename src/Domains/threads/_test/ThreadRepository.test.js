const ThreadRepository = require('../ThreadRepository');

describe('ThreadRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const userRepository = new ThreadRepository();

    // Action and Assert
    await expect(userRepository.addThread({})).rejects.toThrowError(
      'THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
