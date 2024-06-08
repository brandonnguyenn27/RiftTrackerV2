import { NextRequest, NextResponse } from "next/server";
import { getPlayerInfo } from "@/app/utils/getMatchHistory";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const summonerName = searchParams.get("username");
  if (!summonerName) {
    return NextResponse.json(
      { error: "Missing username query parameter" },
      { status: 400 }
    );
  }
  try {
    const playerInfo = await getPlayerInfo(summonerName);
    return NextResponse.json(playerInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
