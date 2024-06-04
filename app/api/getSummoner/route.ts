import { NextResponse } from "next/server";
import axios from "axios";

const RIOT_API_KEY = process.env.RIOT_API_KEY;

interface AxiosError extends Error {
  response?: { status: number };
}
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const summonerName = searchParams.get("summonerName");

  if (!summonerName) {
    return NextResponse.json(
      { error: "Missing summonerName query parameter" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      {
        headers: {
          "X-Riot-Token": RIOT_API_KEY,
        },
      }
    );
    console.log(response.data);
    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if ((error as AxiosError).response?.status === 404) {
      return NextResponse.json(
        { error: "Summoner not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: "Error fetching summoner data" },
      { status: 500 }
    );
  }
}
