"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";
import { usePlayerData } from "@/app/hooks/usePlayerData";

export default function PlayerPage() {
  const { summonerName } = useParams();
  console.log(summonerName);
  const playerData = usePlayerData(summonerName as string);
  console.log(playerData);

  return <div>Hello</div>;
}
