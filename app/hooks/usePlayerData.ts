import { useState, useEffect, use } from "react";
import { MatchHistory } from "../types/GameDataTypes";

interface PlayerData {
  playerData: MatchHistory | null;
  loading: boolean;
  error: Error | null;
  puuid: string;
}

export function UsePlayerData(playerName: string): PlayerData {
  const [playerData, setPlayerData] = useState<MatchHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [puuid, setPuuid] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const cachedData = sessionStorage.getItem(`playerData-${playerName}`);
        if (cachedData) {
          const parsedData = JSON.parse(cachedData);
          setPlayerData(parsedData.matchHistory);
          setPuuid(parsedData.puuid);
        } else {
          const response = await fetch(
            `/api/getSummoner?username=${playerName}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch player data");
          }
          const data = await response.json();
          sessionStorage.setItem(
            `playerData-${playerName}`,
            JSON.stringify(data)
          );
          setPlayerData(data.matchHistory);
          setPuuid(data.puuid);
        }
      } catch (error) {
        setError(error as Error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    if (playerName) {
      fetchData();
    }
  }, [playerName]);

  return { playerData, loading, error, puuid };
}
