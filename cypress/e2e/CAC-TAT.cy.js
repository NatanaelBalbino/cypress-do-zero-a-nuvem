describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')  
  });

  it('verifica o título da aplicação', () => {
    
    cy
    .title()
    .should('eq', 'Central de Atendimento ao Cliente TAT')
    
    cy
    .get('#firstName')
    .type('{enter} ')

    cy
    .get('input[value="elogio"]')
    .type('Elogio')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {

    cy
    .get('#firstName')
    .type('Natanael')

    cy
    .get('#lastName')
    .type('Balbino')

    cy
    .get('#email')
    .type('natanael@gmail.com')

    cy
    .get('#open-text-area')
    .type('Mensagem de teste')

    cy
    .get('button[type="submit"]')
    .click()

    cy
    .get('.success')
    .should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy
    .get('#firstName')
    .type('Natanael')

    cy
    .get('#lastName')
    .type('Balbino')

    cy
    .get('#email')
    .type('natanael@gmail,com')

    cy
    .get('#open-text-area')
    .type('Mensagem de teste')

    cy
    .get('button[type="submit"]')
    .click()

    cy
    .get('.error')
    .should('be.visible')
  })
})
