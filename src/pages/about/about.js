import img from '../../images/logo_desktop.png';

export default () => {
  const aboutContainer = document.createElement('div');

  const aboutTemplate = `
      <header id = "headerAbout">
          <img class= "logoMobileAbout" src="${img}" alt="logo_cashNet">
      </header>
      
      <h3>Conectando Saberes Financeiros</h3>
      
      <p id = "textAbout"> O CashNet é um inovador projeto de rede social voltado para a interação, aprendizado e compartilhamento de 
      conhecimentos relacionados a finanças e o mercado financeiro. 
      Projetado para atender tanto a entusiastas quanto a profissionais experientes do setor financeiro, o CashNet 
      oferece uma plataforma colaborativa que permite aos usuários se envolverem em discussões aprofundadas sobre temas 
      financeiros, trocar insights valiosos e se manterem atualizados sobre as últimas tendências econômicas.
      </p>
      
      <section id="login">
          <a href="/#"><button id="loginAbout">Voltar ao inicio</button></a>
      </section>
    `;

  aboutContainer.innerHTML = aboutTemplate;

  return aboutContainer;
};
