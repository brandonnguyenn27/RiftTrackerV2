import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Match } from "../types/GameDataTypes";
import PlayerContainer from "./PlayerContainer";
import DamageContext from "../utils/DamageContext";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { DamageChartComponent } from "./DamageChart";
import useFetchMatchTimeline from "../hooks/fetchTimeline";
const GameAccordion: React.FC<{ gameData: Match; puuid: string }> = ({
  gameData,
  puuid,
}) => {
  const playerIndex = gameData.metadata.participants.indexOf(puuid);
  const playerInfo = gameData.info.participants[playerIndex];
  const printDate = new Date(gameData.info.gameCreation).toLocaleDateString(
    "en-US"
  );
  const maxDamage = Math.max(
    ...gameData.info.participants.map((p) => p.totalDamageDealtToChampions)
  );
  const [view, setView] = useState("default");
  const [dataFetched, setDataFetched] = useState(false);
  const { damageData, loading, error } = useFetchMatchTimeline(
    gameData.metadata.matchId
  );
  const handleGraphsClick = () => {
    setView("chart");
    if (!dataFetched) {
      setDataFetched(true);
    }
  };
  return (
    <div className=" w-2/3 m-0.5">
      <DamageContext.Provider value={maxDamage}>
        <Accordion type="single" collapsible>
          <AccordionItem value="1" className="rounded-md">
            <AccordionTrigger
              className={`${
                playerInfo.win === true ? "bg-blue-500" : "bg-red-500"
              } h-24 px-2 bg-opacity-70 text-white hover:no-underline rounded-md`}
            >
              <div className="flex flex-col items-center p-2 pl-3">
                <span>{gameData.info.gameMode}</span>
                <span>{printDate}</span>
                <span>{playerInfo.win === true ? "WIN" : "LOSS"}</span>
              </div>
              <div>
                <span className="text-xl">
                  {playerInfo.kills}/{playerInfo.deaths}/{playerInfo.assists}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex justify-center space-x-4 my-1">
                <Button
                  className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded w-1/2 h-8"
                  onClick={() => setView("default")}
                >
                  Stats
                </Button>
                <Button
                  className="bg-slate-400 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded w-1/2 h-8"
                  onClick={handleGraphsClick}
                >
                  Graphs
                </Button>
              </div>
              {view === "default" ? (
                <div className="flex h-96">
                  <div className="w-1/2 flex flex-col overflow-auto">
                    {gameData.info.participants
                      .slice(0, 5)
                      .map((participant, index) => (
                        <PlayerContainer player={participant} key={index} />
                      ))}
                  </div>
                  <div className="w-1/2 flex flex-col overflow-auto">
                    {gameData.info.participants
                      .slice(5, 10)
                      .map((participant, index) => (
                        <PlayerContainer player={participant} key={index} />
                      ))}
                  </div>
                </div>
              ) : (
                <div className="flex justify-center">
                  {loading ? (
                    <span>Loading...</span>
                  ) : error ? (
                    <span>Error: {error.message}</span>
                  ) : (
                    <div>
                      <DamageChartComponent data={damageData} />
                    </div>
                  )}
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DamageContext.Provider>
    </div>
  );
};

export default GameAccordion;
