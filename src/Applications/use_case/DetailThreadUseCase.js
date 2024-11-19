class DetailThreadUseCase {
  constructor({ threadRepository, replyRepository }) {
    this._threadRepository = threadRepository;
    this._replyRepository = replyRepository;
  }

  async execute(threadId) {
    const result = await this._threadRepository.getThreadById(threadId);
    const getComments = await this._threadRepository.getCommendsByThreadId(
      threadId
    );

    const comments = await Promise.all(
      getComments.map(async (comment) => {
        const getReplies = await this._replyRepository.getRepliesByCommentId(
          comment.id
        );

        const replies = getReplies.map((reply) => ({
          id: reply.id,
          content: !reply.deleted_at
            ? reply.content
            : '**balasan telah dihapus**',
          date: reply.created_at,
          username: reply.username,
        }));

        return {
          id: comment.id,
          content: !comment.deleted_at
            ? comment.content
            : '**komentar telah dihapus**',
          date: comment.created_at,
          username: comment.username,
          replies,
        };
      })
    );

    return {
      id: result.id,
      title: result.title,
      body: result.body,
      date: result.created_at,
      username: result.username,
      comments,
    };
  }
}

module.exports = DetailThreadUseCase;
