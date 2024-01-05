import renderer from 'react-test-renderer';
import { Button } from "./button";

it('Кнопка с текстом', () => {
	const tree = renderer.create(<Button text='Test'/>).toJSON();
	expect(tree).toMatchSnapshot();
}); 

it('Кнопка без текста', () => {
  const tree = renderer.create(<Button />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('Заблокированная кнопка', () => {
  const tree = renderer.create(<Button disabled/>).toJSON();
  expect(tree).toMatchSnapshot();
}); 

it('Кнопка с индикацией загрузки', () => {
  const tree = renderer.create(<Button isLoader={true}/>).toJSON();
  expect(tree).toMatchSnapshot();
}); 