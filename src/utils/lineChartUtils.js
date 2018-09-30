export const createLineChartData = allSeasons => {
	let winningScore = [];
	let losingScore = [];

	if(Object.keys(allSeasons).length !== 0){
		Object.values(allSeasons).forEach(event => {
			let winSum = 0;
			let loseSum = 0;
			let year;

			event.forEach(({intHomeScore, intAwayScore, strSeason}) => {
				year = parseInt(strSeason);

				if(intHomeScore !== null && intAwayScore !== null){
					let homeScore = parseInt(intHomeScore);
					let awayScore = parseInt(intAwayScore);

					if(homeScore > awayScore){
						winSum += homeScore;
						loseSum += awayScore;
					}else{
						winSum += awayScore;
						loseSum += homeScore;
					}
				}
			});

			winningScore.push({x: year, y: winSum});
			losingScore.push({x: year, y: loseSum});				
		});
	}

	let data = {
		datasets: [{
			label: "Winning Score",
			data: winningScore,
			fill: false,
			borderColor: 'rgba(112, 219, 112, 1)',
			backgroundColor: 'rgba(112, 219, 112, 0.2)',
			pointRadius: 4
		},
		{
			label: "Losing Score",
			data: losingScore,
			fill: false,
			borderColor: 'rgba(255, 51, 204, 1)',
			backgroundColor: 'rgba(255, 51, 204, 0.2)',
			pointRadius: 4
		}]
	};

	return data;
}

export const getLineChartConfigDetails = () => {
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
					"labelString": 'Year',
					"fontSize": 14
				},
				"ticks": {
                    "stepSize": 1
                },
				"gridLines":{
					"drawOnChartArea": true
				}
			}],
			"yAxes":[{
				"type":'linear',
				"position":'left',
				"display":true,
				"scaleLabel":{
					"display":true,
					"labelString": 'Score',
					"fontSize": 14
				},
				"gridLines":{
					"drawOnChartArea": false
				}
			}]
		}
	};
}