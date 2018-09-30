import React from 'react'
import { shallow } from 'enzyme'
import App from '../src/App'
import Popup from '../src/Popup'
import ChartDropDown from '../src/ChartDropDown'
import ScatterChart from '../src/charts/ScatterChart'
import BarChart from '../src/charts/BarChart'
import LineChart from '../src/charts/LineChart'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('<App /> component', () => {
    it('should render chart dropdown, default age bar chart component', () => {
        const appComponent = shallow(<App />);
        expect(appComponent.find(ChartDropDown).length).toBe(1);
        expect(appComponent.find(BarChart).length).toBe(1);  
        expect(appComponent.find(ScatterChart).length).toBe(0);
        expect(appComponent.find(Popup).length).toBe(0);
        expect(appComponent.find(LineChart).length).toBe(0);    
    });

    it('should render average age bar chart component if currentSelectedChart = age', () => {
        const appComponent = shallow(<App />);
        appComponent.setState({ currentSelectedChart: 'age' });
        expect(appComponent.find(BarChart).length).toBe(1);  
        expect(appComponent.find(ScatterChart).length).toBe(0);
        expect(appComponent.find(LineChart).length).toBe(0);  
    });

    it('should render height weight scatter chart component if currentSelectedChart = heightWeight', () => {
        const appComponent = shallow(<App />);
        appComponent.setState({ currentSelectedChart: 'heightWeight' });
        expect(appComponent.find(BarChart).length).toBe(0);  
        expect(appComponent.find(ScatterChart).length).toBe(1);
        expect(appComponent.find(LineChart).length).toBe(0);  
    });

    it('should render winning/losing line chart component if currentSelectedChart = winningLosing', () => {
        const appComponent = shallow(<App />);
        appComponent.setState({ currentSelectedChart: 'winningLosing' });
        expect(appComponent.find(BarChart).length).toBe(0);  
        expect(appComponent.find(ScatterChart).length).toBe(0);
        expect(appComponent.find(LineChart).length).toBe(1);  
    });

    it('show popup', () => {
        const appComponent = shallow(<App />);
        appComponent.setState({ showPopup: true });
        expect(appComponent.find(Popup).length).toBe(1);
    });

    it('hide popup', () => {
        const appComponent = shallow(<App />);
        appComponent.setState({ showPopup: false });
        expect(appComponent.find(Popup).length).toBe(0);
    });
});