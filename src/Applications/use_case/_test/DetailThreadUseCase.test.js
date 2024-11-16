const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should detail thread on correctly', async () => {
    // Arrange
    const threadId = 'thread-123';
    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    mockThread = {
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      created_at: '2021-08-08T07:19:09.775Z',
      username: 'user 123',
    };

    mockComment = [
      {
        id: 'comment-123',
        username: 'user 123',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
      },
      {
        id: 'comment-123',
        username: 'user 123',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
      },
    ];

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));

    mockThreadRepository.getCommendsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const detailThread = await detailThreadUseCase.execute(threadId);

    // Assert
    expect(detailThread).toStrictEqual({
      id: 'thread-123',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      date: '2021-08-08T07:19:09.775Z',
      username: 'user 123',
      comments: [
        {
          id: 'comment-123',
          username: 'user 123',
          date: '2021-08-08T07:19:09.775Z',
          content: 'comment content',
        },
        {
          id: 'comment-123',
          username: 'user 123',
          date: '2021-08-08T07:19:09.775Z',
          content: 'comment content',
        },
      ],
    });

    expect(mockThreadRepository.getThreadById).toBeCalledWith(threadId);
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(threadId);
  });
});
