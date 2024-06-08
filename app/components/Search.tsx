"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { encode } from "punycode";

const Search = () => {
  const [summonerName, setSummonerName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (summonerName.trim()) {
      const encodedName = encodeURIComponent(summonerName);
      console.log("encoded name: " + encodedName);
      router.push(`/search/${encodedName}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        placeholder="Enter Summoner Name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
