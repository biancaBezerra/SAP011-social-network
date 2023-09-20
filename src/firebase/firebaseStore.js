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
    
  import { db } from './firebaseConfig';
  

  export const userData = (
    nameContent,
    lastnameContent,
    emailContent,
    userContent,
  ) => addDoc(collection(db, 'infos-add'), {
    name: nameContent,
    lastname: lastnameContent,
    email: emailContent,
    username: userContent,
  });
  
// funções de postagens

export const createPost  = (
  date,
  username,
  text,
  uid,
) => addDoc (collection(db, 'posts'), {
  date,
  username,
  likes: [],
  text,
  uid,
});

export const fetchPosts = async() => {
  const postsCollection = collection(db, 'posts');
  const snapshot = await getDocs(postsCollection);
  const posts = [];

  snapshot.forEach((firePost) => {
    const post = firePost.data();

    post.id = firePost.id;
    posts.push(post);
  });

  posts.sort((post1, post2) => {
    if (post1.date > post2.date) {
      return -1;
    }

    if (post1.date < post2.date) {
      return 1;
    }

    return 0;
  });

  return posts;
};

export const likeCounter = async(postId, username) => updateDoc(doc(db,'posts', postId), {
  likes: arrayUnion(username),
});

export const unlikeCounter = async (postId, username) => updateDoc(doc(db, 'posts', postId), {
  likes: arrayRemove(username),
});

export const editPost = async (postId, newText) => {
  await updateDoc(doc(db, 'posts', postId), {
    text: newText,
  });
};

export const deletePost = async (postId) => {
  await deleteDoc(doc(db, 'posts', postId));
};

  