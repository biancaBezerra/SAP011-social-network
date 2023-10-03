import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from 'firebase/firestore';

import {
  createPost,
  fetchPosts,
  likeCounter,
  unlikeCounter,
  editPost,
  deletePost,
  userData,
} from '../src/firebase/firebaseStore';

jest.mock('firebase/firestore');

// Aqui, é feita uma configuração antes de cada teste. O jest.resetAllMocks() é
// chamado para redefinir todos os mocks antes de cada teste para garantir que não
// haja interações inesperadas entre os testes.
beforeEach(() => {
  jest.resetAllMocks();
});

// teste para criar posts e salvar na coleção
describe('createPost function', () => {
  it('expected to create a post and save it in the collection', async () => {
    addDoc.mockResolvedValueOnce();
    const dubleCollection = 'collection';
    collection.mockReturnValueOnce(dubleCollection);

    const postDate = 'dd/mm/aaaa';
    const username = 'usernameTeste';
    const post = 'texto';
    const userId = 'uidTeste';
    const newPost = {
      date: postDate,
      username,
      likes: [],
      text: post,
      uid: userId,
    };
    await createPost(postDate, username, post, userId);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(dubleCollection, newPost);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'posts');
  });
});

// Primeiro criamos as amostras dos teste para comparar a ordenação das postagens
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
  date: 3,
  username: 'user3',
  text: '3 - terceiro post criado no input de texto',
  uid: 'uid03',
};

const postUser4 = {
  date: 3,
  username: 'user4',
  text: '4 - quarto post criado no input de texto',
  uid: 'uid04',
};

// teste para ordenação dos posts em ordem decrescente
const publicPosts = [postUser4, postUser3, postUser2, postUser1];
describe('FetchPosts function', () => {
  it('Expected to return an array of posts ordered by data and descending time', async () => {
    const data = [
      { data: () => postUser1 },
      { data: () => postUser4 },
      { data: () => postUser2 },
      { data: () => postUser3 },
    ];
    const postsCollection = { docs: data };
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

// criando amostras para iterar sobre os testes de like e unlike
const postLike = {
  id: 111,
  likes: ['user2', 'user1', 'user3'],
};

// teste para a contagem de likes
const userLikes = 'user4';

describe('likeCounter function', () => {
  it('The user is expected to be added to the likes array', async () => {
    const objectReference = {};
    const likeArray = ['user1', 'user2', 'user3', 'user4'];

    updateDoc.mockResolvedValueOnce();
    arrayUnion.mockReturnValueOnce(likeArray);
    doc.mockReturnValueOnce(objectReference);

    await likeCounter(postLike.id, userLikes);

    expect(typeof likeCounter).toBe('function');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postLike.id);
    expect(arrayUnion).toHaveBeenCalledTimes(1);
    expect(arrayUnion).toHaveBeenCalledWith(userLikes);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(objectReference, {
      likes: likeArray,
    });
  });
});

const userUnlikes = 'user1';

describe('unlikeCounter function', () => {
  it('Expected the user to be removed from the likes array', async () => {
    const objectReference = {};
    const unlikeArray = ['user2', 'user3'];

    updateDoc.mockResolvedValueOnce();
    arrayRemove.mockReturnValueOnce(unlikeArray);
    doc.mockReturnValueOnce(objectReference);

    await unlikeCounter(userLikes.id, userUnlikes);

    expect(typeof unlikeCounter).toBe('function');
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', userLikes.id);
    expect(arrayRemove).toHaveBeenCalledTimes(1);
    expect(arrayRemove).toHaveBeenCalledWith(userUnlikes);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(objectReference, {
      likes: unlikeArray,
    });
  });
});

// Teste da função deleteDoc do Firestore
describe('deletePost function', () => {
  it('expected to delete post with given ID', async () => {
    const postId = 'post1';

    await deletePost(postId);

    expect(deleteDoc).toHaveBeenCalledWith(doc(undefined, 'posts', postId));
  });
});

// Teste da função apagar post pagina Feed
describe('deletePost feed function', () => {
  it('expected to delete the post from the feed', async () => {
    const dubleDoc = 'doc';
    doc.mockReturnValueOnce(dubleDoc);
    deleteDoc.mockResolvedValueOnce();
    const postId = 'id-post';
    await deletePost(postId);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(deleteDoc).toHaveBeenCalledTimes(1);
    expect(deleteDoc).toHaveBeenCalledWith(dubleDoc);
  });
});

// Teste da função editar post Feed
describe('editPost function', () => {
  it('expected to edit a post', async () => {
    updateDoc.mockResolvedValue();
    const dubleDoc = 'doc';
    doc.mockReturnValueOnce(dubleDoc);
    const postId = 'idPost';
    const inputText = 'postContent';
    const updatedPost = {
      text: inputText,
    };
    await editPost(postId, inputText);
    expect(doc).toHaveBeenCalledTimes(1);
    expect(doc).toHaveBeenCalledWith(undefined, 'posts', postId);
    expect(updateDoc).toHaveBeenCalledTimes(1);
    expect(updateDoc).toHaveBeenCalledWith(dubleDoc, updatedPost);
  });
});

// Teste da função UserData
describe('userData function', () => {
  it('expected to access user data and save it in the collection', async () => {
    addDoc.mockResolvedValueOnce();
    const dubleCollection = 'collection';
    collection.mockReturnValueOnce(dubleCollection);
    const name = 'nome';
    const lastname = 'sobrenome';
    const email = 'teste@email.com';
    const username = 'displayName';
    const infosAdd = {
      name,
      lastname,
      email,
      username,
    };
    await userData(name, lastname, email, username);

    expect(addDoc).toHaveBeenCalledTimes(1);
    expect(addDoc).toHaveBeenCalledWith(dubleCollection, infosAdd);
    expect(collection).toHaveBeenCalledTimes(1);
    expect(collection).toHaveBeenCalledWith(undefined, 'infos-add');
  });
});
