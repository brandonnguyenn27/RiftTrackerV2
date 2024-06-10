"use client";
import { useParams } from "next/navigation";
import { usePlayerData } from "@/app/hooks/usePlayerData";

export default function PlayerPage() {
  const summonerName = useParams().summonerName;
  const playerData = usePlayerData(summonerName as string);
  console.log(playerData);
  return <div>{playerData.matchHistory[0].info.gameMode}</div>;
}
