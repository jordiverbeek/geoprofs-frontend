describe('Logout test', () => {
    it('Check if we can logout on the site', () => {
        cy.visit('http://localhost:5173/auth/login');

        cy.get("#email").type("testing@geoprofs.com")
        cy.get("#password").type("password1", { log: false })
        cy.get("#login-button").click()
        cy.get("#logout-button").click()
    })
})
