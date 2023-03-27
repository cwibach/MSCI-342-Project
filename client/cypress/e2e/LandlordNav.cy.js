describe('Landlord Page Navigation', () => {
    it('Page nav works properly within landlord', () => {

        cy.visit('/LandlordProfile');

        cy.contains("Add Posting").click();

        cy.contains('Create New Posting');

        cy.contains('My Units').click();

        cy.contains('Logout').click();

        cy.contains('Confirm Logout').click();

        cy.contains('Renter');
        cy.contains('Landlord');
    });
});