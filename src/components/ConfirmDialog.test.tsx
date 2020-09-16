import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

import ConfirmDialog from './ConfirmDialog';

describe('Component: ConfirmDialog', () => {
  test('should render component description', () => {
    // @ts-ignore
    const component = shallow(
      <ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} />
    );
    const description = component.find('#alert-dialog-description');
    expect(description.length).toBe(1);
  });
  test('should render component buttons', () => {
    // @ts-ignore
    const component = shallow(
      <ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} />
    );
    const buttons = component.find('WithStyles(ForwardRef(Button))');
    expect(buttons.length).toBe(2); // confirm & cancel
    // console.log(component.debug());
  });
});
