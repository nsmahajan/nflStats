import Popup from '../src/Popup';
import React from 'react';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

test('Chart title change popup', () => {
	const title = "Title 1";
	const cancelPopup = jest.fn();
	const saveChartTitle = jest.fn();

	const wrapper = mount(<Popup title={title}
								cancelPopup={cancelPopup}
								saveChartTitle={saveChartTitle}
							/>
						);

	const saveButton = wrapper.find('.saveButton button');
	saveButton.simulate('click');
	expect(saveChartTitle);

	const cancelButton = wrapper.find('.cancelButton button');
	cancelButton.simulate('click');
	expect(cancelPopup);
});