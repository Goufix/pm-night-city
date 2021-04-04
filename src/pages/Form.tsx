import { Button, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { CrimeInput } from "../components/CrimeInput";
import { Crimes } from "../data/crimes";
import { getTotalBail } from "../helpers/getTotalBail";
import { getTotalPenality } from "../helpers/getTotalPenality";
import { getTotalPrisonTime } from "../helpers/getTotalPrisonTime";

interface ICrimesSkeleton {
  id: String;
  value: Crimes;
  quantity: number;
}

export default function Form() {
  const [crimes, setCrimes] = useState<ICrimesSkeleton[]>([]);

  const [inputs, setInputs] = useState<any>([]);

  const renderInput = () => {
    setInputs((oldInputs: any) => [
      ...oldInputs,
      () => <CrimeInput type="text" setState={setCrimes} state={crimes} />,
    ]);
  };

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      style={{ minWidth: "100%" }}
    >
      <Grid item>
        <Button variant="contained" color="primary" onClick={renderInput}>
          + Adicionar crime
        </Button>
      </Grid>
      <Grid item>
        <form style={{ height: "100%" }}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            style={{ height: "100%" }}
          >
            {inputs.map((Input: any, index: number) => (
              <Grid key={index} item>
                <Input />
              </Grid>
            ))}
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <Typography style={{ color: "#99aab5" }}>
          Pena:{" "}
          <b>{getTotalPrisonTime(crimes.map(({ value }) => value))} meses</b>
        </Typography>
      </Grid>
      <Grid item>
        <Typography style={{ color: "#99aab5" }}>
          Multas:{" "}
          <b>
            {getTotalPenality(
              crimes.map(({ value, quantity }) => ({ crime: value, quantity }))
            )}
          </b>
        </Typography>
      </Grid>
      <Typography style={{ color: "#99aab5" }}>
        <Grid item>
          Fiança:{" "}
          <b>
            {getTotalBail(
              crimes.map(({ value, quantity }) => ({ crime: value, quantity }))
            )}
          </b>
        </Grid>
      </Typography>
      {crimes.filter(({ value }) => value === Crimes.ACCOMPLICE).length ? (
        <Typography style={{ color: "#a70000", fontWeight: "bold" }}>
          <Grid item>
            Atenção, deivdo a prática de Cúmplice, deve-se calcular a pena,
            multas e fiança manualmente.
          </Grid>
        </Typography>
      ) : <div />}
    </Grid>
  );
}
