import { login } from "../../firebase/firebaseAuth";

export default () => {
    const container = document.createElement('div');

    const template = `
        <header>
            <h2>Trocando insights valiosos para se manter atualizado sobre as últimas tendências financeiras</h2>
            <img id= "logoMobile" src="./images/logo_mobile.png" alt="logo_cashNet">
        </header>

        <section id="loginEmailPassword">
            <label for="email">Email</label>
            <input id="emailAdress" type="text" placeholder="user@casnet.com"> 
            <label for="password">Senha</label>
            <input id="passwordInput" type="password" placeholder="digite sua senha">
            <a href="/#feed"><button id="signIn">Entrar</button></a>
        </section>

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

    const signInButton = container.querySelector('#signIn');

    signInButton.addEventListener('click', () => {
        const email = container.querySelector('#emailAdress').value;
        const password = container.querySelector('#passwordInput').value;
        login(email, password);
        
    })

    return container;


}