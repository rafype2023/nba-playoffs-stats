// populate_db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

const mongoUri = "mongodb+srv://rafyperez:mr8akVatiil5jIMo@rafael.go0kq.mongodb.net/?retryWrites=true&w=majority&appName=Rafael";

async function populateDatabase() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('Rafael');
    const teamStatsCollection = db.collection('teamStats');

    // No drop command, so we add to the existing data

    const teamStatsData = [
      {
        "Team": "Golden State Warriors",
        "Games Played": 70,
        "Wins": 41,
        "Losses": 29,
        "Winning Percentage": 0.586,
        "Minutes Played": 48.1,
        "Points": 113.3,
        "Field Goals Made": 40.8,
        "Field Goals Attempts": 90.8,
        "FG Percentage": 45.0,
        "3 Pts Made": 15.3,
        "3 Pts Attempted": 42.2,
        "3pts Percentage": 36.3,
        "Free Throw Made": 16.4,
        "Free Throws Attempt": 21.7,
        "Free Throw Percentage": 75.4,
        "OFF Reb": 12.6,
        "DEF Reb": 33.2,
        "Rebounds": 45.7,
        "Assist": 29.1,
        "Turnovers": 14.1,
        "Steals": 9.1,
        "Blocks": 5.1,
        "Blocks Against": 5.5,
        "Fouls": 19.5,
        "Fouls Against": 18.3,
        "Plus or Minus": 2.6,
      },
      {
        "Team": "Indiana Pacers",
        "Games Played": 69,
        "Wins": 40,
        "Losses": 29,
        "Winning Percentage": 0.580,
        "Minutes Played": 48.4,
        "Points": 116.7,
        "Field Goals Made": 43.4,
        "Field Goals Attempts": 88.8,
        "FG Percentage": 48.9,
        "3 Pts Made": 13.0,
        "3 Pts Attempted": 35.2,
        "3pts Percentage": 36.9,
        "Free Throw Made": 16.8,
        "Free Throws Attempt": 21.3,
        "Free Throw Percentage": 78.9,
        "OFF Reb": 9.0,
        "DEF Reb": 32.2,
        "Rebounds": 41.2,
        "Assist": 29.0,
        "Turnovers": 13.5,
        "Steals": 8.6,
        "Blocks": 5.2,
        "Blocks Against": 4.5,
        "Fouls": 19.0,
        "Fouls Against": 18.6,
        "Plus or Minus": 1.2,
      },
      {
        "Team": "LA Clippers",
        "Games Played": 70,
        "Wins": 40,
        "Losses": 30,
        "Winning Percentage": 0.571,
        "Minutes Played": 48.3,
        "Points": 111.9,
        "Field Goals Made": 41.2,
        "Field Goals Attempts": 86.3,
        "FG Percentage": 47.7,
        "3 Pts Made": 12.3,
        "3 Pts Attempted": 33.8,
        "3pts Percentage": 36.5,
        "Free Throw Made": 17.3,
        "Free Throws Attempt": 21.7,
        "Free Throw Percentage": 79.4,
        "OFF Reb": 10.4,
        "DEF Reb": 33.3,
        "Rebounds": 43.8,
        "Assist": 25.1,
        "Turnovers": 15.3,
        "Steals": 9.6,
        "Blocks": 4.6,
        "Blocks Against": 4.4,
        "Fouls": 18.4,
        "Fouls Against": 17.8,
        "Plus or Minus": 3.4,
      },
      {
        "Team": "Minnesota Timberwolves",
        "Games Played": 72,
        "Wins": 41,
        "Losses": 31,
        "Winning Percentage": 0.569,
        "Minutes Played": 48.3,
        "Points": 113.7,
        "Field Goals Made": 40.6,
        "Field Goals Attempts": 87.3,
        "FG Percentage": 46.4,
        "3 Pts Made": 15.2,
        "3 Pts Attempted": 40.0,
        "3pts Percentage": 38.0,
        "Free Throw Made": 17.4,
        "Free Throws Attempt": 21.9,
        "Free Throw Percentage": 79.4,
        "OFF Reb": 10.9,
        "DEF Reb": 33.0,
        "Rebounds": 43.9,
        "Assist": 26.0,
        "Turnovers": 14.5,
        "Steals": 8.3,
        "Blocks": 4.9,
        "Blocks Against": 4.7,
        "Fouls": 18.1,
        "Fouls Against": 19.2,
        "Plus or Minus": 4.5,
      },
    ];

    await teamStatsCollection.insertMany(teamStatsData);

    console.log('Team statistics data added to the database!');
  } catch (err) {
    console.error('Error adding team statistics data:', err);
  } finally {
    await client.close();
  }
}

populateDatabase();