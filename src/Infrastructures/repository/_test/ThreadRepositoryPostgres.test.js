const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
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
      expect(result.id).toEqual('thread-123');
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
      await threadRepositoryPostgres.getThreadById(threadId);

      // Assert
      const threads = await ThreadTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
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

      expect(verify).not.toThrowError();
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
});
