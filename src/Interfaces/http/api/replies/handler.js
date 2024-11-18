const DeleteReplyUseCase = require('../../../../Applications/use_case/DeleteReplyUseCase');
const NewCommentUseCase = require('../../../../Applications/use_case/NewCommentUseCase');
const NewReplyUseCase = require('../../../../Applications/use_case/NewReplyUseCase');

class ReplyHandler {
  constructor(container, validator) {
    this._container = container;
    this._validator = validator;

    this.postReplyHandler = this.postReplyHandler.bind(this);
    this.deleteReplyHandler = this.deleteReplyHandler.bind(this);
  }

  async postReplyHandler(request, h) {
    this._validator.validateReplyPayload(request.payload);

    const newReplyUseCase = this._container.getInstance(NewReplyUseCase.name);
    const { threadId, commentId } = request.params;
    const { id: userId } = request.auth.credentials;

    const addedReply = await newReplyUseCase.execute(
      threadId,
      commentId,
      userId,
      request.payload
    );

    const response = h.response({
      status: 'success',
      data: {
        addedReply,
      },
    });

    response.code(201);
    return response;
  }

  async deleteReplyHandler(request, h) {
    const deleteReplyUseCase = this._container.getInstance(
      DeleteReplyUseCase.name
    );

    const { threadId, commentId, replyId } = request.params;
    const { id: userId } = request.auth.credentials;

    await deleteReplyUseCase.execute(threadId, commentId, replyId, userId);

    const response = h.response({
      status: 'success',
    });
    return response;
  }
}

module.exports = ReplyHandler;
