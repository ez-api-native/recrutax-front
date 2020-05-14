import React from 'react';
import {Text} from 'react-native';
import {DataTable} from 'react-native-paper';

const List = ({columns, data, actions}) => {
  return (
    <DataTable>
      <DataTable.Header>
        {columns.map(col => (
          <DataTable.Title key={`title-${col}`}>{col}</DataTable.Title>
        ))}
        {actions && <DataTable.Title>Actions</DataTable.Title>}
      </DataTable.Header>

      {data.map(row => (
        <DataTable.Row key={`row-${row.id}`}>
          {columns.map(col => {
            return (
              <DataTable.Cell key={`cell-${col}`}>{row[col]}</DataTable.Cell>
            );
          })}
          {actions && (
            <DataTable.Cell>
              {actions.map(action => (
                <Text>a</Text>
              ))}
            </DataTable.Cell>
          )}
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
