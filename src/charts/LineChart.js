import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import {getLineChartConfigDetails, createLineChartData} from '../utils/lineChartUtils';

class LineChart extends Component {

	render() {
		let data = createLineChartData(this.props.allSeasons);
		let chartOptions = getLineChartConfigDetails();

		return (
			<div className="scatterChart">
				<Line
					data={data}
					height={400}

					legend={{
						"position": 'bottom',
						"labels":{
							"usePointStyle": true
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

export default LineChart;