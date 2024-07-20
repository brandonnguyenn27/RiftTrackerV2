import { Participant } from "../types/types";
import Image from "next/image";
import ItemImageContainer from "./ImageContainer";
import Link from "next/link";
import DamageBar from "./DamageBar";
const PlayerContainer = ({ player }: { player: Participant }) => {
  return (
    <div className="border border-b-1 rounded-sm p-1 h-1/5 flex items-center ">
      <div className="flex items-center m-1">
        <div className="">
          <Image
            src={`/profileIconplaceholder.png`}
            width={30}
            height={30}
            alt="player icon"
            className="rounded-md mr-2"
          />
        </div>
        <Link
          href={`/search/${encodeURIComponent(
            player.riotIdGameName
          )}%23${encodeURIComponent(player.riotIdTagline)}`}
          className="hover:underline inline-block w-32 truncate "
        >
          {player.riotIdGameName}#{player.riotIdTagline}
        </Link>
        <p className="ml-4 w-20 text-center truncate ">
          {player.kills}/{player.deaths}/{player.assists}
        </p>
        <div className="ml-6 flex justify-center">
          {[
            player.item0,
            player.item1,
            player.item2,
            player.item3,
            player.item4,
            player.item5,
            player.item6,
          ].map((itemID, index) => (
            <ItemImageContainer key={index} imageID={itemID} />
          ))}
        </div>
        <DamageBar damage={player.totalDamageDealtToChampions} />
      </div>
    </div>
  );
};

export default PlayerContainer;
