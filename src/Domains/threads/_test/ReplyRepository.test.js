const ReplyRepository = require('../ReplyRepository');

describe('ReplayRepository interface', () => {
  it('should throw error when invoke abstract behavior', async () => {
    // Arrange
    const replyRepository = new ReplyRepository();

    // Action and Assert
    await expect(replyRepository.addReply({})).rejects.toThrowError(
      'REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(replyRepository.checkReplyById({})).rejects.toThrowError(
      'REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
    await expect(replyRepository.deleteReplyById({})).rejects.toThrowError(
      'REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED'
    );
  });
});
