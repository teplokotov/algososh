import { changingColor, defaultColor, modifiedColor } from "./constants/colors";
import { board, button, input } from "./constants/selectors";

/* eslint-disable testing-library/await-async-utils */
describe('Тестирование страницы: Строка', function() {

  const addr = 'recursion';
  const inputValue = '123';

  it('если в инпуте пусто, то кнопка добавления недоступна', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).clear();
    cy.get(button).should('be.disabled');
  });

  it('строка должна разворачиваться корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(input).type(inputValue);
    cy.get(button).click();
    cy.get(board).children().should('have.length', inputValue.length);

    cy.get(board).children().each((item, index) => {
      cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
      cy.wrap(item.children()[1]).should("have.a.property", "textContent", inputValue[index]);
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(board).children().each((item, index) => {
      if(index === 0 || index === 2) {
        cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
      } else {
        cy.wrap(item.children()[1]).should("have.css", "border-color", defaultColor);
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(board).children().each((item, index) => {
      if(index === 0 || index === 2) {
        cy.wrap(item.children()[1]).should("have.css", "border-color", modifiedColor);
      } else {
        cy.wrap(item.children()[1]).should("have.css", "border-color", changingColor);
      }
    });

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);
    cy.get(board).children().each((item, index) => {
      cy.wrap(item.children()[1]).should("have.css", "border-color", modifiedColor);
      cy.wrap(item.children()[1]).should("have.a.property", "textContent", (inputValue[inputValue.length - 1 - index]));
    });

  });

}); 
