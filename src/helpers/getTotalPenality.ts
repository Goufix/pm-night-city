import { Crimes } from "../data/crimes";
import penalities from "../data/penalities.json";

export const getTotalPenality = (crimes: Crimes[]) => {
  const crimesPenality = crimes.map((crime) => penalities[crime] || 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    crimesPenality.reduce((accumulator, value) => accumulator + value, 0)
  );
};
