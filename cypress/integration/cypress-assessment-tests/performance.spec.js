/// <reference types="cypress" />
require('cypress-xpath')


describe('cypress assessment performance tests', () => {
  
    it('home page content load', () => {
        cy.visit('http://localhost:3000/', {
          onBeforeLoad: (win) => {
            win.performance.mark('start-loading')
          }
        })
        .its('performance').then((performance) => {
            cy.get('#__next > div > div:nth-child(1) > h2').should('have.text', 'Sign in to your account')
            .then(() => performance.mark('end-loading'))
            .then(() => {
                performance.measure('pageLoad', 'start-loading', 'end-loading')
                
                const measure = performance.getEntriesByName('pageLoad')[0]
                
                const duration = measure.duration
                assert.isAtMost(duration, 1500)
            })
        })
    })
})