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
    <div className="m-2 w-60">
      <Accordion type="single" collapsible>
        <AccordionItem value="1">
          <AccordionTrigger>Click me!</AccordionTrigger>
          <AccordionContent>{gameData.info.gameMode}</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default GameAccordion;
