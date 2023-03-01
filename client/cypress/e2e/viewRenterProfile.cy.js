describe('view renter profile', () => {
    it('can view the renter profile page', () => {
      cy.visit('/RenterProfile');
      
      cy.contains('First Name');
      cy.contains('Last Name');
      cy.contains('Email');
      cy.contains('Phone');
      cy.contains('Bedtime');
      cy.contains('Birthday');
      cy.contains('Gender');
      cy.contains('Cooking Frequency');
    });
  });