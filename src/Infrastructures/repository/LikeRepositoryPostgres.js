const NotFoundError = require('../../Commons/exceptions/NotFoundError');
const LikeRepository = require('../../Domains/threads/LikeRepository');

class LikeRepositoryPostgres extends LikeRepository {
  constructor(pool, idGenerator, time = new Date().toISOString()) {
    super();
    this._pool = pool;
    this._idGenerator = idGenerator;
    this._time = time;
  }

  async addLike(commentId, userId) {
    const id = `like-${this._idGenerator()}`;
    const createdAt = this._time;
    const updatedAt = this._time;

    const query = {
      text: 'INSERT INTO likes VALUES ($1,$2,$3,$4,$5) RETURNING id',
      values: [id, commentId, userId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return row;
  }

  async updateLike(commentId, userId) {
    const updatedAt = this._time;
    const deletedAt = null;

    const query = {
      text: 'UPDATE likes SET updated_at = $3 , deleted_at = $4 WHERE comment_id = $1 AND owner = $2 RETURNING id',
      values: [commentId, userId, updatedAt, deletedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return row;
  }

  async deleteLike(commentId, userId) {
    const updatedAt = this._time;
    const deletedAt = this._time;

    const query = {
      text: 'UPDATE likes SET updated_at = $3 , deleted_at = $4 WHERE comment_id = $1 AND owner = $2 RETURNING id',
      values: [commentId, userId, updatedAt, deletedAt],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return row;
  }

  async findLikeByCommentIdAndUserId(commentId, userId) {
    const query = {
      text: 'SELECT * FROM likes WHERE comment_id = $1 AND owner = $2',
      values: [commentId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0]) {
      throw new NotFoundError('Data tidak ditemukan');
    }

    return result.rows[0];
  }

  async findCountLikeByCommentId(commentId) {
    const query = {
      text: 'SELECT count(id) as count FROM likes WHERE comment_id = $1 AND deleted_at is null',
      values: [commentId],
    };

    const result = await this._pool.query(query);
    const row = result.rows[0];

    return row;
  }
}

module.exports = LikeRepositoryPostgres;
