import { signIn, signInGoogle } from '../../firebase/firebaseAuth';
import { togglePasswordVisibility } from '../../lib/passwordToggle';
import customAlert from '../../lib/customAlert';
import imgMobile from '../../images/logo_mobile.png';
import imgDesktop from '../../images/logo_pgInicial.png';
import imgGoogle from '../../images/google-icon.png';

function autenticationLogin(container) {
  const loginUser = container.querySelector('#loginEmailPassword');
  const buttonNewAccount = container.querySelector('#register');
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

    signIn(email, password)
      .then(() => {
        window.location.hash = '#feed';
      })

      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            userEmail.classList.add('input-error');
            errorEmail.innerHTML = 'Usuário não encontrado';
            break;

          case 'auth/invalid-email':
            userEmail.classList.add('input-error');
            errorEmail.innerHTML = 'E-mail inválido';
            break;

          case 'auth/wrong-password':
            userPassword.classList.add('input-error');
            errorPassword.innerHTML = 'Senha incorreta';
            break;

          case 'auth/missing-password':
            userPassword.classList.add('input-error');
            errorPassword.innerHTML = 'Digite sua senha';
            break;
          default:
            errorPassword.innerHTML = `Erro ao realizar login ${error.code}`;
        }
      });
  });

  googleLogin.addEventListener('click', () => {
    signInGoogle()
      .then(() => {
        window.location.hash = '#feed';
      })

      .catch(() => {
        customAlert('Erro ao logar com Google');
      });
  });

  buttonNewAccount.addEventListener('click', () => {
    window.location.hash = '#register';
  });

  const toggleIcon = container.querySelector('#togglePassword');
  toggleIcon.addEventListener('click', togglePasswordVisibility);
}

export const getLoginPage = () => {
  const container = document.createElement('div');
  container.classList.add('login-container');

  const template = `
      <header id = "headerLogin">
        <h2>Trocando insights valiosos para se manter atualizado sobre as últimas tendências financeiras</h2>
        <img id= "logoMobile" src="${imgMobile}" alt="logo_cashNet">
        <img id= "logoDesktopFeed" src="${imgDesktop}" alt="logo_cashNet">
      </header>

      <section class ="loginContainer" id="loginContainer">
        <form class= "loginEmailPassword" id="loginEmailPassword">
          <label class = "emailLogin for="email">Email</label>
          <input class='input-login' id="emailAdress" type="text" placeholder="user@casnet.com" autocomplete="username">
          <span class='text-email-error'></span>
          <span class='text-error' id='text-email-error'></span>  
          <label class= "passwordLogin for="password">Senha</label>
          <input class='input-login' id="passwordInput" type="password" placeholder="digite sua senha" autocomplete="current-password">
            <icon id="togglePassword" class="toggle-password">
              <i class="fas fa-eye"></i>
            </icon>
          </input>
          <span class='text-password-error'></span>
          <span class='text-error' id='text-password-error'></span>
          <button class = "buttonLogin" id="signIn" type = "submit">Entrar</button>
        </form>
          
        <section id="loginGoogle">
          <button class = "button-login-google" id="google"> Entre com Google</button>
          <img id= "googleLogo" src="${imgGoogle}" alt="logo_google">
        </section>
          
        <section id="register">
          <p>Ainda não tem uma conta?</p>
          <button class = "button-new-account" id="register">Criar conta</button>
        </section>
          
        <section id="about">
          <a href="/#about"><button class="about">Sobre o CashNet</button></a>
        </section>
      </section>
    `;

  container.innerHTML = template;

  autenticationLogin(container);

  return container;
};
