import React, { useEffect, useState } from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { CheckBoxProps } from '../Utils/interface';
import { validationMassages } from '../Utils/helper';
import { SetRequiredLabel } from '../Utils/setRequiredLabel';

export const SynMultiCheckbox = (props: CheckBoxProps) => {
  const {
    name,
    control,
    setValue,
    setError,
    label,
    options,
    register,
    required,
    size,
    variant,
    error,
    errorMessage,
    selecteditems,
    reqMsg,
    className,
    disabled,
    id,
  } = props;
  const [selectedItems, setSelectedItems] = useState<any>([]);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (selecteditems && selectedItems.length === 0) {
      setSelectedItems(selecteditems);
      setValue(name, selecteditems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This useEffect is used for register component with form.
  useEffect(() => {
    register(name, {
      required: required && (reqMsg || validationMassages.requiredMsg),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //This useEffect is used for validate component with form.
  useEffect(() => {
    setValue(name, selectedItems);
    if (selectedItems.length > 0) {
      setDirty(true);
      setError(name, {});
    } else if (selectedItems.length === 0 && dirty) {
      setError(name, {
        message: reqMsg || validationMassages.requiredMsg,
        type: 'required',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItems]);

  const handleSelect = (value: any) => {
    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems([...selectedItems, value]);
    }
  };

  return (
    <div className={className}>
      <FormControl size={size} variant={variant} fullWidth>
        <FormLabel error={errorMessage ? true : false} component="legend">
          {required && label ? SetRequiredLabel(label) : label}
        </FormLabel>
        <div>
          {options.map((option: any, idx: number) => {
            return (
              <FormControlLabel
                control={
                  <Controller
                    name={name}
                    control={control}
                    render={() => {
                      return (
                        <Checkbox
                          id={`${id}-${option.label}`}
                          disabled={disabled}
                          checked={selectedItems.includes(option.value)}
                          onChange={() => handleSelect(option.value)}
                        />
                      );
                    }}
                  />
                }
                label={option.label}
                key={option.value}
              />
            );
          })}
        </div>
      </FormControl>
      <FormHelperText error={!!error}>
        {error ? errorMessage : null}
      </FormHelperText>
    </div>
  );
};
