import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';
import {getBarChartConfigDetails, createBarChartData} from '../utils/barChartUtils'

class BarChart extends Component {

	render() {
		let data = createBarChartData(this.props.teams);
		let chartOptions = getBarChartConfigDetails();

		return (
			<div className="barChart">
				<Bar
					data={data}
					height={500}
					legend={{
						"position": 'bottom',
						"labels":{
							"usePointStyle": false
						},
						"display": true
					}}
					options={
            			chartOptions
          			}
				/>
			</div>
		);
	}
}

export default BarChart;