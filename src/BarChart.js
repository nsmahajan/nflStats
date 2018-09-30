import React, { Component } from 'react';
import {Bar} from 'react-chartjs-2';

class BarChart extends Component {

	getAge(dateOfBirth /*yyyy-mm-dd*/){
		var dateSplit = dateOfBirth.split("-");
		var joinDate = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];

		var today = new Date();
		var birthDate = new Date(joinDate); // mm/dd/yyyy format is acceptable
		
		var age = today.getFullYear() - birthDate.getFullYear();
		
		var m = today.getMonth() - birthDate.getMonth();
		
		if(m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
			age = age - 1;
		}

		return age;
	}

	createChartData(teams){
		let teamNames = [];
		let averageAge = [];


		if(Object.keys(teams).length !== 0){
			Object.entries(teams).forEach(([key, value]) => {
				let totalAge = 0;

				value.forEach(({dateBorn}) => {
					totalAge += this.getAge(dateBorn);
				});

				teamNames.push(key);
				averageAge.push((totalAge / value.length).toFixed(2));
			});
		}

		let data = {
			labels: teamNames,
			datasets: [{
    			label: "Average Age",
    			data: averageAge,
    			fill: false,
    			backgroundColor: 'rgba(255,99,132,0.2)',
    			borderColor:'rgba(255,99,132,1)',
    			borderWidth: 1
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
					"type":'category',
					"position":'bottom',
					"display":true,
					"barThickness":15,
					"categorySpacing": 0,
					"scaleLabel":{
						"display":true,
						"labelString": 'Team',
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
						"labelString": 'Average Age',
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