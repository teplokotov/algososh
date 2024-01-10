import { defaultColor } from "./constants/colors";
import { board, buttonAddByIndex, buttonAddToHead, buttonAddToTail, buttonDeleteByIndex, buttonDeleteFromHead, buttonDeleteFromTail, inputIndex, inputValue } from "./constants/selectors";

/* eslint-disable testing-library/await-async-utils */
describe('Тестирование страницы: Связный список', function() {

  const addr = 'list';
  const inputValue_1 = 'head';
  const inputValue_2 = 'tail';
  const inputValue_3 = 'betw';
  const idx = '1';

  it('если в инпуте пусто, то кнопка добавления в Head, кнопка добавления в Tail, кнопка добавления по индексу и кнопка удаления по индексу недоступны', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).clear();
    cy.get(buttonAddToHead).should('be.disabled');
    cy.get(buttonAddToTail).should('be.disabled');
    cy.get(buttonAddByIndex).should('be.disabled');
    cy.get(buttonDeleteByIndex).should('be.disabled');
  });
    
  it('дефолтный список отрисовывается корректно', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);

    cy.get(board).children().each((item, index, list) => {
      cy.wrap(item.children().children()[1]).should("have.css", "border-color", defaultColor);
      cy.wrap(item.children().children()[1]).should("not.have.a.property", "textContent", '');
      if(index === 0) {
        cy.wrap(item.children().children()[0]).should("have.a.property", "textContent", 'head');
        cy.wrap(item.children().children()[3]).should("have.a.property", "textContent", '');
      } else if (index === list.length - 1) {
        cy.wrap(item.children().children()[0]).should("have.a.property", "textContent", '');
        cy.wrap(item.children().children()[3]).should("have.a.property", "textContent", 'tail');
      }
    });
  });

  it('добавление элемента в head', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type(inputValue_1);
    cy.get(buttonAddToHead).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().each((item, index) => {
      if(index === 0) cy.wrap(item.children().children()[1]).should("have.a.property", "textContent", inputValue_1);
    });
  });

  it('добавление элемента в tail', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type(inputValue_2);
    cy.get(buttonAddToTail).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().each((item, index, list) => {
      if(index === list.length - 1) cy.wrap(item.children().children()[1]).should("have.a.property", "textContent", inputValue_2);
    });
  });

  it('добавление элемента по индексу ' + idx, function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type(inputValue_3);
    cy.get(inputIndex).type(idx);
    cy.get(buttonAddByIndex).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(2000);

    cy.get(board).children().each((item, index) => {
      if(index === Number(idx)) cy.wrap(item.children().children()[1]).should("have.a.property", "textContent", inputValue_3);
    });
  });

  it('удаление элемента из head', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type('del');
    cy.get(buttonAddToHead).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().then(elements => {
      const initialArr = Array.from(elements, item => item.children[0].children[1].textContent);

      cy.get(buttonDeleteFromHead).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.get(board).children().then(elements => {
        const newArr = Array.from(elements, item => item.children[0].children[1].textContent);
        cy.wrap(initialArr[0]).should('not.equal', newArr[0]);
      })
    })
  });

  it('удаление элемента из tail', function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type('del');
    cy.get(buttonAddToTail).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().then(elements => {
      const initialArr = Array.from(elements, item => item.children[0].children[1].textContent);

      cy.get(buttonDeleteFromTail).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.get(board).children().then(elements => {
        const newArr = Array.from(elements, item => item.children[0].children[1].textContent);
        cy.wrap(initialArr[initialArr.length - 1]).should('not.equal', newArr[newArr.length - 1]);
      })
    })
  });

  it('удаление элемента по индексу ' + idx, function() {
    cy.viewport(1280, 1024);
    cy.visit(addr);
    cy.get(inputValue).type('del');
    cy.get(inputIndex).type(idx);
    cy.get(buttonAddByIndex).click();

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(1000);

    cy.get(board).children().then(elements => {
      const initialArr = Array.from(elements, item => item.children[0].children[1].textContent);

      cy.get(inputIndex).type(idx);
      cy.get(buttonDeleteByIndex).click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(1000);

      cy.get(board).children().then(elements => {
        const newArr = Array.from(elements, item => item.children[0].children[1].textContent);
        cy.wrap(initialArr[Number(idx)]).should('not.equal', newArr[Number(idx)]);
      })
    })
  });
      
}); 
      