const InsertThread = require('../../Domains/threads/entities/InsertThread');
const NewThread = require('../../Domains/threads/entities/NewThread');
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
}

module.exports = ThreadRepositoryPostgres;
