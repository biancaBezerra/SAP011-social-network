// Este es el punto de entrada de tu aplicacion
import login from './pages/login/login';
import about from './pages/about/about';
import feed from './pages/feed/feed';
import register from './pages/register/register';

const principal = document.querySelector('#root');

const init = () => {
    window.addEventListener("hashchange", () => {
        principal.innerHTML = "";
        switch(window.location.hash) {
            case " ":
                principal.appendChild(login());
                break;
            case "#about":
                principal.appendChild(about());
                break;
            case "#feed":
                principal.appendChild(feed());
                break;
            case "#register":
                principal.appendChild(register());
                break;
            default:
                principal.appendChild(login());
        }
    });
}

window.addEventListener("load", () => {
    principal.appendChild(login());
    init();
});



// import { myFunction } from './lib/index.js';

// myFunction();


