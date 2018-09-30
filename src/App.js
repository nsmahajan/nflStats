import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ScatterChart from './charts/ScatterChart';
import BarChart from './charts/BarChart';
import LineChart from './charts/LineChart';
import Popup from './Popup';
import ChartDropDown from './ChartDropDown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import {processRequiredFieldsOnly, processRequiredFieldsAllSeasons} from './utils/utils';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			teams: {},
			chartTitle: ["Average age of team players","Height/Weight Statistics", "Winning/Losing Team Scores"],
			currentSelectedChart: "age",
			showPopup: false,
			allSeasons:{}
		};

		this.chartDropDownChange = this.chartDropDownChange.bind(this);
		this.saveChartTitle = this.saveChartTitle.bind(this);
	}

	chartDropDownChange(value) {
		this.setState({currentSelectedChart: value});
	}

	saveChartTitle(newTitle){
		const chartTitle = this.state.chartTitle;

		if(this.state.currentSelectedChart === 'age'){
    		chartTitle[0] = newTitle;
    	} else if(this.state.currentSelectedChart === 'heightWeight'){
    		chartTitle[1] = newTitle;
    	} else if(this.state.currentSelectedChart === 'winningLosing'){
    		chartTitle[2] = newTitle;
    	}

	    this.setState({
	        chartTitle: chartTitle,
	        showPopup: false
	    });
	}

	togglePopup() {
		this.setState({
			showPopup: !this.state.showPopup
		});
	}

	getAllPlayersForTeams(teamID) {
  		return axios.get('https://www.thesportsdb.com/api/v1/json/1/lookup_all_players.php?id=' + teamID);
	}
	
	getAllSeasonsForYear(year) {
  		return axios.get('https://www.thesportsdb.com/api/v1/json/1/eventsseason.php?id=4391&s=' + year);
	}

	getChartTitleIndex(){
		if(this.state.currentSelectedChart === 'age'){
    		return this.state.chartTitle[0];
    	} else if(this.state.currentSelectedChart === 'heightWeight'){
    		return this.state.chartTitle[1];
    	} else if(this.state.currentSelectedChart === 'winningLosing'){
    		return this.state.chartTitle[2];
    	}
	}

	componentDidMount() {
		let teamObjects = {};
		let seasonsObjects = {};
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

		axios.all([this.getAllPlayersForTeams(134946), this.getAllPlayersForTeams(134942),this.getAllPlayersForTeams(134922),
					this.getAllPlayersForTeams(134939),this.getAllPlayersForTeams(134935),this.getAllPlayersForTeams(134932),
					this.getAllPlayersForTeams(134948),this.getAllPlayersForTeams(134937)])
		.then(arr => {
			arr.forEach(value => {
				let tempObject = processRequiredFieldsOnly(value.data.player);
				teamObjects[tempObject.teamName] = tempObject.playerArray;
			});

			this.setState({
				teams: teamObjects
			});
		})

		axios.all([this.getAllSeasonsForYear(2000),this.getAllSeasonsForYear(2001),this.getAllSeasonsForYear(2002),
					this.getAllSeasonsForYear(2003),this.getAllSeasonsForYear(2004),this.getAllSeasonsForYear(2005),
					this.getAllSeasonsForYear(2006),this.getAllSeasonsForYear(2007),this.getAllSeasonsForYear(2008),
					this.getAllSeasonsForYear(2009),this.getAllSeasonsForYear(2010),this.getAllSeasonsForYear(2011),
					this.getAllSeasonsForYear(2012),this.getAllSeasonsForYear(2013),this.getAllSeasonsForYear(2014)])
		.then(arr => {
			arr.forEach(value => {
				let tempObject = processRequiredFieldsAllSeasons(value.data.events);
				seasonsObjects[tempObject.year] = tempObject.eventArray;
			});

			this.setState({
				allSeasons: seasonsObjects
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
		        	<label className='chartTitle'>{this.getChartTitleIndex()}</label>
		        	<button className="editTitle" onClick={this.togglePopup.bind(this)}><FontAwesomeIcon icon={faPen} size="lg"/></button>
		        </div>

				{this.state.currentSelectedChart === 'heightWeight' && <ScatterChart teams={this.state.teams} chartTitle={this.getChartTitleIndex()} />}
				{this.state.currentSelectedChart === 'age' && <BarChart teams={this.state.teams} chartTitle={this.getChartTitleIndex()} />}
				{this.state.currentSelectedChart === 'winningLosing' && <LineChart allSeasons={this.state.allSeasons} chartTitle={this.getChartTitleIndex()} />}

				{this.state.showPopup ? 
					<Popup
						title={this.getChartTitleIndex()}
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
