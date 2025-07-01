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
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {

    cy
    .get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy
    .get('#phone-checkbox')
    .click()

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
    .get('.error')
    .should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy
    .get('#firstName')
    .type('Natanael')
    .should('have.value', 'Natanael')
    .clear()
    .should('have.value', '')

    cy
    .get('#lastName')
    .type('Balbino')
    .should('have.value', 'Balbino')
    .clear()
    .should('have.value', '')

    cy
    .get('#email')
    .type('natanael.balbino@gmail.com')
    .should('have.value', 'natanael.balbino@gmail.com')
    .clear()
    .should('have.value', '')

    cy
    .get('#phone')
    .type('11993999293')
    .should('have.value', '11993999293')
    .clear()
    .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy
    .get('button[type="submit"]')
    .click()

    cy.get('.error')
    .should('be.visible')
  })
})