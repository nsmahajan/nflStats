import ChartDropDown from '../src/ChartDropDown';
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Testing dropdown select functionality', () => {
	const currentSelectedChart = "age";
	const chartDropDownChange = jest.fn();
	
	const wrapper = mount(<ChartDropDown
								chartDropDownChange={chartDropDownChange}
								defaultValue={currentSelectedChart}
							/>
						);

  	const select = wrapper.find('select');
	const selectDOMNode = select.getDOMNode();
	selectDOMNode.value = 'heightWeight';
	select.simulate('change', { target: selectDOMNode });

	expect(chartDropDownChange).toHaveBeenCalledWith("heightWeight");	
});