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
}

export default function Form() {
  const [crimes, setCrimes] = useState<ICrimesSkeleton[]>([]);

  const [inputs, setInputs] = useState<any>([]);

  const renderInput = () => {
    setInputs((oldInputs) => [
      ...oldInputs,
      () => <CrimeInput type="text" setState={setCrimes} state={crimes} />,
    ]);
  };

  console.log(crimes);

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
            {inputs.map((Input, index) => (
              <Grid key={index} item>
                <Input />
              </Grid>
            ))}
          </Grid>
        </form>
      </Grid>
      <Grid item>
        <Typography style={{ color: "#99aab5" }}>
          Pena: {getTotalPrisonTime(crimes.map(({ value }) => value))} meses
        </Typography>
      </Grid>
      <Grid item>
        <Typography style={{ color: "#99aab5" }}>
          Multas: {getTotalPenality(crimes.map(({ value }) => value))}
        </Typography>
      </Grid>
      <Typography style={{ color: "#99aab5" }}>
        <Grid item>
          Fiança: {getTotalBail(crimes.map(({ value }) => value))}
        </Grid>
      </Typography>
    </Grid>
  );
}
