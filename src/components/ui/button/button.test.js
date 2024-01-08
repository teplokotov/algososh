import renderer from 'react-test-renderer';
import { Button } from "./button";

describe('Кнопка', () => {
	it('с текстом', () => {
		const tree = renderer.create(<Button text='Test'/>).toJSON();
		expect(tree).toMatchSnapshot();
	}); 

	it('без текста', () => {
		const tree = renderer.create(<Button />).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it('заблокированная', () => {
		const tree = renderer.create(<Button disabled/>).toJSON();
		expect(tree).toMatchSnapshot();
	}); 

	it('с индикацией загрузки', () => {
		const tree = renderer.create(<Button isLoader={true}/>).toJSON();
		expect(tree).toMatchSnapshot();
	});
});