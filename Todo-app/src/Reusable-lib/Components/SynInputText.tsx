import { Controller } from 'react-hook-form';
import { TextField } from '@mui/material';
import { InputProps } from '../Utils/interface';
import {
  capitalizeFirstLetter,
  regexExp,
  validationMassages,
} from '../Utils/helper';
import { SetRequiredLabel } from '../Utils/setRequiredLabel';

export const SynInputText = (props: InputProps) => {
  const {
    name,
    control,
    label,
    register,
    required,
    validation,
    validationMsg,
    maxLength,
    // maxLengthErrorMsg,
    minLength,
    minLengthErrorMsg,
    variant,
    size,
    maxRows,
    multiline,
    rows,
    className,
    style,
    disabled,
    setValue,
    reqMsg,
    onKeyPress,
    id,
  } = props;

  /**
   * Validators object contain diffrent validations regular expressions and messages.
   */
  const validators = {
    AlphabetOnly: {
      value: regexExp.AlphabetsOnly,
      message: validationMsg || validationMassages.alphabetsOnly,
    },
    AlphanumericOnly: {
      value: regexExp.Alphanumeric,
      message: validationMsg || validationMassages.alphanumeric,
    },
    AlphabetsWithSpecialCharacters: {
      value: regexExp.AlphabetsWithSpecialCharacters,
      message:
        validationMsg || validationMassages.alphabetsWithSpecialCharacters,
    },
    Email: {
      value: regexExp.Email,
      message: validationMsg || validationMassages.email,
    },
  };

  //This onblur is used for trim text and capitalize first letter.
  const onBlurHandler = (e: any) => {
    const value = e.target.value;
    setValue(
      name,
      validation !== 'Email'
        ? capitalizeFirstLetter(value.trim())
        : value.trim()
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        return (
          <TextField
            id={id}
            {...register(name, {
              required: required && (reqMsg || validationMassages.requiredMsg),
              pattern: validation && validators[validation],
              // maxLength: maxLength && {
              //   value: maxLength,
              //   message:
              //     maxLengthErrorMsg ||
              //     `${validationMassages.maxLength} ${maxLength}.`,
              // },
              minLength: minLength && {
                value: minLength,
                message:
                  minLengthErrorMsg ||
                  `${validationMassages.minLength} ${minLength}.`,
              },
            })}
            helperText={error ? error.message : null}
            size={size}
            error={!!error}
            onChange={onChange}
            value={value || ""}
            className={className}
            style={{ ...style }}
            label={required ? SetRequiredLabel(label) : label}
            type={validation === 'Email' ? 'email' : 'text'}
            variant={variant}
            multiline={multiline}
            rows={rows}
            inputProps={{ maxLength: maxLength }}
            disabled={disabled}
            onBlur={onBlurHandler}
            onKeyPress={onKeyPress}
          />
        );
      }}
    />
  );
};
