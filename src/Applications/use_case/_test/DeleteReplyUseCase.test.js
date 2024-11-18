const ReplyTableTestHelper = require('../../../../tests/ReplyTableTestHelper');
const ReplyRepository = require('../../../Domains/threads/ReplyRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteReplyUseCase = require('../DeleteReplyUseCase');

describe('DeleteReplyUseCase', () => {
  it('should add new reply comment on action correctly', async () => {
    // Arrange
    const commentId = 'comment-123';
    const threadId = 'thread-123';
    const userId = 'user-123';
    const replyId = 'reply-123';

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.checkReplyOwnerById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.checkReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.deleteReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const deleteReplyUseCase = new DeleteReplyUseCase({
      threadRepository: mockThreadRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    await deleteReplyUseCase.execute(threadId, commentId, replyId, userId);

    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith(threadId, commentId);
    expect(mockReplyRepository.checkReplyOwnerById).toBeCalledWith(
      replyId,
      userId
    );
    expect(mockReplyRepository.deleteReplyById).toBeCalledWith(replyId);
  });
});
