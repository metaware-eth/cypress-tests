/// <reference types="cypress" />
require('cypress-xpath')
var login = require("../../fixtures/login")

describe('cypress assessment login tests', () => {
    beforeEach(() => {
      // Nav to homepage
      cy.visit('http://localhost:3000/')
    })
  
    it('valid login', () => {
        // Enter credentials
        cy.get('#email')
            .type(login.credentials.email)
            .should('have.value', login.credentials.email)
        cy.get('#password')
            .type(login.credentials.password)
            .should('have.value', login.credentials.password)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify correct page
        cy.location('pathname').should('eq', '/dashboard')
    })

    it('invalid email login', () => {
        // Enter credentials
        cy.get('#email')
            .type(login.credentials.invalid_email)
            .should('have.value', login.credentials.invalid_email)
        cy.get('#password')
            .type(login.credentials.password)
            .should('have.value', login.credentials.password)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal(login.errors.invalid_credentials)
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })

    it('invalid password login', () => {
        // Enter credentials
        cy.get('#email')
            .type(login.credentials.email)
            .should('have.value', login.credentials.email)
        cy.get('#password')
            .type(login.credentials.invalid_password)
            .should('have.value', login.credentials.invalid_password)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal(login.errors.invalid_credentials)
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })

    it('invalid email and password login', () => {
        // Enter credentials
        cy.get('#email')
            .type(login.credentials.invalid_email)
            .should('have.value', login.credentials.invalid_email)
        cy.get('#password')
            .type(login.credentials.invalid_password)
            .should('have.value', login.credentials.invalid_password)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#form-error').invoke('text').then((text) => {
            expect(text.trim()).equal(login.errors.invalid_credentials)
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })

    it('missing email field error state', () => {
        // Enter password
        cy.get('#password')
            .type(login.credentials.password)
            .should('have.value', login.credentials.password)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#email-error').invoke('text').then((text) => {
            expect(text.trim()).equal(login.errors.missing_email)
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })
    
    it('missing password field error state', () => {
        // Enter password
        cy.get('#email')
            .type(login.credentials.email)
            .should('have.value', login.credentials.email)

        // Click 'Sign in'
        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        // Verify error text
        cy.get('#password-error').invoke('text').then((text) => {
            expect(text.trim()).equal(login.errors.missing_password)
        })

        // Verify correct page
        cy.location('pathname').should('eq', '/')
    })    
  })
  