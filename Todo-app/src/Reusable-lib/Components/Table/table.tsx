import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styled from 'styled-components';
import { useTable, useSortBy } from 'react-table';

const Styles = styled.div`
  padding: 1rem;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`;

interface IProps {
  columns: { Header: string; accessor: string }[];
  data: any[];
  fetchMoreData: () => void;
  totalLength: number;
  sorBy?: (propertyName: string) => void;
  isLoading: boolean;
}

function TableComponent(props: IProps) {
  // Use the state and functions returned from useTable to build your UI

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { sortBy },
  }: any = useTable(
    {
      columns: props.columns,
      data: props.data,
    },
    useSortBy
  );

  React.useEffect(() => {
    if (props.sorBy) {
      props.sorBy(sortBy);
    }
  }, [sortBy]);

  const hasMore = () => {
    if (rows.length === 0 && props.totalLength === 0) {
      return false;
    } else if (rows.length === props.totalLength) {
      return false;
    } else {
      return true;
    }
  };

  // Render the UI for your table
  return (
    <InfiniteScroll
      dataLength={rows.length}
      next={props.fetchMoreData}
      hasMore={hasMore()}
      loader={props.isLoading}
      className="table-responsive"
    >
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup: any) => (
            <tr className="red" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {rows.map((row: any, i: number) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: any) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </InfiniteScroll>
  );
}

export const SynTable2 = (props: IProps) => {
  return (
    <Styles>
      <TableComponent
        columns={props.columns}
        data={props.data}
        fetchMoreData={props.fetchMoreData}
        sorBy={props.sorBy}
        totalLength={props.totalLength}
        isLoading={props.isLoading}
      />
    </Styles>
  );
};
