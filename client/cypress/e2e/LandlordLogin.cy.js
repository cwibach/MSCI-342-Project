describe('Ensure LandlordLogin works properly', () => {
    it('Landlord Login and Signup lead to each other', () => {

        cy.visit('/LandlordLogin');

        cy.contains("Sign Up").click();

        cy.contains('Login').click();

        cy.contains('Landlord Login');
    });
});