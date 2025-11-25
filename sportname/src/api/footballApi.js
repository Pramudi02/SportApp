import axios from 'axios';

// Using TheSportsDB API (free, no key required for basic features)
const BASE_URL = 'https://www.thesportsdb.com/api/v1/json/3';

/**
 * Get all football leagues
 * @returns {Promise<Array>} List of leagues
 */
export const getLeagues = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all_leagues.php`);
    // Filter to show only major football leagues
    const footballLeagues = response.data.leagues?.filter(
      league => league.strSport === 'Soccer'
    ) || [];
    return footballLeagues.slice(0, 20); // Return top 20 leagues
  } catch (error) {
    throw new Error('Failed to fetch leagues');
  }
};

/**
 * Get league details by ID
 * @param {string} leagueId 
 * @returns {Promise<Object>} League details
 */
export const getLeagueDetails = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupleague.php?id=${leagueId}`);
    return response.data.leagues?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch league details');
  }
};

/**
 * Get teams by league ID
 * @param {string} leagueId 
 * @returns {Promise<Array>} List of teams
 */
export const getTeamsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup_all_teams.php?id=${leagueId}`);
    return response.data.teams || [];
  } catch (error) {
    throw new Error('Failed to fetch teams');
  }
};

/**
 * Get team details by team ID
 * @param {string} teamId 
 * @returns {Promise<Object>} Team details
 */
export const getTeamDetails = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupteam.php?id=${teamId}`);
    return response.data.teams?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch team details');
  }
};

/**
 * Get players by team ID
 * @param {string} teamId 
 * @returns {Promise<Array>} List of players
 */
export const getPlayersByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookup_all_players.php?id=${teamId}`);
    return response.data.player || [];
  } catch (error) {
    throw new Error('Failed to fetch players');
  }
};

/**
 * Search players by name
 * @param {string} playerName 
 * @returns {Promise<Array>} List of matching players
 */
export const searchPlayers = async (playerName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchplayers.php?p=${encodeURIComponent(playerName)}`);
    return response.data.player || [];
  } catch (error) {
    throw new Error('Failed to search players');
  }
};

/**
 * Get player details by player ID
 * @param {string} playerId 
 * @returns {Promise<Object>} Player details
 */
export const getPlayerDetails = async (playerId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupplayer.php?id=${playerId}`);
    return response.data.players?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch player details');
  }
};

/**
 * Search teams by name
 * @param {string} teamName 
 * @returns {Promise<Array>} List of matching teams
 */
export const searchTeams = async (teamName) => {
  try {
    const response = await axios.get(`${BASE_URL}/searchteams.php?t=${encodeURIComponent(teamName)}`);
    return response.data.teams || [];
  } catch (error) {
    throw new Error('Failed to search teams');
  }
};

/**
 * Get next 15 events by league ID
 * @param {string} leagueId 
 * @returns {Promise<Array>} List of upcoming matches
 */
export const getNextEventsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventsnextleague.php?id=${leagueId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch upcoming matches');
  }
};

/**
 * Get last 15 events by league ID
 * @param {string} leagueId 
 * @returns {Promise<Array>} List of past matches
 */
export const getLastEventsByLeague = async (leagueId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventspastleague.php?id=${leagueId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch past matches');
  }
};

/**
 * Get event details by event ID
 * @param {string} eventId 
 * @returns {Promise<Object>} Event details
 */
export const getEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${BASE_URL}/lookupevent.php?id=${eventId}`);
    return response.data.events?.[0] || null;
  } catch (error) {
    throw new Error('Failed to fetch event details');
  }
};

/**
 * Get next 5 events by team ID
 * @param {string} teamId 
 * @returns {Promise<Array>} List of upcoming team matches
 */
export const getNextEventsByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventsnext.php?id=${teamId}`);
    return response.data.events || [];
  } catch (error) {
    throw new Error('Failed to fetch team matches');
  }
};

/**
 * Get last 5 events by team ID
 * @param {string} teamId 
 * @returns {Promise<Array>} List of past team matches
 */
export const getLastEventsByTeam = async (teamId) => {
  try {
    const response = await axios.get(`${BASE_URL}/eventslast.php?id=${teamId}`);
    return response.data.results || [];
  } catch (error) {
    throw new Error('Failed to fetch past team matches');
  }
};
