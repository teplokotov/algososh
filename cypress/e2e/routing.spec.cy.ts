describe('Тестирование переходов по страницам', function() {
  
  const addr = '/';
  const cards = '[data-cy="cards"]';
  const linkReturn = '[data-cy="linkReturn"]';

  it('должна открываться заглавная страница', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должна открываться страница: Реверс строки', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(0)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Строка');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });

  it('должна открываться страница: Последовательность Фибоначчи', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(1)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Последовательность Фибоначчи');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });

  it('должна открываться страница: Сортировка массива', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(2)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Сортировка массива');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });

  it('должна открываться страница: Стек', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(3)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Стек');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });

  it('должна открываться страница: Очередь', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(4)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Очередь');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });

  it('должна открываться страница: Связный список', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(cards).children().eq(5)
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Связный список');
    cy.get(linkReturn)
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(href);
    });  
  });
}); 