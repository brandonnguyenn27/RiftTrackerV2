import axios from "axios";

const RIOT_API_KEY = process.env.RIOT_API_KEY;
const gameCount = 5; //amount of games to fetch
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

export async function getMatchHistory(puuid: string) {
  const matchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  try {
    const gameIDS = await axios.get(matchesURL).then((res) => res.data);

    const matchDataPromises = gameIDS.slice(0, 10).map((matchID: string) => {
      const matchURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
      return axios.get(matchURL).then((response) => response.data);
    });

    const matchDataArray = await Promise.all(matchDataPromises);
    return matchDataArray.filter(
      (matchData) => matchData.info.gameMode !== "CHERRY"
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching match history");
  }
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
