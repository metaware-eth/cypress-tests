/// <reference types="cypress" />
require('cypress-xpath')


describe('cypress assessment login tests', () => {
    beforeEach(() => {
      // Visit the homepage
      cy.visit('http://localhost:3000/')
    })
  
    it('valid login', () => {
        cy.location('pathname').should('eq', '/')
        // Enter credentials
        cy.get('#email').type('me@example.com').should('have.value', 'me@example.com')
        cy.get('#password').type('password').should('have.value', 'password')

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify correct page
        cy.location('pathname').should('eq', '/dashboard')
    })

    it('invalid email login', () => {
        // Enter credentials
        cy.get('#email').type('INVALID_EMAIL').should('have.value', 'INVALID_EMAIL')
        cy.get('#password').type('password').should('have.value', 'password')

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal('Invalid email or password')
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })

    it('invalid password login', () => {
        // Enter credentials
        cy.get('#email').type('me@example.com').should('have.value', 'me@example.com')
        cy.get('#password').type('INVALID_PASSWORD').should('have.value', 'INVALID_PASSWORD')

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal('Invalid email or password')
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })

    it('invalid email and password login', () => {
        // Enter credentials
        cy.get('#email').type('INVALID_EMAIL').should('have.value', 'INVALID_EMAIL')
        cy.get('#password').type('INVALID_PASSWORD').should('have.value', 'INVALID_PASSWORD')

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal('Invalid email or password')
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })
  })
  