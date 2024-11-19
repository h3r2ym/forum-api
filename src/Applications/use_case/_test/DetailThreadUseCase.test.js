const ReplyRepository = require('../../../Domains/threads/ReplyRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should detail thread on correctly', async () => {
    // Arrange
    const threadId = 'thread-1';
    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      created_at: '2021-08-08T07:19:09.775Z',
      username: 'user-123',
    };

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
        owner: 'user-123',
      },
    ];

    mockReply = [
      {
        id: 'reply-1',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-123',
        created_at: '2021-08-08T07:19:09.775Z',
      },
      {
        id: 'reply-2',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-123',
        created_at: '2021-08-08T07:19:09.775Z',
      },
    ];

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));

    mockThreadRepository.getCommendsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    mockReplyRepository.getRepliesByCommentId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockReply));

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailThread = await detailThreadUseCase.execute(threadId);
    // Assert;
    expect(detailThread).toBeDefined();
    expect(detailThread.id).toBeDefined();
    expect(detailThread.title).toBeDefined();
    expect(detailThread.body).toBeDefined();
    expect(detailThread.date).toBeDefined();
    expect(detailThread.username).toBeDefined();
    expect(detailThread.comments).toBeDefined();

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-1'
    );
  });
});
