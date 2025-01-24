describe('Verlof aanvraag test ochtend', () => {
    before(() => {
        cy.session('login', () => {
            cy.visit('http://localhost:5173/auth/login');
            cy.get("#email").type("finn@geoprofs.com");
            cy.get("#password").type("password1", { log: false });
            cy.get("#login-button").click();
            cy.url().should('not.include', '/auth/login');
        });
    });

    it('should register a new user', () => {
        cy.visit('http://localhost:5175/werknemers');
        cy.get('#Register-user').click();
        cy.get('#first_name').type('Test');
        cy.get('#sure_name').type('User');
        cy.get('#email').type('Test@user.com');
        cy.get('#password').type('password1');
        cy.get('#bsn').type('384650284');
        cy.get('#date_of_service').type('2000-01-01');
        cy.get('#sick_days').type('0');
        cy.get('#vac_days').type('0');
        cy.get('#personal_days').type('0');
        cy.get('#max_vac_days').type('30');
        cy.get('button[type="submit"]').click();
    });
});