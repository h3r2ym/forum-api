const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const LikeRepository = require('../../../Domains/threads/LikeRepository');

const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const LikeUseCase = require('../LikeUseCase');

describe('LikeUseCase', () => {
  it('should add like on correctly', async () => {
    // Arrange
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const userId = 'user-1';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
        owner: 'user-1',
        username: 'user 1',
      },
    ];

    mockLike = {};
    mockAddLike = {
      id: 'like-1',
    };

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    mockLikeRepository.findLikeByCommentIdAndUserId = jest
      .fn()
      .mockImplementation(() => Promise.reject(new NotFoundError()));

    mockLikeRepository.addLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockAddLike));

    const likeUseCase = new LikeUseCase({
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    const like = await likeUseCase.execute(threadId, commentId, userId);

    // Assert;
    const expected = {
      id: 'like-1',
    };

    expect(like).toStrictEqual(expected);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-1');
    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith('thread-1', 'comment-1');
    expect(mockLikeRepository.findLikeByCommentIdAndUserId).toBeCalledWith(
      'comment-1',
      'user-1'
    );
    expect(mockLikeRepository.addLike).toBeCalledWith('comment-1', 'user-1');
  });

  it('should update like on correctly', async () => {
    // Arrange
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const userId = 'user-1';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
        owner: 'user-1',
        username: 'user 1',
      },
    ];

    mockLike = {
      id: 'like-1',
      comment_id: 'comment-1',
      owner: 'user-1',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-12-19T02:07:47.387Z',
      deleted_at: '2024-12-19T02:07:47.387Z',
    };

    mockResultLike = {
      id: 'like-1',
    };

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    mockLikeRepository.findLikeByCommentIdAndUserId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockLike));

    mockLikeRepository.updateLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockResultLike));

    const likeUseCase = new LikeUseCase({
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    const like = await likeUseCase.execute(threadId, commentId, userId);

    // Assert;
    const expected = {
      id: 'like-1',
    };

    expect(like).toStrictEqual(expected);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-1');
    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith('thread-1', 'comment-1');
    expect(mockLikeRepository.findLikeByCommentIdAndUserId).toBeCalledWith(
      'comment-1',
      'user-1'
    );
    expect(mockLikeRepository.updateLike).toBeCalledWith('comment-1', 'user-1');
  });

  it('should delete like on correctly', async () => {
    // Arrange
    const threadId = 'thread-1';
    const commentId = 'comment-1';
    const userId = 'user-1';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
        owner: 'user-1',
        username: 'user 1',
      },
    ];

    mockLike = {
      id: 'like-1',
      comment_id: 'comment-1',
      owner: 'user-1',
      created_at: '2024-11-19T02:07:47.387Z',
      updated_at: '2024-12-19T02:07:47.387Z',
      deleted_at: null,
    };

    mockResultLike = {
      id: 'like-1',
    };

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    mockLikeRepository.findLikeByCommentIdAndUserId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockLike));

    mockLikeRepository.deleteLike = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockResultLike));

    const likeUseCase = new LikeUseCase({
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    const like = await likeUseCase.execute(threadId, commentId, userId);

    // Assert;
    const expected = {
      id: 'like-1',
    };

    expect(like).toStrictEqual(expected);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-1');
    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith('thread-1', 'comment-1');
    expect(mockLikeRepository.findLikeByCommentIdAndUserId).toBeCalledWith(
      'comment-1',
      'user-1'
    );
    expect(mockLikeRepository.deleteLike).toBeCalledWith('comment-1', 'user-1');
  });

  it('should throw NotFound when thread uncorrectly', async () => {
    // Arrange
    const threadId = 'thread-xxx';
    const commentId = 'comment-1';
    const userId = 'user-1';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.reject(new NotFoundError()));

    const likeUseCase = new LikeUseCase({
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    // Assert;
    await expect(
      likeUseCase.execute(threadId, commentId, userId)
    ).rejects.toThrowError(NotFoundError);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-xxx');
  });

  it('should throw NotFound when comment uncorrectly', async () => {
    // Arrange
    const threadId = 'thread-1';
    const commentId = 'comment-xxx';
    const userId = 'user-1';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockLikeRepository = new LikeRepository();

    /** mocking needed function */
    mockThreadRepository.checkThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    mockThreadRepository.getCommendsByThreadIdAndCommentId = jest
      .fn()
      .mockImplementation(() => Promise.reject(new NotFoundError()));

    const likeUseCase = new LikeUseCase({
      threadRepository: mockThreadRepository,
      likeRepository: mockLikeRepository,
    });

    // Action
    // Assert;
    await expect(
      likeUseCase.execute(threadId, commentId, userId)
    ).rejects.toThrowError(NotFoundError);

    expect(mockThreadRepository.checkThreadById).toBeCalledWith('thread-1');
    expect(
      mockThreadRepository.getCommendsByThreadIdAndCommentId
    ).toBeCalledWith('thread-1', 'comment-xxx');
  });
});
