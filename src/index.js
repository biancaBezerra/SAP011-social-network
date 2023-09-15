import { onAuthStateChanged } from 'firebase/auth';
import { getLoginPage } from './pages/login/login';
import register from './pages/register/register';
import feed from './pages/feed/feed';
import about from './pages/about/about';
import { auth } from './firebase/fireBaseConfig';



document.addEventListener('DOMContentLoaded', async () => {
    const principal = document.querySelector('#root');
    let logged = false;
    
    const init = () => {
        principal.innerHTML = "";
        const pages = window.location.hash;
    
        switch(pages) {
            case "#register":
                principal.appendChild(register());
                break;
            case "#feed":
                if (logged) {
                    principal.appendChild(feed());
                } else {
                    window.location.hash = "#login"
                }
                break;
            case "#login":
                if (!logged) {
                    principal.appendChild(getLoginPage());
                } else {
                    window.location.hash = "#feed"
                }
                break;
            case "#about":
                principal.appendChild(about());
                break;
            default:
                window.location.hash = "#login";
                break;
        }
    
    };

    window.addEventListener('hashchange', init);

    window.addEventListener('load', init);

    onAuthStateChanged(auth, (user) => {
        if (user) {
          logged = true;
          window.location.hash = '#feed'; // Redireciona para a página de feed
        } else {
          logged = false;
          window.location.hash = '#login'; // Redireciona para a página de login
        }
    });    
});





