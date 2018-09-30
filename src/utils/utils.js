export const processRequiredFieldsOnly = players => {
	let playerArray = [];
	let teamName;

	players.forEach(({idPlayer, idTeam, strPlayer, strTeam, dateBorn, strHeight, strWeight,strPosition}) => {
		let position = strPosition;

		teamName = strTeam;
	
		if(position === "WR" || position === "RB" || position === "TE" || position === "QB"){
			position = getFullPositionName(strPosition);
		}

		if((position === "Wide Receiver" || position === "Running Back" || position === "Quarterback" || position === "Tight End") && !strHeight.includes("ft")){
			playerArray.push({
				idPlayer,
				idTeam,
				strPlayer,
				strTeam,
				dateBorn,
				strHeight,
				strWeight,
				strPosition: position
			});
		}
	});

	return {teamName, playerArray};
}

export const getFullPositionName = strPositionAbbr => {
	switch(strPositionAbbr){
		case "WR":
			return "Wide Receiver";

		case "RB":
			return "Running Back";

		case "QB":
			return "Quarterback";

		case "TE":
			return "Tight End";
	}			
}

export const processRequiredFieldsAllSeasons = events => {
	let eventArray = [];
	let year;

	events.forEach(({strSeason, strHomeTeam, strAwayTeam, intHomeScore, intAwayScore, dateEvent}) => {
		year = strSeason;
		eventArray.push({
			strHomeTeam,
			strAwayTeam,
			intHomeScore,
			intAwayScore,
			dateEvent,
			strSeason
		});
	});

	return {year, eventArray};
}

export const getHeightInMeters = (heightInFeet, heightInInches) => (heightInFeet * 30.48 + heightInInches * 2.54).toFixed(2);

export const getAge = (dateOfBirth/*yyyy-mm-dd*/) => {
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