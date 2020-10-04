import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import TodoForm, {ITodoForm} from './TodoForm';

configure({ adapter: new Adapter() });

const setUp = ({listId}: ITodoForm) => {
  return <TodoForm listId={listId}/>;
};

describe('Component: TodoForm', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp({listId: "test"}));
    expect(component).toMatchSnapshot();
  });
});
