const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const LikeTableTestHelper = require('../../../../tests/LikeTableTestHelper');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const pool = require('../../database/postgres/pool');
const LikeRepositoryPostgres = require('../LikeRepositoryPostgres');

describe('LikeRepositoryPostgres', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUser({});
    await ThreadTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
    await LikeTableTestHelper.addLike({});
  });

  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await LikeTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addLike function', () => {
    it('should data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '321';
      const fakeTime = '2024-11-19T02:07:47.387Z';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
        fakeTime
      );

      // Action
      const result = await likeRepositoryPostgres.addLike(commentId, userId);

      // Assert
      const expected = {
        id: 'like-321',
      };

      expect(result).toStrictEqual(expected);

      const likes = await LikeTableTestHelper.findLikeById(expected.id);
      expect(likes).toHaveLength(1);
    });
  });

  describe('updateLike function', () => {
    it('should data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const fakeTime = '2024-12-19T02:07:47.387Z';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
        fakeTime
      );

      // Action
      const result = await likeRepositoryPostgres.updateLike(commentId, userId);

      // Assert
      const expected = {
        id: 'like-123',
      };

      expect(result).toStrictEqual(expected);

      const expectedData = {
        id: 'like-123',
        comment_id: 'comment-123',
        owner: 'user-123',
        created_at: '2024-11-19T02:07:47.387Z',
        updated_at: '2024-12-19T02:07:47.387Z',
        deleted_at: null,
      };

      const likes = await LikeTableTestHelper.findLikeById(expected.id);

      expect(likes).toHaveLength(1);
      expect(likes[0]).toStrictEqual(expectedData);
    });
  });

  describe('deleteLike function', () => {
    it('should data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const fakeTime = '2024-12-19T02:07:47.387Z';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator,
        fakeTime
      );

      // Action
      const result = await likeRepositoryPostgres.deleteLike(commentId, userId);

      // Assert
      const expected = {
        id: 'like-123',
      };

      expect(result).toStrictEqual(expected);

      const expectedData = {
        id: 'like-123',
        comment_id: 'comment-123',
        owner: 'user-123',
        created_at: '2024-11-19T02:07:47.387Z',
        updated_at: '2024-12-19T02:07:47.387Z',
        deleted_at: '2024-12-19T02:07:47.387Z',
      };

      const likes = await LikeTableTestHelper.findLikeById(expected.id);

      expect(likes).toHaveLength(1);
      expect(likes[0]).toStrictEqual(expectedData);
    });
  });

  describe('findLikeByCommentIdAndUserId function', () => {
    it('should data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await likeRepositoryPostgres.findLikeByCommentIdAndUserId(
        commentId,
        userId
      );

      // Assert
      const expected = {
        id: 'like-123',
        comment_id: 'comment-123',
        owner: 'user-123',
        created_at: '2024-11-19T02:07:47.387Z',
        updated_at: '2024-11-19T02:07:47.387Z',
        deleted_at: null,
      };

      expect(result).toStrictEqual(expected);
    });

    it('should throw NotFoundError when data uncorrectly', async () => {
      const commentId = 'comment-xxx';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      await expect(
        likeRepositoryPostgres.findLikeByCommentIdAndUserId(commentId, userId)
      ).rejects.toThrowError(NotFoundError);
    });
  });

  describe('findCountLikeByCommentId function', () => {
    it('should data correctly', async () => {
      const commentId = 'comment-123';
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const likeRepositoryPostgres = new LikeRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      const result = await likeRepositoryPostgres.findCountLikeByCommentId(
        commentId,
        userId
      );

      // Assert
      const expected = {
        count: '1',
      };

      expect(result).toStrictEqual(expected);
    });
  });
});
