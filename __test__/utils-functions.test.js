import { processRequiredFieldsOnly, processRequiredFieldsAllSeasons, getFullPositionName } from '../src/utils/utils';

test('create array with required fields for player data', () => {
  const startState = [{
        "idPlayer": "34150302",
        "idTeam": "134949",
        "idSoccerXML": null,
        "idPlayerManager": null,
        "strNationality": "USA",
        "strPlayer": "Evan Moore",
        "strTeam": "Seattle Seahawks",
        "strSport": "American Football",
        "intSoccerXMLTeamID": null,
        "dateBorn": "1985-01-03",
        "dateSigned": null,
        "strSigning": null,
        "strWage": null,
        "strBirthLocation": null,
        "strDescriptionEN": null,
        "strDescriptionDE": null,
        "strDescriptionFR": null,
        "strDescriptionCN": null,
        "strDescriptionIT": null,
        "strDescriptionJP": null,
        "strDescriptionRU": null,
        "strDescriptionES": null,
        "strDescriptionPT": null,
        "strDescriptionSE": null,
        "strDescriptionNL": null,
        "strDescriptionHU": null,
        "strDescriptionNO": null,
        "strDescriptionIL": null,
        "strDescriptionPL": null,
        "strGender": "Male",
        "strPosition": "TE",
        "strCollege": "Stanford",
        "strFacebook": null,
        "strWebsite": null,
        "strTwitter": null,
        "strInstagram": null,
        "strYoutube": null,
        "strHeight": "6-6",
        "strWeight": "250",
        "intLoved": "0",
        "strThumb": null,
        "strCutout": null,
        "strBanner": null,
        "strFanart1": null,
        "strFanart2": null,
        "strFanart3": null,
        "strFanart4": null,
        "strLocked": "unlocked"
    }]

  const finState = processRequiredFieldsOnly(startState);

  expect(finState).toEqual(
    {
      "teamName": "Seattle Seahawks",
      "playerArray": [{
          "idPlayer": "34150302",
          "idTeam": "134949",
          "strPlayer": "Evan Moore",
          "strTeam": "Seattle Seahawks",
          "dateBorn": "1985-01-03",
          "strHeight": "6-6",
          "strWeight": "250",
          "strPosition": "Tight End",
        }]
    }
  );

});

test('create array with required fields only for event data', () => {
  const startState = [{
        "idEvent": "515533",
        "idSoccerXML": null,
        "strEvent": "Washington Redskins vs New York Giants",
        "strFilename": "American NFL 2016-01-01 Washington Redskins vs New York Giants",
        "strSport": "American Football",
        "idLeague": "4391",
        "strLeague": "NFL",
        "strSeason": "2016",
        "strDescriptionEN": null,
        "strHomeTeam": "Washington Redskins",
        "strAwayTeam": "New York Giants",
        "intHomeScore": "10",
        "intRound": "17",
        "intAwayScore": "19",
        "intSpectators": null,
        "strHomeGoalDetails": null,
        "strHomeRedCards": null,
        "strHomeYellowCards": null,
        "strHomeLineupGoalkeeper": null,
        "strHomeLineupDefense": null,
        "strHomeLineupMidfield": null,
        "strHomeLineupForward": null,
        "strHomeLineupSubstitutes": null,
        "strHomeFormation": null,
        "strAwayRedCards": null,
        "strAwayYellowCards": null,
        "strAwayGoalDetails": null,
        "strAwayLineupGoalkeeper": null,
        "strAwayLineupDefense": null,
        "strAwayLineupMidfield": null,
        "strAwayLineupForward": null,
        "strAwayLineupSubstitutes": null,
        "strAwayFormation": null,
        "intHomeShots": null,
        "intAwayShots": null,
        "dateEvent": "2016-01-01",
        "strDate": null,
        "strTime": null,
        "strTVStation": null,
        "idHomeTeam": "134937",
        "idAwayTeam": "134935",
        "strResult": null,
        "strCircuit": null,
        "strCountry": null,
        "strCity": null,
        "strPoster": null,
        "strFanart": null,
        "strThumb": null,
        "strBanner": null,
        "strMap": null,
        "strLocked": "unlocked"
    }]

  const finState = processRequiredFieldsAllSeasons(startState);

  expect(finState).toEqual(
    {
      "year": "2016",
      "eventArray": [{
        "strHomeTeam": "Washington Redskins",
        "strAwayTeam": "New York Giants",
        "intHomeScore": "10",
        "intAwayScore": "19",
        "dateEvent": "2016-01-01",
        "strSeason": "2016"
      }]
    }
  );

});

test('get full name of starting position based on abbr', () => {
  const startState1 = "WR";
  const finState1 = getFullPositionName(startState1);
  expect(finState1).toEqual("Wide Receiver");

  const startState2 = "RB";
  const finState2 = getFullPositionName(startState2);
  expect(finState2).toEqual("Running Back");

  const startState3 = "QB";
  const finState3 = getFullPositionName(startState3);
  expect(finState3).toEqual("Quarterback");

  const startState4 = "TE";
  const finState4 = getFullPositionName(startState4);
  expect(finState4).toEqual("Tight End");
});