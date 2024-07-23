import Image from "next/image";
import { Participant } from "../types/GameDataTypes";
const PlayerHeader = (playerInfo: Participant) => {
  const iconId = playerInfo.profileIcon;
  return (
    <div className="flex items-center bg-gray-600">
      <Image
        src="/favicon.ico"
        width={100}
        height={100}
        alt="player icon"
        className="rounded-xl m-6"
      />
      <span className="text-3xl font-semibold text-white">
        {playerInfo.riotIdGameName}
      </span>
      <span className="text-2xl font-light m-1 text-gray-300 ">
        #{playerInfo.riotIdTagline}
      </span>
    </div>
  );
};

export default PlayerHeader;
