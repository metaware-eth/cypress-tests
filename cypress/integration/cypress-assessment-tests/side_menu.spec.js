/// <reference types="cypress" />
require('cypress-xpath')


describe('cypress assessment side menu tests', () => {
    beforeEach(() => {
        // Assume successful login
        cy.visit('http://localhost:3000/')

        cy.get('#email').type('me@example.com').should('have.value', 'me@example.com')
        cy.get('#password').type('password').should('have.value', 'password')

        cy.xpath('//*[@id="__next"]/div/div[2]/div/form/div[4]/button').click()

        cy.location('pathname').should('eq', '/dashboard')      
    })
  
    it('dashboard item exists', () => {
        // Check element and text
        cy.xpath('//*[@id="__next"]/div/div[1]/ul/li[1]/a/span[2]').should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).equal('Dashboard')
        })
    })

    it('profile item exists', () => {
        // Check element and text
        cy.xpath('//*[@id="__next"]/div/div[1]/ul/li[2]/a/span[2]').should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).equal('Profile')
        })
    })

    it('notifications item exists', () => {
        // Check element and text
        cy.xpath('//*[@id="__next"]/div/div[1]/ul/li[3]/a/span[2]').should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).equal('Notifications')
        })
    })

    it('logout item exists', () => {
        // Check element and text
        cy.xpath('//*[@id="__next"]/div/div[1]/ul/li[4]/a/span[2]').should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).equal('Logout')
        })
    })

    it('notification alert item exists', () => {
        // Check element and text
        cy.xpath('//*[@id="__next"]/div/div[1]/ul/li[3]/a/span[3]').should('be.visible').invoke('text').then((text) => {
            expect(text.trim()).equal('5')
        })
    })    

    it('logo item exists', () => {
        // Check element, src, and alt
        cy.xpath('//*[@id="__next"]/div/div[1]/div/img').should('have.attr', 'src').should('include','tailwindui.com/img/logos/workflow-mark-indigo-600.svg')
        cy.xpath('//*[@id="__next"]/div/div[1]/div/img').should('have.attr', 'alt').should('include','Workflow')
    })    
  })
  