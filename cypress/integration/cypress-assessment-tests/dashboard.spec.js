/// <reference types="cypress" />
require('cypress-xpath')
var dashboard = require("../../fixtures/dashboard")
var login = require("../../fixtures/login")

describe('cypress assessment dashboard tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        cy.get('#email').type(login.credentials.email).should('have.value', login.credentials.email)
        cy.get('#password').type(login.credentials.password).should('have.value', login.credentials.password)

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
                  dashboard.headers))
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
                  dashboard.data))
    })
  })
  