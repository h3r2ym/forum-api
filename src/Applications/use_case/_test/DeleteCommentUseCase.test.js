const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DeleteCommentUseCase = require('../DeleteCommentUseCase');

describe('DeleteCommentUseCase', () => {
  it('should add new thread on action correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    const commentId = 'comment-123';
    const userId = 'user-123';

    const expectedDelete = {
      id: 'comment-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    const mockThread = {
      id: 'thread-1',
      title: 'title thread',
      body: 'body thread',
      owner: 'user-1',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-11-19T02:07:47.387Z',
      deleted_at: null,
    };
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));
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
    expect(deleteComment).toStrictEqual(expectedDelete);
    expect(mockThreadRepository.checkThreadById).toBeCalledWith(threadId);
    expect(mockThreadRepository.checkCommentOwner).toBeCalledWith(
      commentId,
      userId
    );
    expect(mockThreadRepository.deleteCommentById).toBeCalledWith(commentId);
  });
});
