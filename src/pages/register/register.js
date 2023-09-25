import { createUser } from "../../firebase/firebaseAuth";
import { userData } from "../../firebase/firebaseStore";
import customAlert from "../../lib/customAlert";
import { togglePasswordVisibility } from "../../lib/passwordToggle";

export default () => {
    const registerContainer = document.createElement('div');
    registerContainer.classList.add('div-register');
    
    const registerTemplate = `
        <header>
            <img class= "logoMobileRegister" src="./images/logo_desktop.png" alt="logo_cashNet">
            <h2 id = "registerH2">Cadastre-se</h2>
        </header>

        <form class= "register" id="registerForm">
            <label for="name">Nome</label>
            <input id="firstName" type="text">
            <span class='text-error' id='text-name-error'></span> 
            <label for="name">Sobrenome</label>
            <input id="lastName" type="text">
            <span class='text-error' id='last-name-error'></span> 
            <label for="name">Usuário</label>
            <input id="userName" type="text" placeholder= "userCashnet">
            <span class='text-error' id='text-user-error'></span> 
            <label for="email">Email</label>
            <input id="emailAdress" type="text" placeholder="user@cashnet.com" autocomplete="username"> 
            <span class='text-error' id='text-email-error'></span> 
            <label for="password">Senha</label>
            <input id="passwordInput" type="password" placeholder="digite sua senha" autocomplete="current-password">
            <span id="togglePassword" class="toggle-password-register">
                <i class="fas fa-eye"></i>
            </span>
            <span class='text-error' id='text-password-error'></span> 
            <section id="buttons">
                <button class='buttonRegister' id='buttonRegister' type='submit' >Criar Conta</button>
                <button class="loginRegister" id="login">Voltar ao inicio</button>
            </section>
        </form>
    `;
    
    registerContainer.innerHTML = registerTemplate;

    const toggleIcon = registerContainer.querySelector('#togglePassword');
    toggleIcon.addEventListener('click', togglePasswordVisibility);

    const goLogin = registerContainer.querySelector('#login');
    goLogin.addEventListener("click", () => {
        window.location.hash = "#login";
    });

    const goRegister = registerContainer.querySelector('.register');
    goRegister.addEventListener("submit", (event) => {
        event.preventDefault();


        const nameContent = registerContainer.querySelector('#firstName');
        const errorName = registerContainer.querySelector('#text-name-error');
        const lastNameContent = registerContainer.querySelector('#lastName');
        const errorLastName = registerContainer.querySelector('#last-name-error');
        const userContent = registerContainer.querySelector('#userName');
        const errorUser = registerContainer.querySelector('#text-user-error');
        const emailContent = registerContainer.querySelector('#emailAdress');
        const errorEmail = registerContainer.querySelector('#text-email-error');
        const passwordContent = registerContainer.querySelector('#passwordInput');
        const errorPassword = registerContainer.querySelector('#text-password-error');
    
        nameContent.classList.remove('input-error');
        errorName.innerHTML = '';
    
        lastNameContent.classList.remove('input-error');
        errorLastName.innerHTML = '';
    
        userContent.classList.remove('input-error');
        errorUser.innerHTML = '';
    
        emailContent.classList.remove('input-error');
        errorEmail.innerHTML = '';
    
        passwordContent.classList.remove('input-error');
        errorPassword.innerHTML = '';
    
        if ( nameContent.value === "" || lastNameContent.value === "" || userContent.value === "") {
            if (userContent.value === "") {
                userContent.classList.add('input-error');
                errorUser.innerHTML = 'Preencha o campo corretamente';
            }
            if (nameContent.value === "") {
                nameContent.classList.add('input-error');
                errorName.innerHTML = 'Preencha o campo corretamente';
            }
            if (lastNameContent.value === "") {
                lastNameContent.classList.add('input-error');
                errorLastName.innerHTML = 'Preencha o campo corretamente';
            }
            
        } else {
            createUser (
                emailContent.value,
                passwordContent.value,
                userContent.value,
            )
                .then(() => userData (
                    nameContent.value,
                    lastNameContent.value,
                    emailContent.value,
                    userContent.value,
                ))
                .then(() => {
                    customAlert('Cadastro realizado com sucesso');
                    window.location.hash = "#feed";
                })
                .catch((error) => {
                    switch(error.code) {
                        case 'auth/email-already-in-use':
                            emailContent.classList.add('input-error');
                            errorEmail.innerHTML = "E-mail já cadastrado";
                            break;
    
                        case 'auth/missing-email':
                            emailContent.classList.add('input-error');
                            errorEmail.innerHTML = "Campo obrigatório";
                            break;
    
                        case 'auth/invalid-email':
                            emailContent.classList.add('input-error');
                            errorEmail.innerHTML = "E-mail inválido";
                            break;
    
                        case 'auth/missing-password':
                        passwordContent.classList.add('input-error');
                        errorPassword.innerHTML = "Campo obrigatório";
                        break;
    
                        case 'auth/weak-password':
                            passwordContent.classList.add('input-error');
                            errorPassword.innerHTML = "Digite uma senha com 6 caracteres no mínimo";
                            break;
    
                        default:
                            errorPassword.innerHTML = `Erro ao cadastrar: ${error.code}`;
                    }
                });
        }
    });

    return registerContainer;
};

