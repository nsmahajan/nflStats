import {getAge} from './utils';

export const createBarChartData = teams => {
	let teamNames = [];
	let averageAge = [];


	if(Object.keys(teams).length !== 0){
		Object.entries(teams).forEach(([key, value]) => {
			let totalAge = 0;

			value.forEach(({dateBorn}) => {
				totalAge += getAge(dateBorn);
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

export const getBarChartConfigDetails = () => {
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