import { Crimes } from "../data/crimes";
import prisonTimes from "../data/prison.json";

export const getTotalPrisonTime = (crimes: Crimes[]) => {
  const crimesPrisonTime = crimes.map((crime) => prisonTimes[crime] || 0);

  return crimesPrisonTime.reduce(
    (accumulator, value) => accumulator + value,
    0
  );
};
