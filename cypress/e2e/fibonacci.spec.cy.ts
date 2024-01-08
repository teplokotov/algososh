/* eslint-disable testing-library/await-async-utils */
describe('Тестирование страницы: Последовательность Фибоначчи', function() {

    const addr = 'http://localhost:3000/fibonacci';
    const inputValue = '3';
    const outputArr = ['1', '1', '2', '3'];
  
    const input = '#root > div > main > div > form > div > input';
    const button = '#root > div > main > div > form > button';
    const board = '#root > div > main > div > div';
  
    it('если в инпуте пусто, то кнопка добавления недоступна', function() {
      cy.viewport(1280, 1024);
      cy.visit(addr);
      cy.get(input).clear();
      cy.get(button).should('be.disabled');
    });
  
    it('числа генерируются корректно', function() {
      cy.viewport(1280, 1024);
      cy.visit(addr);
      cy.get(input).clear();
      cy.get(input).type(inputValue);
      cy.get(button).click();
  
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait((outputArr.length - 1) * 1000);

      cy.get(board).children().each((item, index) => {
        cy.wrap(item.children()[1]).should("have.a.property", "textContent", outputArr[index]);
      });
  
    });
  
  }); 
  