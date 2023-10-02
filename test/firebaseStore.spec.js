import {
  collection,
  // addDoc,
  getDocs,
  // updateDoc,
  // doc,
  // arrayUnion,
  // arrayRemove,
  // deleteDoc,
} from 'firebase/firestore';

import {
  // createPost,
  fetchPosts,
  // likeCounter,
  // unlikeCounter,
  // editPost,
  // deletePost,
} from '../src/firebase/firebaseStore';

jest.mock('firebase/firestore');

// Aqui, é feita uma configuração antes de cada teste. O jest.resetAllMocks() é
// chamado para redefinir todos os mocks antes de cada teste para garantir que não
// haja interações inesperadas entre os testes.
beforeEach(() => {
  jest.resetAllMocks();
});

// Primeiro criamos as amostras dos teste

const postUser1 = {
  date: 1,
  username: 'user1',
  text: '1 - primeiro post criado no input de texto',
  uid: 'uid01',
};

const postUser2 = {
  date: 2,
  username: 'user2',
  text: '2 - segundo post criado no input de texto',
  uid: 'uid02',
};

const postUser3 = {
  date: 2,
  username: 'user3',
  text: '3 - terceiro post criado no input de texto',
  uid: 'uid03',
};

const publicPosts = [postUser3, postUser2, postUser1];
describe('FetchPosts function', () => {
  it('Expected to return an array of posts ordered by data and descending time', async () => {
    const data = [
      { data: () => postUser3 },
      { data: () => postUser2 },
      { data: () => postUser1 },
    ];
    const postsCollection = { data };
    collection.mockReturnValueOnce(postsCollection);
    getDocs.mockResolvedValueOnce(data);

    const returned = await fetchPosts();

    expect(typeof fetchPosts).toBe('function');
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
    expect(getDocs).toHaveBeenCalledTimes(1);
    expect(getDocs).toHaveBeenCalledWith(postsCollection);
    expect(returned).toEqual(publicPosts);
  });
});
