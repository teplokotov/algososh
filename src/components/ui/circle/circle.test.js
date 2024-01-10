import renderer from 'react-test-renderer';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Circle', () => {
  it('без буквы', () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c буквами', () => {
    const tree = renderer.create(<Circle letter='test'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c head', () => {
    const tree = renderer.create(<Circle head='head'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c react-элементом в head', () => {
    const tree = renderer.create(<Circle head={<Circle />}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c tail', () => {
    const tree = renderer.create(<Circle tail='tail'/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c react-элементом в tail', () => {
    const tree = renderer.create(<Circle tail={<Circle />}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('c index', () => {
    const tree = renderer.create(<Circle index={0}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('с пропом isSmall ===  true', () => {
    const tree = renderer.create(<Circle isSmall={true}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('в состоянии default', () => {
    const tree = renderer.create(<Circle state={ElementStates.Default}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('в состоянии changing', () => {
    const tree = renderer.create(<Circle state={ElementStates.Changing}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('в состоянии modified', () => {
    const tree = renderer.create(<Circle state={ElementStates.Modified}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});