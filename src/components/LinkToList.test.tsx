import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import LinkToList from './LinkToList';

configure({ adapter: new Adapter() });

const setUp = ({ text }: { text: string }) => {
  return <LinkToList />;
};

describe('Component: ErrorMessage', () => {
  test('Should match snapshot', () => {
    const text = 'Test text';
    const component = shallow(setUp({ text }));
    expect(component).toMatchSnapshot();
  });
});
