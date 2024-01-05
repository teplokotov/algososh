import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

it('Circle без буквы', () => {
	const tree = renderer.create(<Circle />).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c буквами', () => {
	const tree = renderer.create(<Circle letter='test'/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c head', () => {
	const tree = renderer.create(<Circle head='head'/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c react-элементом в head', () => {
	const tree = renderer.create(<Circle head={<Circle />}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c tail', () => {
	const tree = renderer.create(<Circle tail='tail'/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c react-элементом в tail', () => {
	const tree = renderer.create(<Circle tail={<Circle />}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle c index', () => {
	const tree = renderer.create(<Circle index={0}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle с пропом isSmall ===  true', () => {
	const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle в состоянии default', () => {
	const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle в состоянии changing', () => {
	const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
	expect(tree).toMatchSnapshot();
});

it('Circle в состоянии modified', () => {
	const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
	expect(tree).toMatchSnapshot();
});