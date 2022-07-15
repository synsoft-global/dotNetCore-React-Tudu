import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { SingleCheckBoxProps } from "../Utils/interface";

export const SynCheckbox = (props: SingleCheckBoxProps) => {
  const {
    name,
    control,
    setValue,
    label,
    size,
    variant,
    error,
    errorMessage,
    selecteditems,
    className,
    disabled,
    id,
  } = props;
  const [checked, setChecked] = React.useState(selecteditems);

  useEffect(() => {
    setValue(name, checked);
    if (selecteditems) {
      console.log("selecteditems", selecteditems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    setValue(name, event.target.checked);
  };

  return (
    <div className={className}>
      <FormControl size={size} variant={variant} fullWidth>
        <div>
          <FormControlLabel
            control={
              <Controller
                name={name}
                control={control}
                render={() => {
                  return (
                    <Checkbox
                      id={`${id}-${label}`}
                      disabled={disabled}
                      checked={checked}
                      onChange={handleChange}
                    />
                  );
                }}
              />
            }
            label={label}
          />
        </div>
      </FormControl>

      <FormHelperText error={!!error}>
        {error ? errorMessage : null}
      </FormHelperText>
    </div>
  );
};
