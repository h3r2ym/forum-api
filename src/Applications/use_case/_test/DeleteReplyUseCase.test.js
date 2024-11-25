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

    const mockComment = {
      id: 'comment-123',
      thread_id: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-11-19T02:07:47.387Z',
      deleted_at: null,
      username: 'user 123',
    };

    const mockReplyOwner = {
      id: 'reply-123',
      comment_id: 'comment-123',
      content: 'comment reply',
      owner: 'user-123',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-11-19T02:07:47.387Z',
      deleted_at: null,
    };

    const mockReply = {
      id: 'reply-123',
      comment_id: 'comment-123',
      content: 'comment reply',
      owner: 'user-123',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-11-19T02:07:47.387Z',
      deleted_at: null,
    };

    /** mocking needed function */
    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    mockReplyRepository.checkReplyOwnerById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockReplyOwner));

    mockReplyRepository.checkReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockReply));

    mockReplyRepository.deleteReplyById = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: 'reply-123' }));

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
