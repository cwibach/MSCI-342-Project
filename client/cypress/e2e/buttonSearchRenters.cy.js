describe('view search renters list', () => {
    it('displays list of renters ', () => {

        cy.visit('/Community');

        cy.contains("See Renters").click();

        cy.contains('Return to Search');
    });
});