import { useState, useEffect, use } from "react";

export function usePlayerData(playerName: string) {
  const [playerData, setPlayerData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const decodedPlayerName = decodeURIComponent(playerName);
        console.log("decoded player name: " + decodedPlayerName);
        const response = await fetch(
          `/api/getSummoner?username=${decodedPlayerName}`
        );
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
