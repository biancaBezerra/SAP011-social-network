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


function createPostContainer (post, feedElement) {
    const postElement = document.createElement('div');
    postElement.classList.add('post');
    postElement.setAttribute('data-post-id', post.id);

    const {seconds, nanoseconds} = post.date;

    const dateSeconds = seconds * 1000 + nanoseconds / 1000000;

    const data = new Date(dateSeconds);

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


}



export default () =>{
    const feedContainer = document.createElement('div');

    const feedTemplate = `
        <header>
            <img id= "logoMobile" src="./images/logo_mobile.png" alt="logo_cashNet">
        </header>
        
        <h3>Conectando Saberes Financeiros</h3>
        
        <p> O CashNet é um inovador projeto de rede social voltado para a interação, aprendizado e compartilhamento de 
        conhecimentos relacionados a finanças e o mercado financeiro. 
        Projetado para atender tanto a entusiastas quanto a profissionais experientes do setor financeiro, o CashNet 
        oferece uma plataforma colaborativa que permite aos usuários se envolverem em discussões aprofundadas sobre temas 
        financeiros, trocar insights valiosos e se manterem atualizados sobre as últimas tendências econômicas.
        </p>
        
        <section id="login">
            <a href="/#"><button id="login">Voltar ao inicio</button></a>
        </section>
        `;

    feedContainer.innerHTML = feedTemplate;

    return feedContainer;
        
}