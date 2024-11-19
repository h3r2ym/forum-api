const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const ReplyTableTestHelper = require('../../../../tests/ReplyTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
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
      await replyRepositoryPostgres.addReply(commentId, userId, newReply);

      // Assert
      const replies = await ReplyTableTestHelper.findReplyById('reply-1234');
      expect(replies).toHaveLength(1);
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
      await replyRepositoryPostgres.checkReplyOwnerById(replayId, userId);

      // Assert
      const replies = await ReplyTableTestHelper.findReplyById('reply-123');
      expect(replies).toHaveLength(1);
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
      await replyRepositoryPostgres.deleteReplyById(replyId);

      // Assert
      const replies = await ReplyTableTestHelper.findReplyById('reply-123');
      expect(replies).toHaveLength(1);
    });
  });
});
