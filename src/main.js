// Este es el punto de entrada de tu aplicacion
import login from './pages/login/login';
// import about from './pages/about/about';
// import feed from './pages/feed/feed';
// import register from './pages/register/register';

const main = document.getElementById('root');

window.addEventListener("load", () => {
    main.appendChild(login())
});



import { myFunction } from './lib/index.js';

myFunction();


