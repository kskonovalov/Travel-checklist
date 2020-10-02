import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import TabPanel, {TabPanelProps} from './TabPanel';

configure({ adapter: new Adapter() });

const setUp = ({index, value, children = <></>}: TabPanelProps) => {
  return <TabPanel index={index} value={value} children={children} />;
};

describe('Component: Loader', () => {
  test('Should match snapshot', () => {
    const component = shallow(setUp({index: "", value: ""}));
    expect(component).toMatchSnapshot();
  });
  test('Should render text if index === value', () => {
    const component = shallow(setUp({index: "1", value: "1", children: <div id="testdiv">test text</div>}));
    expect(component.find('#testdiv').length).toBe(1);
  });
  test('Should NOT render text if index !== value', () => {
    const component = shallow(setUp({index: "1", value: "2", children: <div id="testdiv">test text</div>}));
    expect(component.find('#testdiv').length).toBe(0);
  });
});
