import { Crimes } from "../data/crimes";
import penalities from "../data/penalities.json";

interface Args {
  crime: Crimes;
  quantity: number;
}

export const getTotalPenality = (args: Args[]) => {
  const crimesPenality = args.map(
    (crime) => penalities[crime.crime] * crime.quantity || 0
  );

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    crimesPenality.reduce((accumulator, value) => accumulator + value, 0)
  );
};
