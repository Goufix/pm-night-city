import bailValue from "../data/bail.json";
import { Crimes } from "../data/crimes";
import getCrimeName from "./getCrimeName";

interface Args {
  crime: Crimes;
  quantity: number;
}

export const getTotalBail = (args: Args[]) => {
  const zeroBailCrimes: any[] = [];
  const crimesBail = args.map((crime) => {
    const total = bailValue[crime.crime] * crime.quantity;
    const totalToReturn = total === 0 ? 0 : !total ? 1 : total;

    if (total === 0) {
      zeroBailCrimes.push({
        total: totalToReturn,
        crime: crime.crime,
      });
    }
    return totalToReturn;
  });

  console.log("ZERO BAIL", zeroBailCrimes);

  if (zeroBailCrimes.length) {
    return `Não se aplica fiança, devido aos seguintes crimes: ${zeroBailCrimes
      .map((crime, index) => getCrimeName(crime.crime))
      .join(", ")}`;
  }

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(
    crimesBail.reduce((accumulator, value) => {
      if (value === 1) {
        value = 0;
      }
      return accumulator + value;
    }, 0)
  );
};
