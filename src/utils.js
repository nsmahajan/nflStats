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