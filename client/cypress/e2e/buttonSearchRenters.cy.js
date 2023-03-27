describe('view search renters list', () => {
    it('displays list of renters ', () => {

        cy.visit('/Community');

        cy.contains("Search for Renters").click();

        cy.contains('Return to Search').click();

        cy.contains('Reset Filters');
    });
});