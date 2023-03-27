describe('Renter Page Navigation', () => {
    it('Page nav works properly within renter', () => {

        cy.visit('/RenterProfile');

        cy.contains("Community").click();

        cy.contains('Search for Renters');

        cy.contains('Search Units').click();

        cy.contains('Search for Units');

        cy.contains('Logout').click();

        cy.contains('Confirm Logout').click();

        cy.contains('Renter');
        cy.contains('Landlord');
    });
});