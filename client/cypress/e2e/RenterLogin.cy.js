describe('Ensure RenterLogin works properly', () => {
    it('Renter Login and SignUp lead to each other', () => {

        cy.visit('/RenterLogin');

        cy.contains("Sign Up").click();

        cy.contains('Login').click();

        cy.contains('Renter Login');
    });
});