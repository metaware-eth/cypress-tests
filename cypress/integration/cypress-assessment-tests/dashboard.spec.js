/// <reference types="cypress" />
require('cypress-xpath')


describe('cypress assessment dashboard tests', () => {
    beforeEach(() => {
        // Assume successful login
        cy.visit('http://localhost:3000/')

        cy.get('#email').type('me@example.com').should('have.value', 'me@example.com')
        cy.get('#password').type('password').should('have.value', 'password')

        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        cy.location('pathname').should('eq', '/dashboard')      
    })
  
    it('table header items exists', () => {
        let values = []
        
        cy.get('thead > tr')
          .find('th')
          .each(($el) => {
             cy.wrap($el)
              .invoke('text')
              .then(text => {
                values.push(text.trim())
                  })
               })
              .then(() => expect(values).to.deep.eq(
                  ["ID", "Name", "Email", "Created_at", "Edit", "Delete"]))
    })

    it('table data items exists', () => {
        let values = []
        
        cy.get('tbody > tr')
          .find('td')
          .each(($el) => {
             cy.wrap($el)
              .invoke('text')
              .then(text => {
                values.push(text.trim())
                  })
               })
              .then(() => expect(values).to.deep.eq(
                  ["1", "Jon doe", "jhondoe@example.com", "2021-1-12", "Edit", "Delete", "1", "Jon doe", "jhondoe@example.com", "2021-1-12", "Edit", "Delete", "1", "Jon doe", "jhondoe@example.com", "2021-1-12", "Edit", "Delete"]))
    })
  })
  