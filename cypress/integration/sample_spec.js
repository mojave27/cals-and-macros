import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App.js';

describe('Default React App.js test', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

describe('basic ui test', () => {
    it('finds text on page', () => {
        cy.visit('http://localhost:3000');
        cy.contains('home');
    })
})

// describe('My First Test', function () {
    // it('Does not do much!', function () {
        // expect(true).to.equal(true)
    // })
// })

// describe('My First Test', function () {
//     it('Visits the Kitchen Sink', function () {
//         cy.visit('https://example.cypress.io');

//         cy.contains('type').click();

//         cy.url().should('include', '/commands/actions');

//         cy.get('.action-email')
//         .type('fake@email.com')
//         .should('have.value', 'fake@email.com')
//     })
// })