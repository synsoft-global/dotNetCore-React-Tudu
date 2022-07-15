
import { IconButtonProps } from "@mui/material";
import React from "react";
import { UseFormClearErrors, UseFormGetValues, UseFormRegister, UseFormSetError, UseFormSetValue, ValidationRule } from "react-hook-form";


export type InputTextValidation = "AlphabetOnly" | "AlphanumericOnly" | "AlphabetsWithSpecialCharacters" | "Email";
export type LVType = {
  label: string,
  value: number | string,
}[]
type variant = "filled" | "outlined" | "standard";


interface IBaseProps {
  id?: string;
  name: string;
  control: any;
  label: string;
  register: UseFormRegister<any>
  variant?: variant;
  size?: 'small' | 'medium';
  required?: ValidationRule<boolean>;
  reqMsg?: string;
  setValue?: UseFormSetValue<any>;
  className?: string
  style?: React.CSSProperties;
  disabled?: boolean;
}

export interface InputProps extends IBaseProps {
  validation?: InputTextValidation;
  validationMsg?: string;
  maxLength?: number;
  maxLengthErrorMsg?: string;
  minLength?: number;
  minLengthErrorMsg?: string;
  multiline?: boolean
  maxRows?: number
  rows?: number;
  setValue: UseFormSetValue<any>;
  onKeyPress?: (e: any) => void;
}

export interface NumberInputProps extends IBaseProps {
  min?: number;
  minNumberErrorMsg?: string;
  max?: number;
  maxNumberErrorMsg?: string;
}

// export interface keyProps {
//   dropdownkey: string
// }
export interface DropDownProps extends IBaseProps {
  options: {
    // label: string,
    // value: number | string,
  }[],
  onInputChange?: (e: any) => void;
  dropdownkey: string
}


export interface SearchDropDownProps extends IBaseProps {
  options: {
    label: string,
    value: number | string,
  }[],
  onInputChange?: (e: any) => void;
}


export interface RadioProps extends IBaseProps {
  options: {
    label: string,
    value: string,
  }[],
  directionRow?: boolean;
}

export interface PasswordInputText extends IBaseProps {
  validationExp?: RegExp;
  validationMsg?: string;
  maxLength?: number;
  maxLengthErrorMsg?: string;
  minLength?: number;
  minLengthErrorMsg?: string;
  onKeyPress?: (e: any) => void;
}

export interface ConfirmPasswordText extends IBaseProps, PasswordInputText {
  confirmPasswordLabel: string;
  confirmPasswordName: string;
  getValues: UseFormGetValues<any>;
  confirmPasswordConatinerClassName?: string;
  confirmpasswordReqMsg?: string;
  reqMsg?: string;
  onKeyPress?: (e: any) => void;
}

export type fileAcceptType = "image/*" | "video/*" | ".png" | ".jpeg" | ".jpg" | '.mp4' | '.mp3';

export interface FileUpload extends IBaseProps {
  accept: fileAcceptType;
  maxSize?: number;
  minSize?: number;
  maxSizeMSg?: string;
  minSizeMsg?: string;
  setError: UseFormSetError<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  fileCbFn?: (fileObj: any) => void;
  onKeyPress?: (e: any) => void;
}

export interface CheckBoxProps extends IBaseProps {
  options: {
    label: string | React.ReactNode,
    value: string,
  }[],
  error?: boolean;
  errorMessage?: string;
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  selecteditems?: string[];
}

export interface SingleCheckBoxProps extends IBaseProps {
  error?: boolean;
  errorMessage?: string;
  setValue: UseFormSetValue<any>;
  setError: UseFormSetError<any>;
  selecteditems: boolean;
}

export type dateFormatType = "MM/dd/yyyy" | 'dd/MM/yyyy' | 'yyyy/MM/dd';

export interface DatePickerProps extends IBaseProps {
  format: dateFormatType;
  disableFuture?: boolean;
  disablePast?: boolean;
  autoOk?: boolean;
  datePickerVariant?: "dialog" | "inline" | "static";
  color?: "primary" | "secondary";
  dateButtonColorCode?: string;
  datePickerBoxBorderRadius?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  showTooolbar?: boolean;
  toolbarFormat?: string;
  OpenPickerButtonProps?: Partial<IconButtonProps<'button', {}>> | undefined;
  showDaysOutsideCurrentMonth?: boolean;
  setError: UseFormSetError<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  validationMsg?: string;
}

export type timeFormatType = "hh:mm:ss a" | "hh:mm a" | 'HH:mm:ss' | "HH:mm";

export interface TimePickerProps extends IBaseProps {
  format: timeFormatType;
  disableFuture?: boolean;
  disablePast?: boolean;
  autoOk?: boolean;
  datePickerVariant?: "dialog" | "inline" | "static";
  color?: "primary" | "secondary";
  dateButtonColorCode?: string;
  datePickerBoxBorderRadius?: string | number;
  readOnly?: boolean;
  disabled?: boolean;
  showTooolbar?: boolean;
  OpenPickerButtonProps?: Partial<IconButtonProps<'button', {}>> | undefined;
  showDaysOutsideCurrentMonth?: boolean;
  setError: UseFormSetError<any>;
  setValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  ampm?: boolean;
  ampmInClock?: boolean;
  validationMsg?: string;
}



export interface PhoneNumberInput extends IBaseProps {
  defaultCountry: string,
  validationMsg?: string,
  onKeyPress?: (e: any) => void;
}


