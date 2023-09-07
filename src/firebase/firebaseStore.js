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
  
  import { db } from './fireBaseConfig';
  
//   O código importa funções do Firebase Firestore para:

// collection: Manipular coleções de documentos.
// addDoc: Adicionar um novo documento a uma coleção.
// getDocs: Obter todos os documentos de uma coleção.
// updateDoc: Atualizar um documento existente.
// doc: Referenciar um documento específico.
// arrayUnion: Atualizar um array, adicionando valores únicos.
// arrayRemove: Atualizar um array, removendo valores específicos.
// deleteDoc: Excluir um documento.
// Ele também importa a referência ao seu banco de dados Firestore, db, do arquivo de configuração do Firebase. 
// Essas funções e a referência ao banco de dados Firestore permitirão que você crie, leia, atualize e exclua dados no 
// Firebase Firestore, o que é essencial para construir sua rede social de finanças.
  