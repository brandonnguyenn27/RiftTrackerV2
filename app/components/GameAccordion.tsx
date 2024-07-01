import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Match } from "../types/types";

interface GameAccordionProp {
  gameData: Match;
  puuid: string;
}

const GameAccordion: React.FC<{ gameData: Match; puuid: string }> = ({
  gameData,
  puuid,
}) => {
  const playerIndex = gameData.metadata.participants.indexOf(puuid);
  const playerInfo = gameData.info.participants[playerIndex];
  return (
    <div className=" w-1/2 border rounded-md">
      <Accordion type="single" collapsible className="">
        <AccordionItem value="1">
          <AccordionTrigger
            className={`${
              playerInfo.win === true ? "bg-blue-500" : "bg-red-500"
            } h-20 px-2 bg-opacity-70`}
          >
            {gameData.info.gameMode}
          </AccordionTrigger>
          <AccordionContent className="h-24 border-t border-black px-2 pt-2">
            Test
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameAccordion;
