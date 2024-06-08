import axios from "axios";

const RIOT_API_KEY = process.env.RIOT_API_KEY;
export async function getPlayerPUUID(playerNameParam: string) {
  const [playerName, playerTag] = playerNameParam.split("#");
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${playerTag}?api_key=${RIOT_API_KEY}`;
  try {
    const response = await axios.get(url);
    return response.data.puuid;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player PUUID");
  }
}

export async function getMatchHistory(puuid: string) {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  try {
    const gameIDs = await axios.get(url);
    const matchDataArray = await Promise.all(
      gameIDs.data.map(async (matchID: string) => {
        const matchUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
        const matchData = await axios.get(matchUrl);
        return matchData.data;
      })
    );
    return matchDataArray;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching match history");
  }
}

export async function getPlayerInfo(playerName: string) {
  try {
    const puuid = await getPlayerPUUID(playerName);
    const matchHistory = await getMatchHistory(puuid);
    return { puuid, matchHistory };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player info");
  }
}
