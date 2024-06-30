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

export async function getMatchHistory(puuid: string) {
  const matchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  try {
    const response = await axios.get(matchesURL);
    const gameIDS = response.data;

    const matchDataPromises = gameIDS
      .slice(0, 10)
      .map(async (matchID: string) => {
        //take first 10 games bc i get rate limited if its 20
        const matchURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
        const matchResponse = await axios.get(matchURL);
        return matchResponse.data;
      });

    const matchDataArray = await Promise.all(matchDataPromises);
    return matchDataArray.filter(
      (matchData) => matchData.info.gameMode !== "CHERRY" //filter out ARENA gamemode
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
