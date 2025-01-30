describe('verwijderen van een user', () => {
    before(() => {
        cy.session('login', () => {
            cy.visit('http://localhost:5173/auth/login');
            cy.get("#email").type("finn@geoprofs.com");
            cy.get("#password").type("password1", { log: false });
            cy.get("#login-button").click();
            cy.url().should('not.include', '/auth/login');
        });
    });

    it('should delete the 5th user', () => {
        cy.visit('http://localhost:5174/manager');
        cy.get('.werknemer-row').eq(4).find('#Delete_button').click();
    });
});