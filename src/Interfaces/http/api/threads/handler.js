const NewThreadUseCase = require('../../../../Applications/use_case/NewThreadUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;

    this.postThreadHandler = this.postThreadHandler.bind(this);
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
}

module.exports = ThreadsHandler;
