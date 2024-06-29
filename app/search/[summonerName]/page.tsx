"use client";
import { useParams } from "next/navigation";
import { UsePlayerData } from "@/app/hooks/usePlayerData";
import Header from "@/app/components/Header";
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
      <div>{playerData.matchHistory[0].info.gameMode}</div>
    </body>
  );
}
