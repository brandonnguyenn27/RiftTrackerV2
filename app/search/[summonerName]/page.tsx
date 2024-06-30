"use client";
import { useParams } from "next/navigation";
import { UsePlayerData } from "@/app/hooks/usePlayerData";
import { Match } from "@/app/types/types";
import Header from "@/app/components/Header";
import GameAccordion from "@/app/components/GameAccordion";

export default function PlayerPage() {
  const summonerName = useParams().summonerName;
  const { playerData, loading, error } = UsePlayerData(summonerName as string);
  console.log(playerData);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!playerData) return <div>No data found</div>;
  return (
    <body>
      <Header />
      <div>
        <GameAccordion gameData={playerData.matchHistory[0]}></GameAccordion>
      </div>
    </body>
  );
}
