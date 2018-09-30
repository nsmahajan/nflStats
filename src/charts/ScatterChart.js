import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';
import {getScatterChartConfigDetails, createScatterChartData} from '../utils/scatterChartUtils'

class ScatterChart extends Component {
	render() {
		let data = createScatterChartData(this.props.teams);
		let chartOptions = getScatterChartConfigDetails();

		return (
			<div className="scatterChart">
				<Scatter
					data={data}
					height={500}

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

export default ScatterChart;