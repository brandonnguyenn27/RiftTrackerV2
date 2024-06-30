import { useState, useEffect, use } from "react";
import { MatchHistory } from "../types/types";

interface PlayerData {
  playerData: MatchHistory | null;
  loading: boolean;
  error: Error | null;
}

export function UsePlayerData(playerName: string): PlayerData {
  const [playerData, setPlayerData] = useState<MatchHistory | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/getSummoner?username=${playerName}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setPlayerData(data);
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

  return { playerData, loading, error };
}
