const NewThread = require('../NewThread');

describe('a NewThread entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
      owner: {},
    };

    // Action and Assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create newThread object correctly', () => {
    // Arrange
    const payload = {
      title: 'dicoding',
      owner: 'user-22231',
    };

    // Action
    const newThread = new NewThread(payload);

    // Assert
    expect(newThread.title).toEqual(payload.title);
    expect(newThread.owner).toEqual(payload.owner);
  });
});
