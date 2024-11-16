const InsertComment = require('../InsertComment');

describe('a InsertComment entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
    };

    // Action and Assert
    expect(() => new InsertComment(payload)).toThrowError(
      'INSERT_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: {},
      owner: {},
    };

    // Action and Assert
    expect(() => new InsertComment(payload)).toThrowError(
      'INSERT_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'comment-123',
      threadId: 'thread-123',
      content: 'comment content',
      owner: 'user-123',
    };

    // Action
    const newThread = new InsertComment(payload);

    // Assert
    expect(newThread.id).toEqual(payload.id);
    expect(newThread.threadId).toEqual(payload.threadId);
    expect(newThread.content).toEqual(payload.content);
    expect(newThread.owner).toEqual(payload.owner);
  });
});
