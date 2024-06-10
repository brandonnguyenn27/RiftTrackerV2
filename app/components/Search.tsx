"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [summonerName, setSummonerName] = useState("");
  const [playerTag, setPlayerTag] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (summonerName.trim() && playerTag.trim()) {
      const routerPush = summonerName + "%23" + playerTag;
      router.push(`/search/${routerPush}`);
    } else {
      alert("Please enter a valid summoner name and tag");
    }
  };

  return (
    <div className="m-2">
      <input
        type="text"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        placeholder="Enter Summoner Name"
        className="border border-black rounded-md p-1 m-1"
      />
      <input
        type="text"
        value={playerTag}
        onChange={(e) => setPlayerTag(e.target.value)}
        placeholder="TAG"
        className="border border-black rounded-md p-1 m-1"
      ></input>
      <button
        onClick={handleSearch}
        className="rounded-md border bg-blue-400 text-white p-1 m-1 border-blue-600 w-20"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
