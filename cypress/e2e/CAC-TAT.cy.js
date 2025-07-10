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

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(eachRadio => {
        cy.wrap(eachRadio)
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    // O teste deve possuir verificações de que ambos checkboxes foram marcados,
    // Aqui o .get informou onde estão todos os checks e com o .check foram checados
    cy.get('#check input[type="checkbox"]') // ambos checks marcados 
      .as('checkboxes')
      .check()

    //Aqui estamos validando se os checks encontrados e depositados na tag @checkboxes estão true checkds
    // INTERESSANTE: Em um sistema personalizavel com grande números de checks ativaveis usar uma TAG para saber 
                  // quais devem estar ativos e quais não é bem interessante e deterministico. Precisaria analisar a performance
                  // deste teste 
    cy.get('@checkboxes')
      .each(checkbox => {
        expect(checkbox[0].checked).to.equal(true)
      })

    // e depois, que o último (.last()) foi desmarcado
    cy.get('@checkboxes')
      .last()
      .uncheck()
      .should('be.not.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })

  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

    cy.fixture("example.json",{ encoding: null }).as('ExampleFile')

    cy.get('input[type="file"]')
      .selectFile('@ExampleFile')
      .then(input => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })
})