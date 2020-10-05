import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import TodoList, {TList} from './TodoList';

configure({ adapter: new Adapter() });

const setUp = ({listId}: TList) => {
  return <TodoList listId={listId}/>;
};

describe('Component: TodoList', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp({listId: "test"}));
    expect(component).toMatchSnapshot();
  });
});
