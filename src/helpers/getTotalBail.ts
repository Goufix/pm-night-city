import bailValue from "../data/bail.json";
import { Crimes } from "../data/crimes";
import getCrimeName from "./getCrimeName";

interface Args {
  crime: Crimes;
  quantity: number;
}

export const getTotalBail = (args: Args[]) => {
  const crimesBail = args.map(
    (crime) => bailValue[crime.crime] * crime.quantity || 0
  );

  const zeroBailCrimes = crimesBail.filter((value) => value);

  if (zeroBailCrimes.length) {
    return `Não se aplica fiança, devido aos seguintes crimes: ${zeroBailCrimes
      .map((_, index) => getCrimeName(args[index].crime))
      .join(", ")}`;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(crimesBail.reduce((accumulator, value) => accumulator + value, 0));
};
