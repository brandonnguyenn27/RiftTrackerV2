import { useState, useEffect, use } from "react";

export function usePlayerData(playerName: string) {
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/getSummoner?username=${playerName}`);
        const data = await response.json();
        setPlayerData(data);
      } catch (error) {
        console.error(error);
      }
    }
    if (playerName) {
      fetchData();
    }
  }, [playerName]);

  return playerData;
}
