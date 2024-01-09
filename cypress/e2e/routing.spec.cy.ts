describe('Тестирование переходов по страницам', function() {
  
  const addr = '/';

  it('должна открываться заглавная страница', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('должна открываться страница: Реверс строки', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(1)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Строка');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });

  it('должна открываться страница: Последовательность Фибоначчи', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(2)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Последовательность Фибоначчи');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });

  it('должна открываться страница: Сортировка массива', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(3)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Сортировка массива');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });

  it('должна открываться страница: Стек', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(4)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Стек');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });

  it('должна открываться страница: Очередь', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(5)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Очередь');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });

  it('должна открываться страница: Связный список', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get('#root > div > main > div > a:nth-child(6)')
      .invoke('attr', 'href')
      .then(href => {
        cy.visit(addr + href);
      });
    cy.contains('Связный список');
    cy.get('#root > div > main > div > a')
    .invoke('attr', 'href')
    .then(href => {
      cy.visit(addr + href);
    });  
  });
}); 