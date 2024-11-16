/* eslint-disable object-curly-newline */
class InsertComment {
  constructor(payload) {
    this._verifyPayload(payload);

    this.id = payload.id;
    this.threadId = payload.threadId;
    this.content = payload.content;
    this.owner = payload.owner;
  }

  _verifyPayload(payload) {
    const { id, threadId, content, owner } = payload;

    if (!id || !threadId || !content || !owner) {
      throw new Error('INSERT_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof threadId !== 'string' ||
      typeof content !== 'string' ||
      typeof owner !== 'string'
    ) {
      throw new Error('INSERT_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = InsertComment;
