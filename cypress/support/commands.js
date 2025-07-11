Cypress.Commands.add('fillMandatoryFieldsAndSubmitNoArgs', () => {
    cy.get('#firstName').type('Natanael')
    cy.get('#lastName').type('Balbino')
    cy.get('#email').type('natanael@gmail.com')
    cy.get('#open-text-area').type('Mensagem de teste')
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
 })
 
 Cypress.Commands.add('fillMandatoryFieldsAndSubmitWithObj', userData => {
    cy.get('#firstName').type(userData.firstName)
    cy.get('#lastName').type(userData.lastName)
    cy.get('#email').type(userData.email)
    cy.get('#open-text-area').type(userData.textArea, { 'delay': 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
 })

  Cypress.Commands.add('fillMandatoryFieldsAndSubmitDefaultData', (userData = {
   firstName : 'Mikey',
   lastName  : 'Pierson',
   email     : 'mikey.pierson@thegentleman.com.uk',
   textArea  : "Thank's, Ray"
  }) => {
    cy.get('#firstName').type(userData.firstName)
    cy.get('#lastName').type(userData.lastName)
    cy.get('#email').type(userData.email)
    cy.get('#open-text-area').type(userData.textArea, { 'delay': 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
 })