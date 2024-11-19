const AuthorizationError = require('../../Commons/exceptions/AuthorizationError');
const InvariantError = require('../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const InsertReply = require('../../Domains/threads/entities/InsertReply');
const ReplyRepository = require('../../Domains/threads/ReplyRepository');

class ReplyRepositoryPostgres extends ReplyRepository {
  constructor(pool, idGenerator) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReply(commentId, userId, newReplay) {
    const { content } = newReplay;
    const id = `reply-${this._idGenerator()}`;
    const time = new Date().toISOString();
    const createdAt = time;
    const updatedAt = time;

    const query = {
      text: 'INSERT INTO replies VALUES ($1,$2,$3,$4,$5,$6) RETURNING id, comment_id, content, owner',
      values: [id, commentId, content, userId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return new InsertReply({
      id: row.id,
      commentId: row.comment_id,
      content: row.content,
      owner: row.owner,
    });
  }

  async getRepliesByCommentId(commentId) {
    const query = {
      text: 'SELECT replies.*,users.username from replies INNER JOIN users ON replies.owner = users.id WHERE comment_id = $1 ORDER BY created_at ASC',
      values: [commentId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }

  async checkReplyById(id) {
    const query = {
      text: 'SELECT * from replies WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Data reply tidak ditemukan');
    }

    return result.rows[0];
  }

  async checkReplyOwnerById(replyId, userId) {
    const query = {
      text: 'SELECT * from replies WHERE id = $1',
      values: [replyId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('reply tidak ditemukan');
    }

    if (result.rows[0].owner !== userId) {
      throw new AuthorizationError('Ada bukan pemilik reply ini');
    }

    return result.rows[0];
  }

  async deleteReplyById(replyId) {
    const updatedAt = new Date().toISOString();
    const deletedAt = updatedAt;

    const query = {
      text: 'UPDATE replies SET updated_at = $2, deleted_at = $3 WHERE id = $1 RETURNING id',
      values: [replyId, updatedAt, deletedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Hapus reply gagal');
    }

    return result.rows[0];
  }
}

module.exports = ReplyRepositoryPostgres;
