import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
  } from 'firebase/auth';
  
  import { auth } from './fireBaseConfig.js';


  // export function login (email, password) {

  //   signInWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     // Signed in 
  //     console.log("deu certo!!!");
  //     const user = userCredential.user;
  //     // ...
  //   })
  //   .catch((error) => {
  //     const errorCode = error.code;
  //     const errorMessage = error.message;
  //     console.log(errorCode, errorMessage);
  //   });
  // }

  // cadastro de usuarios novos
export const createUser = (
  email,
  password,
  displayName,
) => createUserWithEmailAndPassword(
  auth,
  email,
  password,
).then((userCredential) => {
  // Depois que criou o usuário executa a função baixo
  const user = userCredential.user; // atualiza o perfil do usuário
  return updateProfile(user, { displayName });
});

//login do usuario
export const signIn = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const signInGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

export const logOut = () => signOut(auth);
