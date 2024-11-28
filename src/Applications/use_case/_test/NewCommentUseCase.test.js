const InsertComment = require('../../../Domains/threads/entities/InsertComment');
const NewComment = require('../../../Domains/threads/entities/NewComment');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const CommentsValidator = require('../../../Validators/comments');
const NewCommentUseCase = require('../NewCommentUseCase');

describe('NewCommentUseCase', () => {
  it('should add new thread on action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'content 123',
    };

    const expectedResult = {
      id: 'comment-123',
      content: useCasePayload.content,
      owner: 'user-123',
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentsValidator = CommentsValidator;

    const mockThread = {
      id: 'thread-123',
      title: 'title thread',
      body: 'body thread',
      owner: 'user-123',
      created_at: '2024-11-19T02:07:49.404Z',
      updated_at: '2024-11-19T02:07:49.404Z',
      deleted_at: null,
    };

    const mockNewComment = {
      id: 'comment-123',
      content: useCasePayload.content,
      owner: 'user-123',
    };

    /** mocking needed function */
    mockCommentsValidator.validateCommentsPayload = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockThreadRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockNewComment));

    const newCommentUseCase = new NewCommentUseCase({
      threadRepository: mockThreadRepository,
      validator: mockCommentsValidator,
    });

    // Action
    const newComment = await newCommentUseCase.execute(
      'thread-123',
      'user-123',
      useCasePayload
    );

    // Assert
    expect(newComment).toStrictEqual(expectedResult);

    expect(mockThreadRepository.addComment).toBeCalledWith(
      'thread-123',
      'user-123',
      new NewComment(useCasePayload)
    );
    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-123');
    expect(mockCommentsValidator.validateCommentsPayload).toBeCalledWith(
      useCasePayload
    );
  });
});
