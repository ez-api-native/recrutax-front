import React from 'react';
import {DataTable} from 'react-native-paper';

const List = ({columns, data, onPress}) => {
  return (
    <DataTable>
      <DataTable.Header>
        {columns.map(col => (
          <DataTable.Title key={`title-${col}`}>{col}</DataTable.Title>
        ))}
      </DataTable.Header>

      {data.map(row => (
        <DataTable.Row key={`row-${row.id}`} onPress={() => onPress(row)}>
          {columns.map(col => {
            return (
              <DataTable.Cell key={`cell-${col}`}>{row[col]}</DataTable.Cell>
            );
          })}
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={1}
        numberOfPages={3}
        onPageChange={page => {
          console.log(page);
        }}
      />
    </DataTable>
  );
};

export default List;
