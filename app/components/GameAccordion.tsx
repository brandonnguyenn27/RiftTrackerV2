import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Match } from "../types/GameDataTypes";
import PlayerContainer from "./PlayerContainer";
import DamageContext from "../utils/DamageContext";
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
            <AccordionContent className="h-80">
              <div className="flex h-full">
                <div className="w-1/2 h-full border">
                  {gameData.info.participants
                    .slice(0, 5)
                    .map((participant, index) => (
                      <PlayerContainer key={index} player={participant} />
                    ))}
                </div>
                <div className="w-1/2 h-full border">
                  {gameData.info.participants
                    .slice(5, 10)
                    .map((participant, index) => (
                      <PlayerContainer key={index} player={participant} />
                    ))}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DamageContext.Provider>
    </div>
  );
};

export default GameAccordion;
