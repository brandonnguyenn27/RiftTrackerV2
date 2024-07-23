import { NextRequest, NextResponse } from "next/server";
import { calculateTotalDamage } from "@/app/utils/calculateTeamDamage";
import { calculateTotalGold } from "@/app/utils/calculateTeamGold";
export async function GET(request: NextRequest) {
  const url =
    "https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5030840978/timeline?api_key=" +
    process.env.RIOT_API_KEY;
  const response = await fetch(url);
  const data = await response.json();
  const damageData = calculateTotalGold(data.info);
  return NextResponse.json(damageData, { status: 200 });
}
