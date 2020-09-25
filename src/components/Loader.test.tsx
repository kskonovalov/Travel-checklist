import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import Loader from './Loader';

configure({ adapter: new Adapter() });

const setUp = () => {
  return <Loader />;
};

describe('Component: Loader', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp());
    expect(component).toMatchSnapshot();
  });
});
