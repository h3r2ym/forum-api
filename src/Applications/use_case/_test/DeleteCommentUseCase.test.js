const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should add new thread on action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const userId = 'user-123';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.checkCommentOwner = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.deleteCommentById = jest
      .fn()
      .mockImplementation(() => Promise.resolve({ id: commentId }));

    const deleteCommentUseCase = new DeleteCommentUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const deleteComment = await deleteCommentUseCase.execute(
      threadId,
      commentId,
      userId
    );

    // Assert
    expect(deleteComment).toStrictEqual({ id: commentId });
    expect(mockThreadRepository.checkCommentOwner).toBeCalledWith(
      commentId,
      userId
    );
    expect(mockThreadRepository.deleteCommentById).toBeCalledWith(commentId);
  });
});
