import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthUserService from './AuthUserService';
import CreateUserService from './CreateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthUser', () => {
  it('should be able to authendicate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: 'test',
      email: 'teste@teste.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should be able to authendicate with non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    expect(
      authUser.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authendicate with wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authUser = new AuthUserService(fakeUsersRepository, fakeHashProvider);

    await createUser.execute({
      name: 'test',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'teste@teste.com',
        password: 'wrongpass',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
