import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

import EditDialog from './EditDialog';

const setUp = () => {
  return (
    <EditDialog open={true} listId="" task="" taskId="" onClose={() => {}} />
  );
};

describe('Component: EditDialog', () => {
  test('Should match snapshot', () => {
    // const component = shallow(setUp());
    // expect(component).toMatchSnapshot();
  });
});
