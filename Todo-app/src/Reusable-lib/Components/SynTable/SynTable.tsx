import React, { useEffect } from 'react';
import './syn-table.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SynTableHeader } from './SynTableHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface tableData {
  data: any[];
  totalCount: number;
  columnMetaData: IColumn[];
}

interface ISynTable {
  tableData: tableData;
  next: () => any;
  loader: boolean;
  deleteButon?: boolean;
  editbutton?: boolean;
  editCBFn?: (rowData: any) => void;
  deleteCBFn?: (rowData: any) => void;
  sortCbFn?: (valueToOrderBy: string, orderDirection: Order) => void;
  synTableHeaderStyle?: React.CSSProperties;
}

export type Order = 'asc' | 'desc';

export interface IColumn {
  columnId?: string;
  label: string;
  minWidth: number | string;
  textAlign: 'left' | 'right' | 'center';
}

export const SynTable = (props: ISynTable) => {
  const {
    tableData,
    next,
    loader,
    deleteButon,
    deleteCBFn,
    editCBFn,
    editbutton,
    sortCbFn,
    synTableHeaderStyle,
  } = props;

  const [orderDirection, setOrderDirection] = React.useState<Order>('asc');
  const [valueToOrderBy, setValueToOrderBy] = React.useState('');


  const getHeaderData = () => {
    const headerDataArray = tableData.columnMetaData;
    if (tableData.data.length > 0) {
      Object.keys(tableData.data[0]).map((key, idx) => {
        headerDataArray[idx].columnId = key;
      });
    }
    return headerDataArray;
  };

  useEffect(() => {
    if (sortCbFn && valueToOrderBy) {
      sortCbFn(valueToOrderBy, orderDirection);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueToOrderBy, orderDirection]);

  const handleRequestSort = (event: any, property: string) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const hasMore = () => {
    return tableData.data.length === 0 ||
      tableData.data.length < tableData.totalCount
      ? true
      : false;
  };

  const headerDataArray = getHeaderData();
  return (
    <div className="syn-table-contain">
      <SynTableHeader
        headerData={headerDataArray}
        orderDirection={orderDirection}
        valueToOrderBy={valueToOrderBy}
        handleRequestSort={handleRequestSort}
        synTableHeaderStyle={synTableHeaderStyle}
      />
      <div className="syn-table-body">
        <InfiniteScroll
          dataLength={tableData.totalCount}
          next={next}
          hasMore={hasMore()}
          loader={loader}
        >
          {tableData.data.length > 0 ? (
            tableData.data.map((item, idx) => (
              <div className="syn-table-row" key={idx}>
                {Object.entries(item).map((val: any[], idx: number) => (
                  <div
                    style={{
                      minWidth: headerDataArray[idx].minWidth,
                      textAlign: headerDataArray[idx].textAlign,
                    }}
                    key={idx}
                  >
                    {val[1]}
                  </div>
                ))}
                <div
                  className="sys-table-action-conatiner"
                  style={{
                    minWidth:
                      headerDataArray[headerDataArray.length - 1].minWidth,
                    textAlign:
                      headerDataArray[headerDataArray.length - 1].textAlign,
                  }}
                >
                  {editbutton && (
                    <EditIcon
                      key={`${idx}_edit`}
                      style={{ marginLeft: '15px' }}
                      onClick={() => {
                        if (editCBFn) {
                          editCBFn(item);
                        }
                      }}
                    />
                  )}
                  {deleteButon && (
                    <DeleteIcon
                      key={`${idx}_delete`}
                      style={{ marginLeft: '15px' }}
                      onClick={() => {
                        if (deleteCBFn) {
                          deleteCBFn(item);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))
          ) : (
            <div>No record</div>
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};
