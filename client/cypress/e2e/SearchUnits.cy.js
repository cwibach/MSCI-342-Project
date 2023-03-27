describe('view search units', () => {
    it('buttons work to navigate search units ', () => {

        cy.visit('/SearchUnits');

        cy.contains("Search for Units").click();

        cy.contains('Return to Search').click();

        cy.contains('Reset Filters');
    });
});