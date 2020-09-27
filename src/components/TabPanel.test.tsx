import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import TabPanel from './TabPanel';

configure({ adapter: new Adapter() });

const setUp = () => {
  return <TabPanel index="" value="" />;
};

describe('Component: Loader', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp());
    expect(component).toMatchSnapshot();
  });
});
