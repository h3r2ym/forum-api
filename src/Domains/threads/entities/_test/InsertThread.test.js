const InsertThread = require('../InsertThread');

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
    };

    // Action and Assert
    expect(() => new InsertThread(payload)).toThrowError(
      'INSERT_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'dicoding',
      body: 'body dicoding',
      owner: {},
    };

    // Action and Assert
    expect(() => new InsertThread(payload)).toThrowError(
      'INSERT_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      id: 'thread-123',
      title: 'title dicoding',
      body: 'body dicoding',
      owner: 'user-22231',
    };

    // Action
    const newThread = new InsertThread(payload);

    // Assert
    expect(newThread).toStrictEqual(
      new InsertThread({
        id: 'thread-123',
        title: 'title dicoding',
        body: 'body dicoding',
        owner: 'user-22231',
      })
    );
  });
});
