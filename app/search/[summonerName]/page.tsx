"use client";
import { useParams } from "next/navigation";
import { UsePlayerData } from "@/app/hooks/usePlayerData";
import Header from "@/app/components/Header";
import GameAccordion from "@/app/components/GameAccordion";
import PlayerHeader from "@/app/components/PlayerHeader";

export default function PlayerPage() {
  const summonerName = useParams().summonerName;
  const { playerData, loading, error, puuid } = UsePlayerData(
    summonerName as string
  );

  console.log(playerData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!playerData) return <div>No data found</div>;

  const matchInfo = playerData.matchHistory[0];
  const playerIndex = matchInfo.metadata.participants.indexOf(puuid);
  const currentPlayerInfo = matchInfo.info.participants[playerIndex];

  return (
    <div>
      <Header />
      <PlayerHeader {...currentPlayerInfo} />
      <div className="mt-8 flex justify-center">
        <GameAccordion
          gameData={playerData.matchHistory[0]}
          puuid={puuid}
        ></GameAccordion>
      </div>
    </div>
  );
}
