import { logOut } from '../../firebase/firebaseAuth';
import { auth } from '../../firebase/firebaseConfig';
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
import imgDesktop from '../../images/logo_desktop.png';

function createPostContainer(post, feedElement) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');
  postElement.setAttribute('data-post-id', post.id);

  const { seconds, nanoseconds } = post.date;

  const dateSeconds = seconds * 1000 + nanoseconds / 1000000;

  const postDate = new Date(dateSeconds);
  const currentDate = new Date();

  let formattedDate = '';

  const timeDifferenceInMilliseconds = currentDate - postDate;
  const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;

  if (timeDifferenceInSeconds < 60) {
    const secondsAgo = Math.round(timeDifferenceInSeconds);
    formattedDate = `há ${secondsAgo} segundo${secondsAgo !== 1 ? 's' : ''}`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.round(timeDifferenceInSeconds / 60);
    formattedDate = `há ${minutesAgo} minuto${minutesAgo !== 1 ? 's' : ''}`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.round(timeDifferenceInSeconds / 3600);
    formattedDate = `há ${hoursAgo} hora${hoursAgo !== 1 ? 's' : ''}`;
  } else {
    const day = (`0${postDate.getDate()}`).slice(-2);
    const month = (`0${postDate.getMonth() + 1}`).slice(-2);
    const year = postDate.getFullYear();
    formattedDate = `${day}/${month}/${year}`;
  }

  const editButton = post.uid === auth.currentUser.uid
    ? '<p class="button-edit"><span class="material-symbols-outlined">edit_square</span></p>' : '';

  const deleteButton = post.uid === auth.currentUser.uid
    ? '<p class="button-delete"id="button-delete"><span class="material-symbols-outlined">delete</span></p>' : '';

  // função para identificar links dentro do input de texto
  function parseContent(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, (url) => `<a href="${url}" target="_blank" class="custom-link">${url}</a>`);
  }

  const content = `
      <div class='infos'>
          <p class='name'>${post.username}</p>
          <p class='date'>${formattedDate}</p>
      </div>
      <div class='text'>${parseContent(post.text)}</div>
      <div class='container-button'>
          <div class='container-like'>
              <p id='button-like'><span id = "like" class="material-symbols-outlined">favorite</span></p>
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
        await unlikeCounter(post.id, currentUser);

        const index = likesArray.indexOf(currentUser);
        if (index !== -1) {
          likesArray.splice(index, 1);
        }

        textLikeCount.innerHTML = likesArray.length;
        runClick = false;
      } else {
        await likeCounter(post.id, currentUser);

        likesArray.push(currentUser);
        textLikeCount.innerHTML = likesArray.length;
        runClick = false;
      }
    }
  });

  const buttonDelete = postElement.querySelector('#button-delete');
  if (buttonDelete) {
    buttonDelete.addEventListener('click', () => {
      customDialog('Esta operação é irreversível, deseja mesmo excluir o post?', async () => {
        await deletePost(post.id);

        feedElement.removeChild(postElement);
      });
    });
  }

  const buttonEdit = postElement.querySelector('.button-edit');
  if (buttonEdit) {
    buttonEdit.addEventListener('click', () => {
      customEditDialog(post.text, (newText) => {
        const postId = postElement.getAttribute('data-post-id');
        if (newText) {
          editPost(postId, newText)
            .then(() => {
              const textElement = postElement.querySelector('.text');
              textElement.textContent = newText;
              post.text = newText;
              customAlert('Suas alterações foram salvas.');
            })
            .catch(() => {
              customAlert('Ocorreu um erro ao editar o post. Por favor, tente novamente mais tarde.');
            });
        } else {
          customDialog('Você não pode publicar um post vazio.');
        }
      });
    });
  }

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
}

export default () => {
  const feedContainer = document.createElement('div');
  feedContainer.classList.add('feed-container');

  const content = `
    <header class = "headerFeed">
      <img id= "logoMobileFeed" src="${imgDesktop}" alt="logo_cashNet">
      <section class='menu-bar-header'>
        <nav class="nav-header">
          <ul class="ul-header">
            <li class="li-header"><button id= "aboutFeed"><a href="/#about">Sobre</a></button></li>
            <li class="li-header"><button class = "button-logout"</button>Sair</li>
          </ul>
        </nav>
      </section>
    </header>
    
    <section class='space-feed'>
        <section class='menu-bar'>
            <nav class="nav-footer">
                <ul class="ul-footer">
                    <li class="li-footer"><a href="/#feed"><span id = "buttons"  class="material-symbols-outlined">House</span></a></li>
                    <li class="li-footer"><a href="/#about"><span id = "buttons"  class="material-symbols-outlined">info</span></a></li>
                    <li class="li-footer" id = "topMobile"><span id = "buttons"  class="material-symbols-outlined">keyboard_double_arrow_up</span></li>
                    <li class="li-footer"><span id = "button-logout" class="material-symbols-outlined">logout</span></li>
                </ul>
            </nav>
        </section>

        <section class='publish'>
          <textarea id='input-text' class='input-text' type='text' placeholder='Compartilhe aqui seus saberes!'></textarea>
        </section>
        <section class='publishButton'>
          <button id='button-publish' class='button-publish'>Publicar</button>
        </section>

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

  showFeed();

  const buttonLogOut = feedContainer.querySelector('#button-logout');
  const buttonLogOutDesktop = feedContainer.querySelector('.button-logout');
  const handleLogout = () => {
    customDialog('Deseja realmente sair?', () => {
      logOut()
        .then(() => {
          window.location.hash = '#login';
        })
        .catch(() => {
          customAlert('Erro ao sair. Tente novamente.');
        });
    });
  };

  buttonLogOut.addEventListener('click', handleLogout);
  buttonLogOutDesktop.addEventListener('click', handleLogout);

  const btnTop = feedContainer.querySelector('#topMobile');
  // volta ao topo ao clicar no botão

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  btnTop.addEventListener('click', scrollToTop);

  return feedContainer;
};
