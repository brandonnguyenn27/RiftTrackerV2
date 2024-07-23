import { InfoTimeLineDto } from "../types/TimelineTypes";

export function calculateTotalGold(info: InfoTimeLineDto): number[][] {
  const goldData: number[][] = [];

  info.frames.forEach((frame) => {
    const currentGoldFirstFive = Object.keys(frame.participantFrames)
      .slice(0, 5)
      .reduce(
        (acc, key) => acc + frame.participantFrames[parseInt(key)].totalGold,
        0
      );

    const currentGoldNextFive = Object.keys(frame.participantFrames)
      .slice(5, 10)
      .reduce(
        (acc, key) => acc + frame.participantFrames[parseInt(key)].totalGold,
        0
      );

    goldData.push([currentGoldFirstFive, currentGoldNextFive]);
  });

  return goldData;
}
