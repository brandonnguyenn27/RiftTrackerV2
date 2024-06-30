import axios from "axios";
import { MatchHistory, Match, Player } from "../types/types";
const RIOT_API_KEY = process.env.RIOT_API_KEY;

export async function getPlayerPUUID(playerNameParam: string): Promise<string> {
  const [playerName, playerTag] = playerNameParam.split("#");
  console.log(playerName, playerTag);
  const url = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${playerName}/${playerTag}?api_key=${RIOT_API_KEY}`;
  try {
    const { data: player } = await axios.get<Player>(url);
    console.log("PUUID: " + player.puuid);
    return player.puuid;
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player PUUID");
  }
}

export async function getMatchHistory(puuid: string): Promise<Match[]> {
  const matchesURL = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${RIOT_API_KEY}`;
  try {
    const response = await axios.get<string[]>(matchesURL);
    const gameIDS = response.data;

    const matchDataPromises: Promise<Match>[] = gameIDS
      .slice(0, 10)
      .map(async (matchID: string) => {
        //take first 10 games bc i get rate limited if its 20
        const matchURL = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchID}?api_key=${RIOT_API_KEY}`;
        const matchResponse = await axios.get<Match>(matchURL);
        return matchResponse.data;
      });

    const matchDataArray: Match[] = await Promise.all(matchDataPromises);

    return matchDataArray.filter(
      (matchData) => matchData.info.gameMode !== "CHERRY" //filter out ARENA gamemode
    );
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching match history");
  }
}

export async function getPlayerInfo(playerName: string): Promise<MatchHistory> {
  try {
    const puuid = await getPlayerPUUID(playerName);
    const matchHistory = await getMatchHistory(puuid);
    return { matchHistory };
  } catch (err) {
    console.error(err);
    throw new Error("Error fetching player info");
  }
}
