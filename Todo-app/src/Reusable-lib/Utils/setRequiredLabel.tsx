import React from 'react';
// import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles(() => ({
//   labelAsterisk: {
//     color: 'red',
//   },
// }));

/**
 * This component is used for get lable name with asterisk.
 * @param labelName
 * @returns
 */
export const SetRequiredLabel = (labelName: string): JSX.Element => {
  // const classes = useStyles();
  return (
    <div>
      {labelName}
      <span style={{ color: 'red', }}> *</span>
    </div>
  );
};
