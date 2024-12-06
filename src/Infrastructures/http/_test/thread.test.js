const pool = require('../../database/postgres/pool');
const UsersTableTestHelper = require('../../../../tests/UsersTableTestHelper');
const AuthenticationsTableTestHelper = require('../../../../tests/AuthenticationsTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');
const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const CommentTableTestHelper = require('../../../../tests/CommentTableTestHelper');
const LikeTableTestHelper = require('../../../../tests/LikeTableTestHelper');

describe('/threads endpoint', () => {
  beforeEach(async () => {
    await UsersTableTestHelper.addUserLogin({});
    await ThreadTableTestHelper.addThread({});
    await CommentTableTestHelper.addComment({});
  });

  afterAll(async () => {
    await LikeTableTestHelper.cleanTable();
    await pool.end();
  });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await AuthenticationsTableTestHelper.cleanTable();
    await ThreadTableTestHelper.cleanTable();
    await CommentTableTestHelper.cleanTable();
  });

  describe('when POST /threads', () => {
    it('should response 201 and new threads', async () => {
      // Arrange
      const requestPayload = {
        title: 'title thread',
        body: 'body thread',
      };

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.addedThread).toBeDefined();
      expect(responseJson.data.addedThread.id).toBeDefined();
      expect(responseJson.data.addedThread.title).toBeDefined();
      expect(responseJson.data.addedThread.owner).toBeDefined();
    });

    it('should response 401 if no token', async () => {
      // Arrange
      const requestPayload = {
        title: 'title thread',
        body: 'body thread',
      };

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(401);
    });

    it('should response 400 if payload is not string', async () => {
      // Arrange
      const requestPayload = {
        title: 'title thread',
        body: {},
      };

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/threads',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });
  });

  describe('when POST /threads/{threadId}/comments', () => {
    it('should response 201 and new comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'content comment',
      };

      const threadId = 'thread-123';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.addedComment).toBeDefined();
      expect(responseJson.data.addedComment.id).toBeDefined();
      expect(responseJson.data.addedComment.content).toBeDefined();
      expect(responseJson.data.addedComment.owner).toBeDefined();
    });

    it('should response 401 no token', async () => {
      // Arrange
      const requestPayload = {
        content: 'content comment',
      };

      const threadId = 'thread-123';

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        payload: requestPayload,
      });

      // Assert
      expect(response.statusCode).toEqual(401);
    });

    it('should response 404 not found thread to add comment', async () => {
      // Arrange
      const requestPayload = {
        content: 'content comment',
      };

      const threadId = 'xxx';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 400 if payload is not same format', async () => {
      // Arrange
      const requestPayload = {
        content: {},
      };

      const threadId = 'thread-123';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/threads/${threadId}/comments`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
    });
  });

  describe('when DELETE /threads/{threadId}/comments/{commentId}', () => {
    it('should response 200 and delete comment owner', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const checkComment = await CommentTableTestHelper.findCommentById(
        commentId
      );

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(checkComment).toHaveLength(1);
    });

    it('should response 403 if comment not owner', async () => {
      // Arrange
      await UsersTableTestHelper.addUserLogin({
        id: 'user-xxx',
        fullname: 'xxx',
        password: 'xxx',
        username: 'xxx',
      });

      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'xxx',
          password: 'xxx',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(403);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 404 if thread not found', async () => {
      // Arrange
      const threadId = 'xxx';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 404 if comment not found', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'xxx';

      const server = await createServer(container);
      // Login
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/threads/${threadId}/comments/${commentId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
    });
  });

  describe('when GET /threads/{threadId}', () => {
    it('should response 200 get detail threads', async () => {
      // Arrange
      const threadId = 'thread-123';

      const server = await createServer(container);
      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data).toBeDefined();
      expect(responseJson.data.thread).toBeDefined();
      expect(responseJson.data.thread.id).toBeDefined();
      expect(responseJson.data.thread.title).toBeDefined();
      expect(responseJson.data.thread.body).toBeDefined();
      expect(responseJson.data.thread.date).toBeDefined();
      expect(responseJson.data.thread.username).toBeDefined();
      expect(responseJson.data.thread.comments).toBeDefined();
    });

    it('should response 404 not found thread', async () => {
      // Arrange
      const threadId = 'thread-xxx';

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/threads/${threadId}`,
      });

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('when GET /threads/{threadId}/comments/{commentId}/likes', () => {
    it('should response 401 when no autentication', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
      });

      // Assert
      expect(response.statusCode).toEqual(401);
    });

    it('should response 404 when thread id not found', async () => {
      // Arrange
      const threadId = 'thread-xxx';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Action
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 404 when comment id not found', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-xxx';

      const server = await createServer(container);
      // Action
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(404);
      expect(responseJson.status).toEqual('fail');
    });

    it('should response 200 when before nothing like comment', async () => {
      // Arrange
      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Action
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
    });

    it('should response 200 when before like comment to unlike', async () => {
      // Arrange
      LikeTableTestHelper.addLike({});

      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Action
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');

      const like = await LikeTableTestHelper.findLikeByCommentIdAndUserId(
        'comment-123',
        'user-123'
      );

      expect(like.deleted_at).not.toBeNull();
    });

    it('should response 200 when before unlike comment to like', async () => {
      // Arrange
      LikeTableTestHelper.addLike({
        deletedAt: new Date().toISOString(),
      });

      const threadId = 'thread-123';
      const commentId = 'comment-123';

      const server = await createServer(container);
      // Action
      const login = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dicoding',
          password: 'secret',
        },
      });

      const result = JSON.parse(login.payload);
      const { accessToken } = result.data;

      const response = await server.inject({
        method: 'PUT',
        url: `/threads/${threadId}/comments/${commentId}/likes`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');

      const like = await LikeTableTestHelper.findLikeByCommentIdAndUserId(
        'comment-123',
        'user-123'
      );

      expect(like.deleted_at).toBeNull();
    });
  });
});
