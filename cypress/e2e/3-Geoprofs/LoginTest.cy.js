describe('Login test', () => {
  it('displays the login page', () => {
    cy.visit('http://localhost:5173/auth/login');

    cy.get("#email").type("jordi@geoprofs.com")
    cy.get("#password").type("password1", {log:false})
    cy.get("#login-button").click()
  })

})

