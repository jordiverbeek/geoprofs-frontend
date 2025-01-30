describe('Verlof aanvraag test ochtend', () => {
    before(() => {
        cy.session('login', () => {
            cy.visit('http://localhost:5173/auth/login');
            cy.get("#email").type("jordi@geoprofs.com");
            cy.get("#password").type("password1", { log: false });
            cy.get("#login-button").click();
            cy.url().should('not.include', '/auth/login');
        });
    });

    it('Show Planning and filter through the planning', () => {
        cy.visit('http://localhost:5173/');
        cy.get("#planning-button").click();
        
        cy.get('.planning-content').should('exist');
    });
});
