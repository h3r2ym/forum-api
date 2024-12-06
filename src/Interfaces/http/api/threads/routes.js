const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: handler.postThreadHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: handler.getThreadByIdHandler,
  },
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: handler.postCommentHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commandId}',
    handler: handler.deleteCommentHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commandId}/likes',
    handler: handler.putLikeCommentHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = routes;
