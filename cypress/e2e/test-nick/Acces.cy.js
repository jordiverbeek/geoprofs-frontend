describe('acces checken new user', () => {
    it('should check the acces of the new user', () => {
        cy.visit('http://localhost:5173/auth/login');
        cy.get("#email").type('TestUser@geoprofs.com');
        cy.get("#password").type("password1", { log: false });
        cy.get("#login-button").click();
    });
});
