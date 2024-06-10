import { match } from "assert";
import axios from "axios";

const RIOT_API_KEY = process.env.RIOT_API_KEY;
export async function getPlayerPUUID(playerNameParam: string) {
  const [playerName, playerTag] = playerNameParam.split("#");
  console.log(playerName, playerTag);
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${playerTag}?api_key=${RIOT_API_KEY}`;
  try {
    const response = await axios.get(url);
    console.log("PUUID: " + response.data.puuid);
    return response.data.puuid;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player PUUID");
  }
}

export async function getMatchHistoryv2(puuid: string) {
  const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  try {
    const gameIDs = await axios.get(url);
    const matchDataArray = await Promise.all(
      gameIDs.data.map(async (matchID: string) => {
        const matchUrl = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
        const matchData = await axios.get(matchUrl);
        return matchData;
      })
    );
    return matchDataArray;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching match history");
  }
}

export async function getMatchHistory(puuid: string) {
  const matchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  const gameIDS = await axios
    .get(matchesURL)
    .then((response) => response.data)
    .catch((err) => err);

  const matchDataArray = [];
  for (const matchID of gameIDS) {
    const matchURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
    const matchData = await axios
      .get(matchURL)
      .then((response) => response.data)
      .catch((err) => err);
    matchDataArray.push(matchData);
  }
  return matchDataArray;
}

export async function getPlayerInfo(playerName: string) {
  try {
    const puuid = await getPlayerPUUID(playerName);
    const matchHistory = await getMatchHistory(puuid);
    return { matchHistory };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player info");
  }
}
