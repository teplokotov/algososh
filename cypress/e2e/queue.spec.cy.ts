import { changingColor, defaultColor } from "./constants/colors";
import { board, buttonAdd, buttonClear, buttonDelete, input } from "./constants/selectors";

/* eslint-disable testing-library/await-async-utils */
describe('Тестирование страницы: Очередь', function() {

  const addr = 'queue';
  const inputValue_1 = '1';
  const inputValue_2 = '2';

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

    cy.get(board).children().each((item, index) => {
      if(index === 0) cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      if(index === 0) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_1);
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", 'tail');
      }
    });

    cy.get(input).type(inputValue_2);
    cy.get(buttonAdd).click();

    cy.get(board).children().each((item, index) => {
      if(index === 1) cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      if(index === 0) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_1);
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
      }
      if(index === 1) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_2);
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", 'tail');
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
    cy.get(buttonDelete).click();

    cy.get(board).children().each((item, index) => {
      if(index === 0) cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      if(index === 0) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
      }
      if(index === 1) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_2);
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", 'tail');
      }
    });

    cy.get(buttonDelete).click();

    cy.get(board).children().each((item, index) => {
      if(index === 1) cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      if(index === 1) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
      }
      if(index === 2) {
        cy.wrap(item.children()[0]).should("have.a.property", "textContent", 'head');
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
        cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
      }
    });
  
  });
  
  it('кнопка Очистить работает корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(input).type(inputValue_1);
    cy.get(buttonAdd).click();
    cy.get(input).type(inputValue_2);
    cy.get(buttonAdd).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      if(index === 0) cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_1);
      if(index === 1) cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue_2);
    });

    cy.get(buttonClear).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);

    cy.get(board).children().each((item, index) => {
      cy.wrap(item.children()[0]).should("have.a.property", "textContent", '');
      cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
      cy.wrap(item.children()[1]).should("have.a.property", "textContent", '');
      cy.wrap(item.children()[3]).should("have.a.property", "textContent", '');
    });

  });
    
  }); 
    