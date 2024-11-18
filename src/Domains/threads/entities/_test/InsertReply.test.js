const InsertReply = require('../InsertReply');

describe('a InsertReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {};

    // Action and Assert
    expect(() => new InsertReply(payload)).toThrowError(
      'INSERT_REPLY.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      commentId: 'comment-123',
      content: {},
      owner: 'user-123',
    };

    // Action and Assert
    expect(() => new InsertReply(payload)).toThrowError(
      'INSERT_REPLY.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create InsertReply object correctly', () => {
    // Arrange
    const payload = {
      id: 'reply-123',
      commentId: 'comment-123',
      content: 'reply content',
      owner: 'user-123',
    };

    // Action
    const insertReply = new InsertReply(payload);

    // Assert
    expect(insertReply.id).toEqual(payload.id);
    expect(insertReply.commentId).toEqual(payload.commentId);
    expect(insertReply.content).toEqual(payload.content);
    expect(insertReply.owner).toEqual(payload.owner);
  });
});
