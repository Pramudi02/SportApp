import axios from 'axios';

const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

export const getLeagues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    const footballLeagues = response.data.leagues?.filter(
      league => league.strSport === 'Soccer'
    ) || [];
    return footballLeagues.slice(0, 20);
  } catch (error) {
    throw new Error('Failed to fetch leagues');
  }
};

export const getLeagueDetails = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupleague.php?id=${leagueId}`);
    return response.data.leagues?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch league details');
  }
};

export const getTeamsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup_all_teams.php?id=${leagueId}`);
    return response.data.teams || [];
  } catch (error) {
    throw new Error('Failed to fetch teams');
  }
};

export const getTeamDetails = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupteam.php?id=${teamId}`);
    return response.data.teams?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch team details');
  }
};

export const getPlayersByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup_all_players.php?id=${teamId}`);
    return response.data.player || [];
  } catch (error) {
    throw new Error('Failed to fetch players');
  }
};

export const searchPlayers = async (playerName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    return response.data.player || [];
  } catch (error) {
    throw new Error('Failed to search players');
  }
};

export const getPlayerDetails = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupplayer.php?id=${playerId}`);
    return response.data.players?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch player details');
  }
};

export const searchTeams = async (teamName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`);
    return response.data.teams || [];
  } catch (error) {
    throw new Error('Failed to search teams');
  }
};

export const getNextEventsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch upcoming matches');
  }
};

export const getLastEventsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventspastleague.php?id=${leagueId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch past matches');
  }
};

export const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupevent.php?id=${eventId}`);
    return response.data.events?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch event details');
  }
};

export const getNextEventsByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventsnext.php?id=${teamId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch team matches');
  }
};

export const getLastEventsByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventslast.php?id=${teamId}`);
    return response.data.results || [];
  } catch (error) {
    throw new Error('Failed to fetch past team matches');
  }
};
