/* eslint-disable testing-library/await-async-utils */
describe('Тестирование страницы: Стек', function() {

  const addr = 'stack';
  const inputValue_1 = '1';
  const inputValue_2 = '2';
  const defaultColor = 'rgb(0, 50, 255)';
  const changingColor = 'rgb(210, 82, 225)';

  const input = '#root > div > main > div > form > fieldset > div > input';
  const buttonAdd = '#root > div > main > div > form > fieldset > button:nth-child(2)';
  const buttonDelete = '#root > div > main > div > form > fieldset > button:nth-child(3)';
  const buttonClear = '#root > div > main > div > form > button';
  const board = '#root > div > main > div > div';

  it('если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(buttonAdd).should('be.disabled');
  });

  it('элементы добавляются корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(input).type(inputValue_1);
    cy.get(buttonAdd).click();

    cy.get(board).children().each((item) => {
      cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().each((item) => {
      cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
      cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_1);
    });

    cy.get(input).type(inputValue_2);
    cy.get(buttonAdd).click();
    cy.get(board).children().should('have.length', 2);

    cy.get(board).children().each((item, index) => {
      if(index === 1) cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().each((item, index) => {
      if(index === 1) {
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_2);
      }
    });

  });
  
  it('элементы удаляются корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(input).type(inputValue_1);
    cy.get(buttonAdd).click();
    cy.get(input).type(inputValue_2);
    cy.get(buttonAdd).click();
    cy.get(board).children().should('have.length', 2);
    cy.get(buttonDelete).click();
    cy.get(board).children().should('have.length', 1);

    cy.get(board).children().each((item) => {
      cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_1);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(buttonDelete).click();
    cy.get(board).children().should('have.length', 0);

  });

  it('кнопка Очистить работает корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(input).type(inputValue_1);
    cy.get(buttonAdd).click();
    cy.get(input).type(inputValue_2);
    cy.get(buttonAdd).click();
    cy.get(board).children().should('have.length', 2);
    cy.get(buttonClear).click();
    cy.get(board).children().should('have.length', 0);
  });
  
  }); 
  