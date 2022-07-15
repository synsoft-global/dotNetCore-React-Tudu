
export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const regexExp = {
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%&*?])[A-Za-z\d#$@!%&*?]{8,32}$/,
    Email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    AlphabetsOnly: /^[a-zA-Z ]*$/,
    Alphanumeric: /^[a-zA-Z0-9 ]*$/,
    AlphabetsWithSpecialCharacters: /^[ A-Za-z_@./#&+-]*$/,
    MM_DD_YYYY: /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/,
    DD_MM_YYYY: /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/,
    YYYY_MM_DD: /^(19|20)\d{2}\/(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])/,
    NumberWithDecimal: /^[0-9]{0,20}(\.[0-9]{1,2})?$/
}

export const validationMassages = {
    requiredMsg: "This field is required.",
    alphabetsOnly: "This field accept alphabets only.",
    alphanumeric: "This field accept alphanumeric only.",
    alphabetsWithSpecialCharacters: "This field accept alphabets with special characters only",
    password: "Password must have minimum 8 characters, with at least 1 upper case letter, 1 lower case letter, 1 numeric and 1 special character.",
    minNumber: "Minimum number cannot be less then",
    maxNumber: "Maximum number cannot be more then",
    email: "Please enter a valid email",
    minLength: "Minimum length can not be less than",
    maxLength: "Maximum length can not be more than",
    confirmPassword: "Password and Confirm Password fields must be identical. Please try again.",
    inValidDate: "Invalid Date.",
    maxFileSize: "File length can not be more than",
    minFileSize: "File length can not be less than",
    validFile: "Please select valid file/document.",
    inValidphoneNumber: "Invalid phone number",
    validNumber: "Number length can't exceed 20 or decimal precision max 2"
}