const ThreadTableTestHelper = require('../../../../tests/ThreadTableTestHelper');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const pool = require('../../database/postgres/pool');
const ThreadRepositoryPostgres = require('../ThreadRepositoryPostgres');

describe('ThreadRepositoryPostgres', () => {
  afterEach(async () => {
    await ThreadTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('addThread function', () => {
    it('should not throw InvariantError when data correctly', async () => {
      const newThread = {
        title: 'title 123',
        body: 'body 123',
      };
      const userId = 'user-123';

      const fakeIdGenerator = () => '123';
      const threadRepositoryPostgres = new ThreadRepositoryPostgres(
        pool,
        fakeIdGenerator
      );

      // Action
      await threadRepositoryPostgres.addThread(userId, newThread);

      // Assert
      const threads = await ThreadTableTestHelper.findThreadById('thread-123');
      expect(threads).toHaveLength(1);
    });
  });
});
