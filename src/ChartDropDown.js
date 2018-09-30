import React, { Component } from 'react';

class ChartDropDown extends Component {
  constructor(props) {
    super(props);
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.chartDropDownChange(event.target.value);
  }

  render() {
    return (
      <select className="chartTypeSelect" defaultValue={this.props.currentSelectedChart} onChange={this.handleChange}>
        <option value="age">NFL Age Stats</option>
        <option value="heightWeight">NFL Height/Weight Stats</option>
        <option value="winningLosing">Winning/Losing Score Trend</option>
      </select>
    );
  }
}


export default ChartDropDown;