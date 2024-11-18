/* eslint-disable object-curly-newline */
class InsertReply {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.commentId = payload.commentId;
    this.content = payload.content;
    this.owner = payload.owner;
  }

  _verifyPayload(payload) {
    const { id, commentId, content, owner } = payload;

    if (!id || !commentId || !content || !owner) {
      throw new Error('INSERT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof commentId !== 'string' ||
      typeof content !== 'string' ||
      typeof owner !== 'string'
    ) {
      throw new Error('INSERT_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = InsertReply;
