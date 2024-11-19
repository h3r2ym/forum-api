class ReplyRepository {
  async addReply(commentId, userid, newComment) {
    throw new Error('REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkReplyById(id) {
    throw new Error('REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRepliesByCommentId(commentId) {
    throw new Error('REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async checkReplyOwnerById(replyId, userId) {
    throw new Error('REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async deleteReplyById(replayId) {
    throw new Error('REPLY_RESPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ReplyRepository;
