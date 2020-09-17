import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

import ConfirmDialog from './ConfirmDialog';

const setUp = () => {
  return <ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} />;
};

// todo line coverage
describe('Component: ConfirmDialog', () => {
  test('Should contain description', () => {
    const component = shallow(setUp());
    const description = component.find('#alert-dialog-description');
    expect(description.length).toBe(1);
  });
  test('Should contain 2 buttons', () => {
    const component = shallow(setUp());
    const buttons = component.find('WithStyles(ForwardRef(Button))');
    expect(buttons.length).toBe(2); // confirm & cancel
    // console.log(component.debug());
  });
  test('Should match snapshot', () => {
    const component = shallow(setUp());
    expect(component).toMatchSnapshot();
  });
});
