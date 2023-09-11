export default () =>{
    const aboutContainer = document.createElement('div');

    const aboutTemplate = `
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

    aboutContainer.innerHTML = aboutTemplate;

    return aboutContainer;
        
}