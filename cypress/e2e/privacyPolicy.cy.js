// Interessante: Foi comentado que a solução era simples, mas não se passou
    //  por um segudo na minha mente que seria criar um novo arquivo
      // Esse arquivo foi adicionado após assistir a aula  na udemy, mas a funcionalidade
      // Já estava implementada no arquivo CAC-TAT.cy.JS
it('testa a página da política de privacidade de forma independente', () => {
    cy.visit('./src/privacy.html')

    cy.get('#title')
      .should('have.text', 'CAC TAT - Política de Privacidade')

    cy.get('#white-background > p')
        .should(
          'have.text',
          'Não salvamos dados submetidos no formulário da aplicação CAC TAT.Utilzamos as tecnologias HTML, CSS e JavaScript, para simular uma aplicação real.No entanto, a aplicação é um exemplo, sem qualquer persistência de dados, e usada para fins de ensino.Talking About Testing')

})