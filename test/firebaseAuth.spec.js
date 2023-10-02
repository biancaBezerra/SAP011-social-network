import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  createUser,
  signIn,
  signInGoogle,
  logOut,
} from '../../src/firebase/firebaseAuth.js';

jest.mock('firebase/auth');

beforeEach(() => {
  jest.resetAllMocks();
});

