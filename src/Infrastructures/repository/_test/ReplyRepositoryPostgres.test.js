const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ReplyTableTestHelper = require('../../../../tests/ReplyTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const InsertReply = require('../../../Domains/threads/entities/InsertReply');
const pool = require('../../database/postgres/pool');
const ReplyRepositoryPostgres = require('../ReplyRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
    await ReplyTableTestHelper.addReply({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addReply function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const newReply = {
        content: 'replay content',
      };
      const userId = 'user-123';
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '1234';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await replyRepositoryPostgres.addReply(
        commentId,
        userId,
        newReply
      );

      // Assert
      const expected = new InsertReply({
        id: 'reply-1234',
        commentId: 'comment-123',
        content: newReply.content,
        owner: 'user-123',
      });

      expect(result).toStrictEqual(expected);
    });
  });

  describe('checkReplyById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const replayId = 'reply-123';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await replyRepositoryPostgres.checkReplyById(replayId);

      // Assert
      const replies = await ReplyTableTestHelper.findReplyById('reply-123');
      expect(replies).toHaveLength(1);
    });

    it('should throw InvariantError when data uncorrectly', async () => {
      const replayId = 'reply-12311';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      expect(
        replyRepositoryPostgres.checkReplyById(replayId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('getRepliesByCommentId function', () => {
    it('should not throw Not Found when data correctly', async () => {
      const commentId = 'comment-123';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const replies = await replyRepositoryPostgres.getRepliesByCommentId(
        commentId
      );

      // Assert
      expect(replies).toHaveLength(1);
    });
  });

  describe('checkReplyOwnerById function', () => {
    it('should not throw Authorize when data correctly', async () => {
      const replayId = 'reply-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await replyRepositoryPostgres.checkReplyOwnerById(
        replayId,
        userId
      );

      // Assert
      expect(result.id).toEqual('reply-123');
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const replayId = 'reply-xxx';
      const userId = 'user-123';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        replyRepositoryPostgres.checkReplyOwnerById(replayId, userId)
      ).rejects.toThrowError(NotFoundError);
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const replayId = 'reply-123';
      const userId = 'user-xxx';
      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        replyRepositoryPostgres.checkReplyOwnerById(replayId, userId)
      ).rejects.toThrowError(AuthorizationError);
    });
  });

  describe('deleteReplyById function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const replyId = 'reply-123';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await replyRepositoryPostgres.deleteReplyById(replyId);
      const replies = await ReplyTableTestHelper.findReplyById('reply-123');

      // Assert
      expect(result).toEqual({ id: 'reply-123' });
      expect(replies).toHaveLength(1);
      expect(replies.deleted_at).not.toBeNull();
    });

    it('should throw InvariantError when data uncorrectly', async () => {
      const replyId = 'reply-123xx';

      const fakeIdGenerator = () => '123';
      const replyRepositoryPostgres = new ReplyRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await expect(
        replyRepositoryPostgres.deleteReplyById(replyId)
      ).rejects.toThrowError(InvariantError);
    });
  });
});
