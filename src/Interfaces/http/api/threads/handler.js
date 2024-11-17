const DeleteCommentUseCase = require('../../../../Applications/use_case/DeleteCommentUseCase');
const DetailThreadUseCase = require('../../../../Applications/use_case/DetailThreadUseCase');
const NewCommentUseCase = require('../../../../Applications/use_case/NewCommentUseCase');
const NewThreadUseCase = require('../../../../Applications/use_case/NewThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
    this.postCommentHandler = this.postCommentHandler.bind(this);
    this.getThreadByIdHandler = this.getThreadByIdHandler.bind(this);
    this.deleteCommentHandler = this.deleteCommentHandler.bind(this);
  }

  async postThreadHandler(request, h) {
    const newThreadUseCase = this._container.getInstance(NewThreadUseCase.name);
    const { id: userId } = request.auth.credentials;

    const addedThread = await newThreadUseCase.execute(userId, request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedThread,
      },
    });
    response.code(201);
    return response;
  }

  async postCommentHandler(request, h) {
    const newCommentUseCase = this._container.getInstance(
      NewCommentUseCase.name
    );

    const { threadId } = request.params;
    const { id: userId } = request.auth.credentials;

    const addedComment = await newCommentUseCase.execute(
      threadId,
      userId,
      request.payload
    );

    const response = h.response({
      status: 'success',
      data: {
        addedComment,
      },
    });

    response.code(201);
    return response;
  }

  async getThreadByIdHandler(request) {
    const detailThreadUseCase = this._container.getInstance(
      DetailThreadUseCase.name
    );

    const { threadId } = request.params;

    const thread = await detailThreadUseCase.execute(threadId);

    return {
      status: 'success',
      data: {
        thread,
      },
    };
  }

  async deleteCommentHandler(request) {
    const deleteCommentUseCase = this._container.getInstance(
      DeleteCommentUseCase.name
    );

    const { threadId, commandId } = request.params;
    const { id: userId } = request.auth.credentials;

    await deleteCommentUseCase.execute(threadId, commandId, userId);

    return {
      status: 'success',
    };
  }
}

module.exports = ThreadsHandler;
