import renderer from 'react-test-renderer';
import { Button } from "./button";

it('Кнопка рендерится без ошибок', () => {
  const tree = renderer
    .create(<Button />)
    .toJSON();
    expect(tree).toMatchSnapshot();
}); 