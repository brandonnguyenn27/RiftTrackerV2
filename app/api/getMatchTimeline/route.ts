import { NextRequest, NextResponse } from "next/server";
import { calculateTotalDamage } from "@/app/utils/calculateTeamDamage";
import { calculateTotalGold } from "@/app/utils/calculateTeamGold";
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json(
      { error: "Missing matchId query parameter" },
      { status: 400 }
    );
  }
  try {
    const url =
      `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}/timeline?api_key=` +
      process.env.RIOT_API_KEY;
    const response = await fetch(url);
    const data = await response.json();
    const damageData = calculateTotalDamage(data.info);
    return NextResponse.json(damageData, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
