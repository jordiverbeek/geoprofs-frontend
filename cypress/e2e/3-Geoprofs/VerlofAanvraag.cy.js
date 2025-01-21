describe('Login test', () => {
  it('displays the login page', () => {
    cy.visit('http://localhost:5173/auth/login');

    cy.get("#email").type("jordi@geoprofs.com")
    cy.get("#password").type("password1", {log:false})
    cy.get("#login-button").click()
  })

})



describe('Verlof aanvraag test ochtend', () => {
  it('selects the next date using the date picker UI', () => {
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);

    const day = tomorrow.getDate();
    const month = tomorrow.toLocaleString('default', { month: 'long' });

    cy.visit('http://localhost:5173/');
    cy.get("#verlof-aanvraag-button").click();
    cy.get("#date-picker").click();

    cy.get('.react-datepicker__current-month').then(($currentMonth) => {
      if (!$currentMonth.text().includes(month)) {
        cy.get('.react-datepicker__navigation--next').click();
      }
    });

    cy.get('.react-datepicker__day').contains(day).click();
    cy.get("#ochtend").click();
    cy.get("#verlof-reden").select("Vakantie");
    cy.get("#submit").click();
  });
});
