describe('view homepage', () => {
  it('can view the home page', () => {
    cy.visit('/');
    cy.contains('Landlord');
    cy.contains('Renter');
  });
});