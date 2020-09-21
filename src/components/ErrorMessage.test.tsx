import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import ErrorMessage from './ErrorMessage';

configure({ adapter: new Adapter() });

const setUp = ({ text }: { text: string }) => {
  return <ErrorMessage text={text} />;
};

describe('Component: ErrorMessage', () => {
  test('Should match snapshot', () => {
    const text = 'Test text';
    const component = shallow(setUp({ text }));
    expect(component).toMatchSnapshot();
  });

  test('Should render correct text from param', () => {
    const text = 'Test text';
    const component = shallow(setUp({ text }));
    expect(component.text()).toEqual(text);
  });
});
