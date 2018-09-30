import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ScatterChart from './ScatterChart'
import BarChart from './BarChart'
import Popup from './Popup'
import ChartDropDown from './ChartDropDown'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import {processRequiredFieldsOnly} from './utils'

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			teams: {},
			chart1Title: "Average age of team players",
			chart2Title: "Height/Weight Statistics",
			currentSelectedChart: "age",
			showPopup: false
		};

		this.chartDropDownChange = this.chartDropDownChange.bind(this);
		this.saveChartTitle = this.saveChartTitle.bind(this);
	}

	chartDropDownChange(value) {
		this.setState({currentSelectedChart: value});
	}

	saveChartTitle(newTitle){
		if(this.state.currentSelectedChart === 'age'){
			this.setState({
				chart1Title: newTitle,
				showPopup: !this.state.showPopup
			});
		}
		else if(this.state.currentSelectedChart === 'heightWeight'){
			this.setState({
				chart2Title: newTitle,
				showPopup: !this.state.showPopup
			});
		}
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	getAllPlayersForTeams(teamID) {
  		return axios.get('https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=' + teamID);
	}
	
	componentDidMount() {
		let teamObjects = {};

		axios.all([this.getAllPlayersForTeams(134946), this.getAllPlayersForTeams(134942),this.getAllPlayersForTeams(134922),
					this.getAllPlayersForTeams(134939),this.getAllPlayersForTeams(134935),this.getAllPlayersForTeams(134932),
					this.getAllPlayersForTeams(134948),this.getAllPlayersForTeams(134937)])

			/*
			Useless data
			this.getAllPlayersForTeams(134918),this.getAllPlayersForTeams(134943),this.getAllPlayersForTeams(134938),
			this.getAllPlayersForTeams(134923),this.getAllPlayersForTeams(134924),this.getAllPlayersForTeams(134934),
			this.getAllPlayersForTeams(134930),this.getAllPlayersForTeams(134940),this.getAllPlayersForTeams(134926),
			this.getAllPlayersForTeams(134927),this.getAllPlayersForTeams(134928),this.getAllPlayersForTeams(134931),
			this.getAllPlayersForTeams(135908),this.getAllPlayersForTeams(135907),this.getAllPlayersForTeams(134919),
			this.getAllPlayersForTeams(134941),this.getAllPlayersForTeams(134920),this.getAllPlayersForTeams(134944),
			this.getAllPlayersForTeams(134921),this.getAllPlayersForTeams(134925),this.getAllPlayersForTeams(134949),
			this.getAllPlayersForTeams(134945),this.getAllPlayersForTeams(134929),this.getAllPlayersForTeams(134936)
			*/


		.then(arr => {
			arr.forEach(value => {
				let tempObject = processRequiredFieldsOnly(value.data.player);
				teamObjects[tempObject.teamName] = tempObject.playerArray;
			});

			this.setState({
				teams: teamObjects
			});
		})
	}

	render() {
		return (
			<div className="mainContainer">
					
				<ChartDropDown
					chartDropDownChange={this.chartDropDownChange}
					defaultValue={this.state.currentSelectedChart}
				/>

		        <div className='chartTitleContainer'>
		        	<label className='chartTitle'>{this.state.currentSelectedChart === 'age' ? this.state.chart1Title: this.state.chart2Title}</label>
		        	<button className="editTitle" onClick={this.togglePopup.bind(this)}><FontAwesomeIcon icon={faPen} size="lg"/></button>
		        </div>

				{this.state.currentSelectedChart === 'heightWeight' && <ScatterChart teams={this.state.teams} chartTitle={this.state.chart1Title} />}
				{this.state.currentSelectedChart === 'age' && <BarChart teams={this.state.teams} chartTitle={this.state.chart2Title} />}

				{this.state.showPopup ? 
					<Popup
						title={this.state.currentSelectedChart === 'age' ? this.state.chart1Title: this.state.chart2Title}
						cancelPopup={this.togglePopup.bind(this)}
						saveChartTitle={this.saveChartTitle}
					/>
					: null
				}
			</div>
		);
	}
}

export default App;
