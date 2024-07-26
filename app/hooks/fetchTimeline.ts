import { useState, useEffect } from "react";
import { calculateTotalDamage } from "../utils/calculateTeamDamage";
import { TimeLineDto, InfoTimeLineDto } from "../types/TimelineTypes";
const useFetchMatchTimeline = (matchId: string) => {
  const [damageData, setDamageData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Check if data is already in session storage
        const storedData = sessionStorage.getItem(`damageData-${matchId}`);
        if (storedData) {
          setDamageData(JSON.parse(storedData));
          setLoading(false);
          return;
        }

        // Fetch match timeline data from Riot Games API
        const response = await fetch(
          `/api/getMatchTimeline?matchId=${matchId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch match timeline");
        }

        const timelineData = await response.json();

        // Calculate team damage

        // Store data in session storage
        sessionStorage.setItem(
          `damageData-${matchId}`,
          JSON.stringify(timelineData)
        );

        // Update state
        setDamageData(timelineData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchId]);

  return { damageData, loading, error };
};

export default useFetchMatchTimeline;
