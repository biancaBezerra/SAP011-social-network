import { signIn, signInGoogle } from "../../firebase/firebaseAuth";
import customAlert from "../../lib/customAlert";


function autenticationLogin (container) {
    const loginUser = container.querySelector('#loginEmailPassword');
    const googleLogin = container.querySelector('#google');
    const userEmail = container.querySelector('#emailAdress');
    const errorEmail = container.querySelector('#text-email-error');
    const userPassword = container.querySelector('#passwordInput');
    const errorPassword = container.querySelector('#text-password-error');

    loginUser.addEventListener('submit', (event) => {
        event.preventDefault();

        userEmail.classList.remove('input-error');
        errorEmail.innerHTML = '';

        userPassword.classList.remove('input-error');
        errorPassword.innerHTML = '';

        const email = userEmail.value;
        const password = userPassword.value;

        signIn (email, password) 
            .then(() => {
                window.location.hash = "#feed";
            })

            .catch((error) => {
                switch(error.code){
                    case 'auth/user-not-found':
                        userEmail.classList.add('input-error');
                        errorEmail.innerHTML = "Usuário não encontrado";
                        break;

                    case 'auth/invalid-email':
                        userEmail.classList.add('input-error');
                        errorEmail.innerHTML = "E-mail inválido";
                        break;

                    case 'auth/wrong-password':
                        userPassword.classList.add('input-error');
                        errorPassword.innerHTML = "Senha incorreta";
                        break;

                    case 'auth/missing-password':
                        userPassword.classList.add('input-error');
                        errorPassword.innerHTML = "Digite sua senha";
                        break;                       
                    
                    default :
                        errorPassword.innerHTML = `Erro ao realizar login ${error.code}`
                }

            })

    });

    googleLogin.addEventListener('click', () => {
        signInGoogle()
            .then(() => {
                window.location.hash = "#feed";
            })
    
            .catch(() => {
                customAlert("Erro ao logar com Google")
            });
    });
}


export default () => {
    const container = document.createElement('div');

    const template = `
        <header>
            <h2>Trocando insights valiosos para se manter atualizado sobre as últimas tendências financeiras</h2>
            <img id= "logoMobile" src="./images/logo_mobile.png" alt="logo_cashNet">
        </header>

        <form id="loginEmailPassword">
            <label for="email">Email</label>
            <input id="emailAdress" type="text" placeholder="user@casnet.com">
            <span class='text-error' id='text-email-error'></span>  
            <label for="password">Senha</label>
            <input id="passwordInput" type="password" placeholder="digite sua senha">
            <span class='text-error' id='text-password-error'></span> 
            <button id="signIn">Entrar</button>
        </form>

        <section id="loginGoogle">
            <button id="google"> Entre com sua conta Google</button>
        </section>

        <section id="register">
            <p>Ainda não tem uma conta?</p>
            <a href="/#register"><button id="register">Criar conta</button></a>
        </section>

        <section id="about">
        <a href="/#about"><button id="about">Sobre o CashNet</button></a>
        </section>
    `;
    
    container.innerHTML = template;

    autenticationLogin(container);


    return container;

};