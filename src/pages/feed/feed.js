import {logOut} from "../../firebase/firebaseAuth";
import { auth } from "../../firebase/fireBaseConfig";
import {
    fetchPosts,
    createPost,
    likeCounter,
    unlikeCounter,
    deletePost,
    editPost,
} from '../../firebase/firebaseStore';
import customAlert from '../../lib/customAlert';
import customDialog from '../../lib/customDialog';
import customEditDialog from '../../lib/customEditDialog';

function createPostContainer (post, feedElement) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-post-id', post.id);

    const {seconds, nanoseconds} = post.date;

    const dateSeconds = seconds * 1000 + nanoseconds / 1000000;

    const data = new Date(dateSeconds);

    let formattedDate = '';

    if (data.getHours() < 24) {
        const hora = (`0${data.getHours()}`).slice(-2);
        const minuto = (`0${data.getMinutes()}`).slice(-2);
        formattedDate = `${hora}:${minuto}`;
    } else {
        const ano = data.getFullYear();
        const mes = (`0${data.getMonth() + 1}`).slice(-2);
        const dia = (`0${data.getDate()}`).slice(-2);
        formattedDate = `${ano}-${mes}-${dia}`;
    }

    const editButton = post.uid === auth.currentUser.add
        ? '<p class="button-edit"><span class="material-symbols-outlined">edit_square</span></p>' : '';

    const deleteButton = post.uid === auth.currentUser.add 
        ? '<p class="button-delete"id="button-delete"><span class="material-symbols-outlined">delete</span></p>' : '';

    
    const content = `
        <div class='infos'>
            <p class='name'>${post.username}</p>
            <p class='date'>${formattedDate}</p>
        </div>
        <div class='text'>${post.text}</div>
        <div class='container-button'>
            <div class='container-like'>
                <p id='button-like'><span class="material-symbols-outlined">favorite</span></p>
                <p class='like' id='text-like-count'>${post.likes.length}</p>
            </div>
            <div class='container-edit'>
                ${editButton}
                ${deleteButton}
            </div>
        </div>
        `;
    
    postElement.innerHTML = content;

    const textLikeCount = postElement.querySelector('#text-like-count');

    let runClick = false;

    const likeButton = postElement.querySelector('#button-like');
    likeButton.addEventListener('click', async () => {
        const currentUser = auth.currentUser.displayName;
        const likesArray = post.likes;

        if (!runClick) {
            runClick = true;

            if (likesArray.includes(currentUser)) {
                await unlikeCounter (post.id, currentUser);

                const index = likesArray.indexOf(currentUser);
                if (index !== -1) {
                    likesArray.splice(index, 1);
                }

                textLikeCount.innerHTML = likesArray.length;
                runClick = false;
            } else {
                await likeCounter (post.id, currentUser);

                likesArray.push(currentUser);
                textLikeCount.innerHTML = likesArray.length;
                runClick = false;
            }
        }

    });

    const buttonDelete = postElement.querySelector('#button-delete');
    if (buttonDelete) {
      buttonDelete.addEventListener('click', async () => {
        customDialog('Esta operação é irreversível, deseja mesmo excluir o post?', async () => {
          await deletePost(post.id);
  
          feedElement.removeChild(postElement);
        })
      });
    }

    const buttonEdit = postElement.querySelector('.button-edit');
    if (buttonEdit) {
        buttonEdit.addEventListener('click', () => {
            customEditDialog(post.text, (newText) => {
                const postId = postElement.getAttribute('data-post-id');
                if (newText) {
                    editPost (postId, newText)
                    .then (() => {
                        const textElement = postElement.querySelector('.text');
                        textElement.textContent = newText;

                        post.text = newText;
                        customAlert ('Suas alterações foram salvas.')
                    })
                    .catch (() => {
                        customAlert ('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde.',);
                    });
                } else { 
                    customDialog('Você não pode publicar um post vazio.');
                }
            });
        });
    };

    return postElement;
}

async function showFeed() {
    const posts = await fetchPosts();
    const feedElement = document.querySelector('#feed');
  
    feedElement.innerHTML = '';
  
    posts.forEach((post) => {
      const postElement = createPostContainer(post, feedElement);
      feedElement.appendChild(postElement);
    });
};



export default () =>{
    const feedContainer = document.createElement('div');
    feedContainer.classList.add ('feed-container');

    const content = `
        <header>
            <img id= "logoMobile" src="./images/logo_mobile.png" alt="logo_cashNet">
            <h3>Conectando Saberes Financeiros</h3>
        </header>
        
        <section class='space-feed'>
            <section class='menu-bar'>
                <nav class="nav-footer">
                    <ul class="ul-footer">
                        <li class="li-footer"><a href="/#feed"><span class="material-symbols-outlined">House</span>Home</a></li>
                        <li class="li-footer"><a href="/#about"><span class="material-symbols-outlined">info</span>Sobre</a></li>
                        <li class="li-footer"><span class="material-symbols-outlined">keyboard_double_arrow_up</span>Topo</li>
                        <li class="li-footer"><span id = "button-logout" class="material-symbols-outlined">logout</span>Exit</li>
                    </ul>
                </nav>



            </section>

            <div class='div-line'></div>

            <section class='publish'>
                <span class ='welcome'>Olá, ${auth.currentUser.displayName}!</span>
                <textarea id='input-text' class='input-text' type='text' placeholder='Compartilhe aqui seus saberes!'></textarea>
                <button id='button-publish' class='button-publish'>Publicar</button>
            </section>

            <div class='div-line'></div>

            <section id='feed'></section>
        </section>
        `;

    feedContainer.innerHTML = content;

    const inputText = feedContainer.querySelector('#input-text');
    const buttonPublish = feedContainer.querySelector('#button-publish');
    buttonPublish.addEventListener('click', () => {
      if (inputText.value !== '') {
        createPost(
          new Date(),
          auth.currentUser.displayName,
          inputText.value,
          auth.currentUser.uid,
        )
          .then(() => {
            customAlert('Seu post foi publicado com sucesso');
            inputText.value = '';
            showFeed();
          })
          .catch(() => {
            customAlert('Erro ao publicar post');
          });
      } else {
        customDialog('Você não pode publicar um post vazio.');
      }
    });
  
    const buttonLogOut = feedContainer.querySelector('#button-logout');
    buttonLogOut.addEventListener('click', () => {
      customDialog('Deseja realmente sair?', () => {
        logOut()
          .then(() => {
            window.location.hash = '#login';
          })
          .catch(() => {
            customAlert('Erro ao sair. Tente novamente.');
          });
      });
    });
  

    showFeed();


    return feedContainer;
        
};