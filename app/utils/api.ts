import axios from "axios";

export const fetchSummoner = async (summonerName: string) => {
  try {
    const response = await axios.get(
      `/api/getSummoner?summonerName=${summonerName}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
