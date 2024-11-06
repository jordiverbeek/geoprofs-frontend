describe('Register Page', () => {
    beforeEach(() => {

        cy.visit('http://localhost:5173/auth/register');
    });

    it('should fill out the form and submit successfully', () => {

        cy.get('input[name="firstname"]').type('John').should('have.value', 'John');
        cy.get('input[name="lastname"]').type('Doe').should('have.value', 'Doe');
        cy.get('input[name="email"]').type('johndoe@example.com').should('have.value', 'johndoe@example.com');
        cy.get('input[name="password"]').type('Password123').should('have.value', 'Password123');
        cy.get('input[name="bsn"]').type('123456789').should('have.value', '123456789');
        cy.get('input[name="date_of_service"]').type('2023-01-01').should('have.value', '2023-01-01');
        cy.get('input[name="sick_days"]').type('5').should('have.value', '5');
        cy.get('input[name="vacation_days"]').type('10').should('have.value', '10');
        cy.get('input[name="personal_days"]').type('2').should('have.value', '2');
        cy.get('input[name="max_vacation_days"]').type('20').should('have.value', '20');

        cy.get('button[type="submit"]').click();

        cy.contains('Registration successful!').should('be.visible');
    });
});
