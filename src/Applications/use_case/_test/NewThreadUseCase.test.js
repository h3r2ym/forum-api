const InsertThread = require('../../../Domains/threads/entities/InsertThread');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const NewThreadUseCase = require('../NewThreadUseCase');

describe('NewThreadUseCase', () => {
  it('should add new thread on action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: '123',
      body: 'body 123',
      owner: 'user-123',
    };

    const mockNewThread = new InsertThread({
      id: 'thread-123',
      title: useCasePayload.title,
      body: useCasePayload.body,
      owner: 'user-123',
    });

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    /** mocking needed function */
    mockThreadRepository.addThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockNewThread));

    const newThreadUseCase = new NewThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    const addThread = await newThreadUseCase.execute(
      useCasePayload.owner,
      useCasePayload
    );

    // Assert
    expect(addThread).toStrictEqual(
      new InsertThread({
        id: 'thread-123',
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      })
    );

    expect(mockThreadRepository.addThread).toBeCalledWith(
      useCasePayload.owner,
      new NewThread({
        title: useCasePayload.title,
        body: useCasePayload.body,
        owner: useCasePayload.owner,
      })
    );
  });

  it('should add new thread on incorrectly payload', async () => {
    // Arrange
    const owner = 'user-123';

    /** creating dependency of use case */
    const mockThreadRepository = new ThreadRepository();

    const newThreadUseCase = new NewThreadUseCase({
      threadRepository: mockThreadRepository,
    });

    // Action
    // Assert
    await expect(newThreadUseCase.execute(owner, {})).rejects.toThrowError(
      Error
    );
  });
});
