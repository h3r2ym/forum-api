// /* istanbul ignore file */
const pool = require('../src/Infrastructures/database/postgres/pool');

const LikeTableTestHelper = {
  async addLike({
    id = 'like-123',
    commentId = 'comment-123',
    owner = 'user-123',
    createdAt = '2024-11-19T02:07:47.387Z',
    updatedAt = '2024-11-19T02:07:47.387Z',
    deletedAt = null,
  }) {
    const query = {
      text: 'INSERT INTO likes VALUES($1, $2, $3, $4, $5, $6)',
      values: [id, commentId, owner, createdAt, updatedAt, deletedAt],
    };

    await pool.query(query);
  },

  async findLikeById(id) {
    const query = {
      text: 'SELECT * FROM likes WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async findLikeByCommentIdAndUserId(commentId, userId) {
    const query = {
      text: 'SELECT * FROM likes WHERE comment_id = $1 AND owner = $2',
      values: [commentId, userId],
    };

    const result = await pool.query(query);
    return result.rows[0];
  },

  async cleanTable() {
    await pool.query('DELETE FROM likes WHERE 1=1');
  },
};

module.exports = LikeTableTestHelper;
