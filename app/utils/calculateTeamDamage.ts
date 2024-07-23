import { InfoTimeLineDto } from "../types/TimelineTypes";

export function calculateTotalDamage(info: InfoTimeLineDto): number[][] {
  const damageData: number[][] = [];

  info.frames.forEach((frame) => {
    const totalDamageFirstFive = Object.keys(frame.participantFrames)
      .slice(0, 5)
      .reduce(
        (acc, key) =>
          acc +
          frame.participantFrames[parseInt(key)].damageStats
            .totalDamageDoneToChampions,
        0
      );

    const totalDamageNextFive = Object.keys(frame.participantFrames)
      .slice(5, 10)
      .reduce(
        (acc, key) =>
          acc +
          frame.participantFrames[parseInt(key)].damageStats
            .totalDamageDoneToChampions,
        0
      );

    damageData.push([totalDamageFirstFive, totalDamageNextFive]);
  });

  return damageData;
}
