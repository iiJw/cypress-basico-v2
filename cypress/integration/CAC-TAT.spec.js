
/// <reference types="Cypress" />


describe('Central de Atendimento ao Cliente TAT', function() {

    beforeEach(function() {
        cy.visit('./src/index.html')
    })

    it.skip('verifica o título da aplicação', function() {
        
        cy.title()
          .should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })
    
    it('preenche os campos obrigatórios e envia o formulário', function() {
        cy.get('input[id="firstName"]')
          .type('Pedro')
          .should('have.value', 'Pedro')

        cy.get('input[id="lastName"]')
          .type('Weber')
          .should('have.value', 'Weber')

        cy.get('input[id="email"]')
          .type('pedrow8w@gmail.com')
          .should('have.value', 'pedrow8w@gmail.com')

        cy.get('textarea[id="open-text-area"]')
          .type('a'.repeat(2000), { delay: 0})

        cy.get('button[type="submit"]')
          .click()

        cy.get('span[class="success"]')
          .should('be.visible')


    })

    it('campos seleção suspensa', function() {

        cy.get('select').select('YouTube')
          .should('have.value', 'youtube')

    })
    
    it('marca o tipo de atendimento "Feedback"', function() {

      cy.get('input[value="feedback"]')
        .check()
        .should('be.checked')

    })

    it('marca cada tipo de atendimento', function() { 
      cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
          cy.wrap($radio)
            .check()
          cy.wrap($radio)
            .should('be.checked')
        })

    })

    it('marca ambos checkboxes, depois desmarca o ultimo', function() {
      cy.get('input[type="checkbox"]')
        .check()
        .last()
        .uncheck()
        .should('not.be.checked')

    })

    it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')

        })      

    })

    it('seleciona um arquivo simulando um drag-and-drop', function() {
      cy.get('input[type=file]')
        .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')

        })

    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function() {
      cy.fixture('example').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example')

        })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function() {
      cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')

    })

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function() {
      cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()

    })


})
