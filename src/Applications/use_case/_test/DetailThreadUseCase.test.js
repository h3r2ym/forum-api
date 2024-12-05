const ReplyRepository = require('../../../Domains/threads/ReplyRepository');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const DetailThreadUseCase = require('../DetailThreadUseCase');

describe('DetailThreadUseCase', () => {
  it('should detail thread on correctly', async () => {
    // Arrange
    const threadId = 'thread-1';

    const expectedThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      username: 'user 1',
      date: '2021-08-08T07:19:09.775Z',
      comments: [
        {
          id: 'comment-1',
          content: 'comment content',
          username: 'user 1',
          date: '2021-08-08T07:19:09.775Z',
          replies: [
            {
              id: 'reply-1',
              content: 'reply content',
              date: '2021-08-08T07:19:09.775Z',
              username: 'user 1',
            },
            {
              id: 'reply-2',
              content: 'reply content',
              date: '2021-08-08T07:19:09.775Z',
              username: 'user 1',
            },
          ],
        },
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      created_at: '2021-08-08T07:19:09.775Z',
      owner: 'user-1',
      username: 'user 1',
    };

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

    mockReply = [
      {
        id: 'reply-1',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-1',
        username: 'user 1',
        created_at: '2021-08-08T07:19:09.775Z',
      },
      {
        id: 'reply-2',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-1',
        username: 'user 1',
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
    expect(detailThread).toStrictEqual(expectedThread);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-1'
    );
  });

  it('should detail thread on no comments', async () => {
    // Arrange
    const threadId = 'thread-1';

    const expectedThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      username: 'user 1',
      date: '2021-08-08T07:19:09.775Z',
      comments: [],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      created_at: '2021-08-08T07:19:09.775Z',
      owner: 'user-1',
      username: 'user 1',
    };

    mockComment = [];

    mockReply = [];

    /** mocking needed function */
    mockThreadRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));

    mockThreadRepository.getCommendsByThreadId = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComment));

    const detailThreadUseCase = new DetailThreadUseCase({
      threadRepository: mockThreadRepository,
      replyRepository: mockReplyRepository,
    });

    // Action
    const detailThread = await detailThreadUseCase.execute(threadId);

    // Assert;
    expect(detailThread).toStrictEqual(expectedThread);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
  });

  it('should detail thread on no replies', async () => {
    // Arrange
    const threadId = 'thread-1';

    const expectedThread = {
      id: 'thread-12',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      username: 'user 1',
      date: '2021-08-08T07:19:09.775Z',
      comments: [
        {
          id: 'comment-1',
          content: 'comment content',
          username: 'user 1',
          date: '2021-08-08T07:19:09.775Z',
          replies: [],
        },
      ],
    };

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();
    const mockReplyRepository = new ReplyRepository();

    mockThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      created_at: '2021-08-08T07:19:09.775Z',
      owner: 'user-1',
      username: 'user 1',
    };

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

    mockReply = [];

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
    expect(detailThread).toStrictEqual(expectedThread);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-1'
    );
  });

  it('should detail thread on delete replies', async () => {
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
      owner: 'user-1',
      username: 'user 1',
      deleted_at: null,
    };

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        created_at: '2021-08-08T07:19:09.775Z',
        content: 'comment content',
        owner: 'user-1',
        username: 'user 1',
        deleted_at: null,
      },
    ];

    mockReply = [
      {
        id: 'reply-1',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-1',
        username: 'user 1',
        created_at: '2021-08-08T07:19:09.775Z',
        deleted_at: '2021-08-08T07:19:09.775Z',
      },
      {
        id: 'reply-2',
        comment_id: 'comment-1',
        content: 'reply content',
        owner: 'user-1',
        username: 'user 1',
        created_at: '2021-08-08T07:19:09.775Z',
        deleted_at: null,
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
    const expectedThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      username: 'user 1',
      date: '2021-08-08T07:19:09.775Z',
      comments: [
        {
          id: 'comment-1',
          content: 'comment content',
          username: 'user 1',
          date: '2021-08-08T07:19:09.775Z',
          replies: [
            {
              id: 'reply-1',
              content: '**balasan telah dihapus**',
              date: '2021-08-08T07:19:09.775Z',
              username: 'user 1',
            },
            {
              id: 'reply-2',
              content: 'reply content',
              date: '2021-08-08T07:19:09.775Z',
              username: 'user 1',
            },
          ],
        },
      ],
    };
    expect(detailThread).toStrictEqual(expectedThread);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-1'
    );
  });

  it('should detail thread on delete comment', async () => {
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
      owner: 'user-1',
      username: 'user 1',
      deleted_at: null,
    };

    mockComment = [
      {
        id: 'comment-1',
        thread_id: 'thread-1',
        content: 'comment content',
        owner: 'user-1',
        username: 'user 1',
        created_at: '2021-08-08T07:19:09.775Z',
        deleted_at: '2021-08-08T07:19:09.775Z',
      },
    ];

    mockReply = [];

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
    const expectedThread = {
      id: 'thread-1',
      title: 'sebuah thread',
      body: 'sebuah body thread',
      username: 'user 1',
      date: '2021-08-08T07:19:09.775Z',
      comments: [
        {
          id: 'comment-1',
          content: '**komentar telah dihapus**',
          username: 'user 1',
          date: '2021-08-08T07:19:09.775Z',
          replies: [],
        },
      ],
    };
    expect(detailThread).toStrictEqual(expectedThread);

    expect(mockThreadRepository.getThreadById).toBeCalledWith('thread-1');
    expect(mockThreadRepository.getCommendsByThreadId).toBeCalledWith(
      'thread-1'
    );
    expect(mockReplyRepository.getRepliesByCommentId).toBeCalledWith(
      'comment-1'
    );
  });
});
