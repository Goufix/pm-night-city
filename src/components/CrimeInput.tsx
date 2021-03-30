import { createStyles, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";
import { Crimes } from "../data/crimes";
import getCrimeName from "../helpers/getCrimeName";

interface Props {
  setState: (oldState: any) => void;
  type: string;
  state: any;
}

export const CrimeInput = ({ state, type, setState }: Props) => {
  const [inputId] = useState(uuid());

  const internalState = state?.find(({ id }: any) => inputId === id)?.value;
  const handleInternalChange = useCallback(
    (_e, value) => {
      setState((oldState: any) => [
        ...oldState.filter(({ inputId: id }: any) => id !== inputId),
        { inputId, value },
      ]);
    },
    [inputId, setState]
  );

  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "#99aab5",
          },
        },
        input: {
          "&::label": {
            color: "#99aab5",
            textOverflow: "ellipsis !important",
          },
        },
      },
    })
  );

  const classes = useStyles();

  const crimes = Object.keys(Crimes);

  return (
    <Autocomplete
      // @ts-ignore
      options={crimes}
      getOptionLabel={getCrimeName}
      style={{ width: 300 }}
      onChange={handleInternalChange}
      renderInput={(params) => (
        <TextField
          {...params}
          color="primary"
          variant="outlined"
          style={{ margin: "10px" }}
          className={classes.root}
          placeholder="Pesquisar crime..."
          key={inputId}
          type={type}
          value={internalState}
        />
      )}
    />
  );
};
