const InsertReply = require('../../../Domains/threads/entities/InsertReply');
const InsertThread = require('../../../Domains/threads/entities/InsertThread');
const NewReply = require('../../../Domains/threads/entities/NewReply');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ReplyRepository = require('../../../Domains/threads/ReplyRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const NewReplyUseCase = require('../NewReplyUseCase');
const NewThreadUseCase = require('../NewThreadUseCase');

describe('NewReplyUseCase', () => {
  it('should add new reply comment on action correctly', async () => {
    // Arrange
    const useCasePayload = {
      content: 'reply content',
    };

    const commentId = 'comment-123';
    const threadId = 'thread-123';
    const userId = 'user-123';

    const mockInsertReply = new InsertReply({
      id: 'reply-123',
      commentId,
      content: useCasePayload.content,
      owner: userId,
    });

    /** creating dependency of use case */
    const mockReplyRepository = new ReplyRepository();
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockReplyRepository.addReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockInsertReply));

    const newReplyUseCase = new NewReplyUseCase({
      threadRepository: mockThreadRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const addReply = await newReplyUseCase.execute(
      threadId,
      commentId,
      userId,
      useCasePayload
    );

    // Assert
    expect(addReply).toStrictEqual(
      new InsertReply({
        id: 'reply-123',
        commentId,
        content: useCasePayload.content,
        owner: userId,
      })
    );

    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith(threadId, commentId);
    expect(mockReplyRepository.addReply).toBeCalledWith(
      commentId,
      userId,
      new NewReply(useCasePayload)
    );
  });
});
