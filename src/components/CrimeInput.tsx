import { createStyles, makeStyles, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useCallback, useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState<number>(1);
  const [internalType, setInternalType] = useState("");

  console.log("STATE", state);
  const handleInternalChange = useCallback(
    (_e, value) => {
      setInternalType(value);
      setState((oldState: any) => [
        ...oldState.filter(({ inputId: id }: any) => id !== inputId),
        { inputId, value, quantity },
      ]);
    },
    [inputId, setState, quantity]
  );

  useEffect(() => {
    handleInternalChange(null, internalType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity, handleInternalChange]);

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

  console.log("INTERNAL STATE [0]", internalType);

  return (
    <>
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
            value={internalType}
          />
        )}
      />
      {internalType === Crimes.MARKED_MONEY && (
        <TextField
          color="primary"
          variant="outlined"
          style={{ margin: "10px" }}
          className={classes.root}
          placeholder="Quantidade"
          key={Number(inputId) * Math.random()}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value) || 0)}
        />
      )}
    </>
  );
};
