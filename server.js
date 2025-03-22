// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = 3000;

const mongoUri = "mongodb+srv://rafyperez:mr8akVatiil5jIMo@rafael.go0kq.mongodb.net/?retryWrites=true&w=majority&appName=Rafael";

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

async function getTeamsFromDatabase() {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('Rafael');
    const teamStatsCollection = db.collection('teamStats');

    const teams = await teamStatsCollection.distinct('Team'); // Changed from 'team' to 'Team'
    return teams;
  } catch (err) {
    console.error('Error fetching teams:', err);
    return;
  } finally {
    await client.close();
  }
}

async function getTeamStats(teamName) {
  const client = new MongoClient(mongoUri);

  try {
    await client.connect();
    const db = client.db('Rafael');
    const teamStatsCollection = db.collection('teamStats');

    const teamStats = await teamStatsCollection.findOne({ Team: teamName }); // Changed from 'team' to 'Team'
    return teamStats;
  } catch (err) {
    console.error('Error fetching team stats:', err);
    return null;
  } finally {
    await client.close();
  }
}

app.get('/api/teams', async (req, res) => {
  const teams = await getTeamsFromDatabase();
  res.json(teams);
});

app.post('/api/compare', async (req, res) => {
  const { team1, team2 } = req.body;

  const team1Stats = await getTeamStats(team1);
  const team2Stats = await getTeamStats(team2);

  if (!team1Stats || !team2Stats) {
    return res.status(404).json({ error: 'Team not found' });
  }

  // Compare stats and add asterisks
  const comparisonResults = compareAndHighlightStats(team1Stats, team2Stats);

  res.json(comparisonResults);
});

function compareAndHighlightStats(team1Stats, team2Stats) {
  const statsToCompare = [
    'Games Played', 'Wins', 'Losses', 'Minutes Played', 'Points', 'Field Goals Made',
    'Fiel Goals Attempts', 'FG Percentage', '3 Pts Made', '3 Pts Attempted',
    '3pts Percentage', 'Free Throw Made', 'Free Throws Attempt', 'Free Throw Percentage',
    'OFF Reb', 'DEF Reb', 'Rebounds', 'Assist', 'Turnovers', 'Steals', 'Blocks',
    'Blocks Against', 'Fouls', 'Fouls Against', 'Plus or Minus', 'Plus Minus Per Game', 'Winning Percentage'
  ];

  const comparisonResults = {
    team1: { Team: team1Stats.Team, stats: {} }, // Changed from 'team' to 'Team'
    team2: { Team: team2Stats.Team, stats: {} }  // Changed from 'team' to 'Team'
  };

  statsToCompare.forEach(stat => {
    const team1Value = team1Stats[stat];
    const team2Value = team2Stats[stat];

    if (typeof team1Value === 'number' && typeof team2Value === 'number') {
      if (team1Value > team2Value) {
        comparisonResults.team1.stats[stat] = `${team1Value} *`;
        comparisonResults.team2.stats[stat] = team2Value;
      } else if (team2Value > team1Value) {
        comparisonResults.team1.stats[stat] = team1Value;
        comparisonResults.team2.stats[stat] = `${team2Value} *`;
      } else {
        comparisonResults.team1.stats[stat] = team1Value;
        comparisonResults.team2.stats[stat] = team2Value;
      }
    } else {
      comparisonResults.team1.stats[stat] = team1Value;
      comparisonResults.team2.stats[stat] = team2Value;
    }
  });

  return comparisonResults;
}

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});