const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InsertThread = require('../../Domains/threads/entities/InsertThread');
const ThreadRepository = require('../../Domains/threads/ThreadRepository');

class ThreadRepositoryPostgres extends ThreadRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addThread(userId, newThread) {
    const { title, body } = newThread;
    const id = `thread-${this._idGenerator()}`;
    const time = new Date().toISOString();
    const createdAt = time;
    const updatedAt = time;

    const query = {
      text: 'INSERT INTO threads VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, title, body, owner',
      values: [id, title, body, userId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return new InsertThread({
      id: row.id,
      title: row.title,
      body: row.body,
      owner: row.owner,
    });
  }

  async checkThreadById(threadId) {
    const query = {
      text: 'SELECT * from threads WHERE id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Data thread tidak ditemukan');
    }

    return result.rows[0];
  }

  async getThreadById(threadId) {
    const query = {
      text: 'SELECT threads.*,users.username from threads LEFT JOIN users ON threads.owner = users.id WHERE threads.id = $1',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Data thread tidak ditemukan');
    }

    return result.rows[0];
  }

  async addComment(threadId, userId, newComment) {
    const { content } = newComment;
    const id = `comment-${this._idGenerator()}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO comments VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, content, owner',
      values: [id, threadId, content, userId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return {
      id: row.id,
      content: row.content,
      owner: row.owner,
    };
  }

  async getCommendsByThreadId(threadId) {
    const query = {
      text: 'SELECT comments.*,users.username FROM comments INNER JOIN users ON comments.owner = users.id WHERE thread_id = $1 ORDER BY created_at ASC',
      values: [threadId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async checkCommentOwner(commentId, userId) {
    const query = {
      text: 'SELECT * FROM comments WHERE id = $1',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Comment tidak ditemukan');
    }

    if (result.rows[0].owner !== userId) {
      throw new AuthorizationError('Anda bukan pemilik comment ini');
    }
  }

  async deleteCommentById(commentId) {
    const updatedAt = new Date().toISOString();
    const deletedAt = updatedAt;

    const query = {
      text: 'UPDATE comments SET updated_at = $2, deleted_at = $3 WHERE id = $1 RETURNING id',
      values: [commentId, updatedAt, deletedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Hapus comment gagal');
    }

    return result.rows[0];
  }
}

module.exports = ThreadRepositoryPostgres;
