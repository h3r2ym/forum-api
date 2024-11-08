const AuthenticationRepository = require('../../../Domains/authentications/AuthenticationRepository');
const NewAuth = require('../../../Domains/authentications/entities/NewAuth');
const NewThread = require('../../../Domains/threads/entities/NewThread');
const ThreadRepository = require('../../../Domains/threads/ThreadRepository');
const UserRepository = require('../../../Domains/users/UserRepository');
const AuthenticationTokenManager = require('../../security/AuthenticationTokenManager');
const NewThreadUserCase = require('../NewThreadUserCase');
const NewThreadUseCase = require('../NewThreadUserCase');

describe('NewThreadUseCase', () => {
  it('should add new thread on action correctly', async () => {
    // Arrange
    const useCasePayload = {
      title: '123',
      owner: 'user-123',
    };

    const mockNewThread = new NewThread({
      id: 'thread-123',
      title: useCasePayload.title,
      owner: useCasePayload.owner,
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
    const addThread = await newThreadUseCase.execute(useCasePayload);

    // Assert
    expect(addThread).toStrictEqual(
      new NewThread({
        id: 'thread-123',
        title: useCasePayload.title,
        owner: useCasePayload.owner,
      })
    );

    expect(mockThreadRepository.addThread).toBeCalledWith(
      new NewThread({
        title: useCasePayload.title,
        owner: useCasePayload.owner,
      })
    );
  });
});
