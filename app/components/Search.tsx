"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
    <div>
      <div className="flex flex-wrap justify-center items-center">
        <Input
          type="text"
          value={summonerName}
          onChange={(e) => setSummonerName(e.target.value)}
          placeholder="Enter Summoner Name"
          className="rounded-xl p-2 m-1 sm:w-64 md:w-72 "
        />
        <p className="text-xl text-white m-1">+</p>
        <Input
          type="text"
          value={playerTag}
          onChange={(e) => setPlayerTag(e.target.value)}
          placeholder="TAG"
          className="rounded-xl p-3 m-1  sm:w-20 md:w-32 "
        />
        <Button
          onClick={handleSearch}
          className="rounded-xl  bg-green-500 text-white p-1 m-1 ml-2  w-20 h-10"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
