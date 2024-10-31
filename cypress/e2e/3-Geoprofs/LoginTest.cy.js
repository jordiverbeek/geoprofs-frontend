describe('example to-do app', () => {
  it('displays the login page', () => {
    cy.visit('http://localhost:5173/auth/login');

    cy.get("#email").type("jordi@gmail.com")
    cy.get("#password").type("testtesttest", {log:false})
    cy.get("#login-button").click()
  })

})
