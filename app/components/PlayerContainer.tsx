import { Participant } from "../types/types";

const PlayerContainer = ({ player }: { player: Participant }) => {
  return (
    <div className="border border-b-1 rounded-sm p-1 h-1/5">
      <div className="flex items-center m-1">
        <div className="border border-yellow-200 rounded-3xl pr-1">
          {/*Stuff goes here (champ icon) */} Test
        </div>
        <p>
          {player.riotIdGameName}#{player.riotIdTagline} | {player.championName}
        </p>
      </div>
    </div>
  );
};

export default PlayerContainer;
