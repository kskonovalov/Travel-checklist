import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({ adapter: new Adapter() });

import ConfirmDialog from './ConfirmDialog';

describe('Component: ConfirmDialog', () => {
  test('should render componen', () => {
    // @ts-ignore
    const component = shallow(
      <ConfirmDialog open={true} onClose={() => {}} onConfirm={() => {}} />
    );
    const description = component.find('#alert-dialog-description');
    expect(description.length).toBe(1);
  });
});
