const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
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
      await threadRepositoryPostgres.addThread(userId, newThread);

      // Assert
      const threads = await ThreadTableTestHelper.findThreadById('thread-321');
      expect(threads).toHaveLength(1);
    });
  });

  describe('newComment function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      await UsersTableTestHelper.addUser({});
      await ThreadTableTestHelper.addThread({});

      const newComment = {
        content: 'content 123',
      };
      const userId = 'user-123';
      const threadId = 'thread-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.addComment(threadId, userId, newComment);

      // Assert
      const comments = await CommentTableTestHelper.findCommentById(
        'comment-123'
      );
      expect(comments).toHaveLength(1);
    });
  });

  describe('checkThreadById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      await ThreadTableTestHelper.addThread({});

      const threadId = 'thread-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.checkThreadById(threadId);

      // Assert
      const threads = await ThreadTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });
  });

  describe('getThreadById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      await ThreadTableTestHelper.addThread({});

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
      await UsersTableTestHelper.addUser({});
      await ThreadTableTestHelper.addThread({});
      await CommentTableTestHelper.addComment({});

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
  });
});
