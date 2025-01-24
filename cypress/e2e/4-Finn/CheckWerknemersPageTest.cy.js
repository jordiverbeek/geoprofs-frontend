describe('Check werknemers page', () => {
    it('Check if we get users on the werknemers page', () => {
        cy.visit('http://localhost:5173/auth/login');

        cy.get("#email").type("finn@geoprofs.com")
        cy.get("#password").type("password1", { log: false })
        cy.get("#login-button").click()

        cy.get("#werknemers-button").click()

        cy.get('.werknemers-lijst').should('exist')
    })
})
