import React, { Component } from 'react';
import {Scatter} from 'react-chartjs-2';

class ScatterChart extends Component {

	getHeightInMeters(heightInFeet, heightInInches){
		return (heightInFeet * 30.48 + heightInInches * 2.54).toFixed(2);
	}

	createChartData(teams){
		let wideReceivers = [];
		let runningBacks = [];
		let tightEnds = [];
		let quarterback = [];

		if(Object.keys(teams).length !== 0){
			Object.values(teams).forEach(value => {
				value.forEach(({strPosition, strHeight, strWeight}) => {
					let splitHeight = strHeight.split("-");
					let heightInFeet = 0;
					let heightInInches = 0;

					if(splitHeight.length === 2){
						heightInFeet = parseInt(splitHeight[0]);
						heightInInches = parseInt(splitHeight[1]);
					}

					let height = this.getHeightInMeters(heightInFeet, heightInInches);

					switch(strPosition){
						case "Wide Receiver":
							wideReceivers.push({x: parseInt(strWeight), y: height});
						break;

						case "Running Back":
							runningBacks.push({x: parseInt(strWeight), y: height});
						break;

						case "Quarterback":
							quarterback.push({x: parseInt(strWeight), y: height});
						break;

						case "Tight End":
							tightEnds.push({x: parseInt(strWeight), y: height});
						break;
					}
				});
			});
		}

		let data = {
			datasets: [{
    			label: "Wide Receiver",
    			data: wideReceivers,
    			fill: false,
    			borderColor: 'rgba(112, 219, 112, 1)',
    			backgroundColor: 'rgba(112, 219, 112, 0.2)',
    			pointRadius: 4
    		},
    		{
    			label: "Running Back",
    			data: runningBacks,
    			fill: false,
    			borderColor: 'rgba(255, 51, 204, 1)',
    			backgroundColor: 'rgba(255, 51, 204, 0.2)',
    			pointRadius: 4
    		},
    		{
    			label: "Quarterback",
    			data: quarterback,
    			fill: false,
    			borderColor: 'rgba(128, 159, 255, 1)',
    			backgroundColor: 'rgba(128, 159, 255, 0.2)',
    			pointRadius: 4
    		},
    		{
    			label: "Tight End",
    			data: tightEnds,
    			fill: false,
    			borderColor: 'rgba(255, 153, 0, 1)',
    			backgroundColor: 'rgba(255, 153, 0, 0.2)',
    			pointRadius: 4
    		}]
		};

		return data;
	}

	getChartConfigDetails(){
		return {
			"maintainAspectRatio": false,
			"responsive": true,
			"animation":{
				"duration":0
			},
			"title":{
				"display":false
			},
			"scales":{
				"xAxes":[{
					"type":'linear',
					"position":'bottom',
					"display":true,
					"scaleLabel":{
						"display":true,
						"labelString": 'Weight (lbs)',
						"fontSize": 14
					},
					"gridLines":{
						"drawOnChartArea": false
					}
				}],
				"yAxes":[{
					"type":'linear',
					"position":'left',
					"display":true,
					"scaleLabel":{
						"display":true,
						"labelString": 'Height (cms)',
						"fontSize": 14
					},
					"gridLines":{
						"drawOnChartArea": false
					}
				}]
			}
		};
	}

	render() {
		let data = this.createChartData(this.props.teams);
		let chartOptions = this.getChartConfigDetails();

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