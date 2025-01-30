describe('Check manager page', () => {
    it('Check if we get users on the manager user page', () => {
        cy.visit('http://localhost:5173/auth/login');

        cy.get("#email").type("finn@geoprofs.com")
        cy.get("#password").type("password1", { log: false })
        cy.get("#login-button").click()

        cy.get("#manager-dashboard-button").click()

        cy.get('.werknemer-row').should('exist')
    })
})
