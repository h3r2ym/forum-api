const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const InsertThread = require('../../../Domains/threads/entities/InsertThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const newThread = {
        title: 'title 123',
        body: 'body 123',
      };
      const userId = 'user-123';

      const fakeIdGenerator = () => '321';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await threadRepositoryPostgres.addThread(
        userId,
        newThread
      );

      // Assert
      const expected = new InsertThread({
        id: 'thread-321',
        title: 'title 123',
        body: 'body 123',
        owner: 'user-123',
      });
      expect(result).toStrictEqual(expected);

      const threads = await ThreadTableTestHelper.findThreadById('thread-321');
      expect(threads).toHaveLength(1);
    });
  });

  describe('newComment function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const newComment = {
        content: 'content 123',
      };
      const userId = 'user-123';
      const threadId = 'thread-123';

      const fakeIdGenerator = () => '1234';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await threadRepositoryPostgres.addComment(
        threadId,
        userId,
        newComment
      );

      // Assert
      const expected = {
        id: 'comment-1234',
        content: 'content 123',
        owner: 'user-123',
      };

      expect(result).toStrictEqual(expected);

      const expectedResult = await CommentTableTestHelper.findCommentById(
        expected.id
      );

      expect(expectedResult).toHaveLength(1);
    });
  });

  describe('checkThreadById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const threadId = 'thread-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await threadRepositoryPostgres.checkThreadById(threadId);

      // Assert
      const expected = {
        id: 'thread-123',
        title: 'title thread',
        body: 'body thread',
        owner: 'user-123',
        created_at: null,
        update_at: null,
        deleted_at: null,
      };

      expect(result).toStrictEqual(expected);
    });

    it('should throw NotFoundError when data correctly', async () => {
      const threadId = 'thread-xxx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        threadRepositoryPostgres.checkThreadById(threadId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('getThreadById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const threadId = 'thread-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const thread = await threadRepositoryPostgres.getThreadById(threadId);

      // Assert
      expect(thread.id).toEqual('thread-123');
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const threadId = 'thread-xxx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      // Assert
      await expect(
        threadRepositoryPostgres.getThreadById(threadId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('getCommendsByThreadId function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const threadId = 'thread-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.getCommendsByThreadId(threadId);

      // Assert
      const threads = await CommentTableTestHelper.findCommentsByThreadId(
        'thread-123'
      );
      expect(threads).toHaveLength(1);
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const threadId = 'thread-123xx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        threadRepositoryPostgres.getCommendsByThreadId(threadId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('checkCommentOwner function', () => {
    it('should not throw when data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const verify = async () => {
        await threadRepositoryPostgres.checkCommentOwner(commentId, userId);
      };

      // Assert
      const action = async () => {
        await threadRepositoryPostgres.checkCommentOwner(commentId, userId);
      };

      expect(action).not.toThrowError(NotFoundError);
      expect(action).not.toThrowError(AuthorizationError);
    });

    it('should not throw when data correctly', async () => {
      const commentId = 'comment-xxx';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      // Assert

      await expect(
        threadRepositoryPostgres.checkCommentOwner(commentId, userId)
      ).rejects.toThrowError(NotFoundError);
    });

    it('should not throw when data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-xxx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      // Assert

      await expect(
        threadRepositoryPostgres.checkCommentOwner(commentId, userId)
      ).rejects.toThrowError(AuthorizationError);
    });
  });

  describe('deleteCommentById function', () => {
    it('should not throw when data correctly', async () => {
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.deleteCommentById(commentId);

      // Assert
      const check = await CommentTableTestHelper.findCommentById(commentId);
      expect(check.deleted_at).not.toBeNull();
    });

    it('should throw InvarianError when data uncorrect', async () => {
      const commentId = 'comment-123xx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        threadRepositoryPostgres.deleteCommentById(commentId)
      ).rejects.toThrowError(InvariantError);
    });
  });

  describe('getCommendsByThreadIdAndCommentId function', () => {
    it('should not throw when data correctly', async () => {
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result =
        await threadRepositoryPostgres.getCommendsByThreadIdAndCommentId(
          threadId,
          commentId
        );

      // Assert

      expect(result.id).toEqual('comment-123');
      expect(result.thread_id).toEqual('thread-123');
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const threadId = 'thread-xxx';
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      // Assert

      await expect(
        threadRepositoryPostgres.getCommendsByThreadIdAndCommentId(
          threadId,
          commentId
        )
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const threadId = 'thread-123';
      const commentId = 'comment-xxx';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      // Assert

      await expect(
        threadRepositoryPostgres.getCommendsByThreadIdAndCommentId(
          threadId,
          commentId
        )
      ).rejects.toThrowError(NotFoundError);
    });
  });
});
