import React from 'react';
import './syn-table.css';
import { TableSortLabel } from '@mui/material';
import UnfoldMoreSharpIcon from '@mui/icons-material/UnfoldMoreSharp';
import { IColumn, Order } from './SynTable';

interface IProps {
  headerData: IColumn[];
  orderDirection: Order;
  valueToOrderBy: string;
  handleRequestSort: (event: any, property: string) => void;
  synTableHeaderStyle?: React.CSSProperties;
}

export const SynTableHeader = (props: IProps) => {
  const {
    headerData,
    orderDirection,
    valueToOrderBy,
    handleRequestSort,
    synTableHeaderStyle,
  } = props;

  const createSortHandler = (property: string) => (event: any) => {
    handleRequestSort(event, property);
  };
  return (
    <div className="syn-table-header" style={{ ...synTableHeaderStyle }}>
      <div className="syn-table-row">
        {headerData.map((headerColumnObj: IColumn, idx: number) => (
          <div
            key={idx}
            style={{
              minWidth: headerColumnObj.minWidth,
              textAlign: headerColumnObj.textAlign,
            }}
          >
            <TableSortLabel
              active={valueToOrderBy === headerColumnObj.columnId}
              direction={
                valueToOrderBy === headerColumnObj.columnId
                  ? orderDirection
                  : 'asc'
              }
              onClick={createSortHandler(headerColumnObj.columnId!)}
              IconComponent={UnfoldMoreSharpIcon}
            >
              {headerColumnObj.label}
            </TableSortLabel>
          </div>
        ))}
      </div>
    </div>
  );
};
