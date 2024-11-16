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

    const mockNewThread = new InsertComment({
      id: 'comment-123',
      threadId: 'thread-123',
      content: useCasePayload.content,
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockCommentsValidator = CommentsValidator;

    /** mocking needed function */
    mockCommentsValidator.validateCommentsPayload = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadRepository.addComment = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockNewThread));

    const newCommentUseCase = new NewCommentUseCase({
      threadRepository: mockThreadRepository,
      validator: mockCommentsValidator,
    });

    // Action
    const addThread = await newCommentUseCase.execute(
      'thread-123',
      'user-123',
      useCasePayload
    );

    // Assert
    expect(addThread).toStrictEqual(mockNewThread);

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
