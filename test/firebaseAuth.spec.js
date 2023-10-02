// Aqui, estão sendo importadas algumas funções e objetos relacionados à
// autenticação do Firebase. Por exemplo, createUserWithEmailAndPassword é uma
// função para criar um novo usuário com e-mail e senha.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

// O Jest é uma estrutura de teste para JavaScript. As funções do Firebase são
// "mockadas" usando o jest.mock. Isso significa que, em vez de chamar as funções
// reais do Firebase durante os testes, ele usará versões simuladas dessas funções.
import {
  createUser,
  signIn,
  signInGoogle,
  logOut,
} from '../src/firebase/firebaseAuth';

jest.mock('firebase/auth');

// Aqui, é feita uma configuração antes de cada teste. O jest.resetAllMocks() é
// chamado para redefinir todos os mocks antes de cada teste para garantir que não
// haja interações inesperadas entre os testes.
beforeEach(() => {
  jest.resetAllMocks();
});

const email = 'cashnet@email.com';
const password = 'password';
const displayName = 'userName';

const invalidEmail = 'test.email.com';
const invalidPassword = '123';

const provider = new GoogleAuthProvider();

describe('Função de criar usuário', () => {
  it('create a new user and update profile', async () => {
    const userData = {
      user: {},
    };
    createUserWithEmailAndPassword.mockResolvedValueOnce(userData);
    updateProfile.mockResolvedValueOnce();

    await createUser(email, password, displayName);
    expect(typeof createUser).toBe('function');
    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
    expect(updateProfile).toHaveBeenCalledTimes(1);
    expect(updateProfile).toHaveBeenCalledWith(userData.user, { displayName });
  });
  it('when the email is invalid', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email'));

    await expect(createUser(invalidEmail, password)).rejects.toThrow('Invalid email');

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, invalidEmail, password);
    expect(updateProfile).not.toHaveBeenCalled();
  });

  it('when the password is invalid', async () => {
    createUserWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid password'));

    await expect(createUser(email, invalidPassword)).rejects.toThrow('Invalid password');

    expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, invalidPassword);
    expect(updateProfile).not.toHaveBeenCalled();
  });
});

describe('Função de Login', () => {
  it('successful login', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce();

    await signIn(email, password);

    expect(typeof signIn).toBe('function');
    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, password);
  });

  it('expected when email is invalid', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid email'));

    await expect(signIn(invalidEmail, password)).rejects.toThrow('Invalid email');

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, invalidEmail, password);
  });

  it('expected when password is invalid', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce(new Error('Invalid password'));

    await expect(signIn(email, invalidPassword)).rejects.toThrow('Invalid password');

    expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, email, invalidPassword);
  });
});

describe('Função de logar com Google', () => {
  it('successful login Google account', async () => {
    signInWithPopup.mockResolvedValueOnce();

    await signInGoogle();

    expect(typeof signInGoogle).toBe('function');
    expect(signInWithPopup).toHaveBeenCalledTimes(1);
    expect(signInWithPopup).toHaveBeenCalledWith(undefined, provider);
  });
});

describe('função de sair da conta', () => {
  it('successful logout', async () => {
    await logOut();
    expect(signOut).toHaveBeenCalled();
  });
});

// usamos o async no inicio das funções de teste para poder chamar o await
// que vai aguardar a autenticação das operações assincronas dentro do teste.

// A variável userData é usada para simular os dados que seriam retornados pela
// função createUserWithEmailAndPassword,O objeto userData é um exemplo simulado
// do que essa função poderia retornar.

// usei os dublês do Mock para garantir que estou testando apenas o comportamento da função,
// sem depender do comportamento real da função. É isso que faz o MockResolvedValueOnce.

// o tohavebeencalledTimes verifica se a função foi chamada uma vez como determinado. É um
// Match do Jest, para verificar se as condições são verdadeiras

// o tohavebeencalledWith verifica se a função foi chamada com os argumentos que passamos a ela.
// Também é um Match

// o mockRejectedValueOnce é para simular o cenário em que uma promisse é rejeitada.

// o toThrow é um match usado como uma promise no Jest, verificando se a promise é rejeitada
// e se a mensagem de erro corresponde à mensagem esperada.

// not.toHaveBeenCalled() é um matcher que verifica se o dublê foi chamado. O NOT NA FRENTE
// Verifica se a função NÃO foi executada durante o teste.
