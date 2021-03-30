import bailValue from "../data/bail.json";
import { Crimes } from "../data/crimes";

export const getTotalBail = (crimes: Crimes[]) => {
  const crimesBail = crimes.map((crime) => bailValue[crime] || 0);

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(crimesBail.reduce((accumulator, value) => accumulator + value, 0));
};
