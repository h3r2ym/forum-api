const InvariantError = require('../../Commons/exceptions/InvariantError');
const NewThread = require('../../Domains/threads/entities/NewThread');

class DetailThreadUseCase {
  constructor({ threadRepository }) {
    this._threadRepository = threadRepository;
  }

  async execute(threadId) {
    const result = await this._threadRepository.getThreadById(threadId);
    const comments = await this._threadRepository.getCommendsByThreadId(
      threadId
    );

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      date: result.created_at,
      username: result.username,
      comments: comments.map((row) => ({
        id: row.id,
        username: row.username,
        date: row.created_at,
        content: !row.deleted_at ? row.content : '**komentar telah dihapus**',
      })),
    };
  }
}

module.exports = DetailThreadUseCase;
