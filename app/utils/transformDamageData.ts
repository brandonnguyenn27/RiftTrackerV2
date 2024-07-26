export const transformDamageData = (damageData: number[][]) => {
  return damageData.map(([team1, team2], index) => ({
    time: index,
    team1,
    team2,
  }));
};
