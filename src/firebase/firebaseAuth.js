import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
  } from 'firebase/auth';
  
  import { auth } from './fireBaseConfig.js';



  export function login (email, password) {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      console.log("deu certo!!!");
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
  }

  // cadastro de usuarios novos
export const createUser = (
  email,
  password,
  userName,
) => createUserWithEmailAndPassword(
  auth,
  email,
  password,
).then((userCredential) => {
  // Depois que criou o usuário executa a função baixo
  const user = userCredential.user; // atualiza o perfil do usuário
  return updateProfile(user, { userName });
});


//   O código importa funções do Firebase Authentication (autenticação) para:

// createUserWithEmailAndPassword: Criar um novo usuário com e-mail e senha.
// signInWithEmailAndPassword: Autenticar um usuário com e-mail e senha.
// GoogleAuthProvider: Provedor de autenticação do Google.
// signInWithPopup: Realizar autenticação usando um popup (por exemplo, com o Google).
// signOut: Desconectar o usuário autenticado.
// updateProfile: Atualizar informações de perfil do usuário autenticado.
// Ele também importa a referência ao serviço de autenticação Firebase, auth, do arquivo de configuração do Firebase. 
// Com essas funções e a referência de autenticação, você pode implementar recursos de autenticação, como criar contas de 
// usuário, fazer login, fazer logout e gerenciar perfis de usuário na sua rede social de finanças.
  
 