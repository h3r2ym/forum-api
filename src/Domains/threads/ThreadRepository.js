class ThreadRepository {
  async addThread(userid, newThread) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async addComment(threadId, userid, newComment) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkThreadById(threadId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getThreadById(threadId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommendsByThreadId(threadId) {
    throw new Error('THREAD_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadRepository;
