import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Match } from "../types/types";

const GameAccordion: React.FC<{ gameData: Match; puuid: string }> = ({
  gameData,
  puuid,
}) => {
  const playerIndex = gameData.metadata.participants.indexOf(puuid);
  const playerInfo = gameData.info.participants[playerIndex];
  const printDate = new Date(gameData.info.gameCreation).toLocaleDateString(
    "en-US"
  );

  return (
    <div className=" w-1/2 border rounded-md">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger
            className={`${
              playerInfo.win === true ? "bg-blue-500" : "bg-red-500"
            } h-20 px-2 bg-opacity-70 text-white hover:no-underline`}
          >
            <div className="flex flex-col items-start">
              <span>{gameData.info.gameMode}</span>
              <span>{printDate}</span>
              <span>{playerInfo.win === true ? "WIN" : "LOSS"}</span>
            </div>
            <div>
              <span>
                {playerInfo.kills}/{playerInfo.deaths}/{playerInfo.assists}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="h-24 border-t  px-2 pt-2">
            Test
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameAccordion;
