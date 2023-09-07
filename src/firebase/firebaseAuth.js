import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    updateProfile,
  } from 'firebase/auth';
  
  import { auth } from './fireBaseConfig.js';


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
  
 