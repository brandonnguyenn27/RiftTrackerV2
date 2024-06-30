import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Match } from "../types/types";

interface GameAccordionProp {
  gameData: Match;
}

const GameAccordion: React.FC<GameAccordionProp> = ({ gameData }) => {
  return (
    <div className=" w-3/4 border border-black rounded-lg">
      <Accordion type="single" collapsible>
        <AccordionItem value="1" className="p-3">
          <AccordionTrigger>Click me!</AccordionTrigger>
          <AccordionContent>{gameData.info.gameMode}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameAccordion;
