import { Crimes } from "../data/crimes";

const crimesTranslation = {
  [Crimes.AGGRESSION]: "Lesão corporal (agressão)",
  [Crimes.LIBEL]: "Difamação, calúnia",
  [Crimes.PERJURY]: "Falso testemunho",
  [Crimes.THREAT]: "Ameaça verbal/física",
  [Crimes.VEHICLE_THEFT]: "Furto a veículo",
};

export default function getCrimeName(name: Crimes) {
  return crimesTranslation[name];
}
