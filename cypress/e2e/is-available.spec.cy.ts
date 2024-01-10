describe('Тестирование работоспособности приложения', function() {
  it('должно открываться по адресу localhost:3000', function() {
    cy.viewport(1280, 1024);
    cy.visit('/');
    cy.contains('МБОУ АЛГОСОШ');
  });
}); 