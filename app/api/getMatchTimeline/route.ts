import { NextRequest, NextResponse } from "next/server";
import { calculateTotalDamage } from "@/app/utils/calculateTeamDamage";
export async function GET(request: NextRequest) {
  const url =
    "https://americas.api.riotgames.com/lol/match/v5/matches/NA1_5030840978/timeline?api_key=RGAPI-d933711e-0f34-462b-87c0-628053299802";
  const response = await fetch(url);
  const data = await response.json();
  const damageData = calculateTotalDamage(data.info);
  return NextResponse.json(damageData, { status: 200 });
}
