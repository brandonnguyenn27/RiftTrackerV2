import { Progress } from "@/components/ui/progress";
import React, { useContext } from "react";
import DamageContext from "../utils/DamageContext";
const DamageBar: React.FC<{ damage: number }> = ({ damage }) => {
  const maxDamage = React.useContext(DamageContext);
  const value = (damage / maxDamage) * 100;
  return (
    <div className="flex flex-col items-center ml-8">
      <div className=" text-sm">{damage}</div>
      <Progress value={value} />
    </div>
  );
};

export default DamageBar;
