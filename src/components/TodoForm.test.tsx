import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import TodoForm, {ITodoForm} from './TodoForm';

configure({ adapter: new Adapter() });

const setUp = ({listId}: ITodoForm) => {
  return <TodoForm listId={listId}/>;
};

describe('Component: Loader', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp({listId: "test"}));
    expect(component).toMatchSnapshot();
  });
  test('Should render text if index === value', () => {
    const component = shallow(setUp({index: "1", value: "1", children: <div id="testdiv">test text</div>}));
    expect(component.find('#testdiv').length).toBe(1);
  });
});
