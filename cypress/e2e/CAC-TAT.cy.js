const { faker } = require('@faker-js/faker');

describe('Central de Atendimento ao Cliente TAT', () => {
  const userData = {}

  beforeEach(() => {
    cy.visit('../../src/index.html')

    userData.firstName = faker.person.firstName()
    userData.lastName  = faker.person.lastName()
    userData.email     = faker.internet.email()
    userData.textArea  = Cypress._.repeat('abcdefghijklmnopqrstuvxwys', 10)
  });

  it('verifica o título da aplicação', () => {
    
    cy.title()
    .should('eq', 'Central de Atendimento ao Cliente TAT')
  
  })
  
  it('preenche os campos obrigatórios e envia o formulário', () => {
    
    cy.get('#firstName')
    .type(userData.firstName)

    cy.get('#lastName')
    .type(userData.lastName)

    cy.get('#email')
    .type(userData.email)

    cy.get('#open-text-area')
    .type(userData.textArea, { 'delay': 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.success').should('be.visible')
  })
  
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName')
    .type(userData.firstName)

    cy.get('#lastName')
    .type(userData.lastName)

    cy.get('#email')
    .type('natanael@gmail,com')

    cy.get('#open-text-area')
    .type(userData.textArea, { 'delay': 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {

    cy.get('#phone')
    .type('abcdefghij')
    .should('have.value', '')
  })
  
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox')
    .check()

    cy.get('#firstName')
    .type(userData.firstName)

    cy.get('#lastName')
    .type(userData.lastName)

    cy.get('#email')
    .type(userData.email)

    cy.get('#open-text-area')
    .type(userData.textArea, { 'delay': 0 })

    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  
  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
    .type(userData.firstName)
    .should('have.value', userData.firstName)
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type(userData.lastName)
    .should('have.value', userData.lastName)
    .clear()
    .should('have.value', '')

    cy.get('#email')
    .type(userData.email)
    .should('have.value', userData.email)
    .clear()
    .should('have.value', '')

    cy.get('#phone')
    .type('11993999293')
    .should('have.value', '11993999293')
    .clear()
    .should('have.value', '')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })
  
  it('envia o formuário com sucesso usando um comando customizado que não recebe argumento', () =>{
    cy.fillMandatoryFieldsAndSubmitNoArgs()
  })
  
  it('envia o formuário com sucesso usando um comando customizado que recebe um objeto', () =>{
    cy.fillMandatoryFieldsAndSubmitWithObj(userData)
  })

  it('envia o formuário com sucesso usando um comando customizado que recebe valor default', () =>{
    cy.fillMandatoryFieldsAndSubmitDefaultData()
  })
})