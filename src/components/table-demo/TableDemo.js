import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { AutoSizer, Column, Table } from 'react-virtualized';

const styles = (theme) => ({
  flexContainer: {
    display: 'flex',
    alignItems: 'center',
    boxSizing: 'border-box',
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    '& .ReactVirtualized__Table__headerRow': {
      ...(theme.direction === 'rtl' && {
        paddingLeft: '0 !important',
      }),
      ...(theme.direction !== 'rtl' && {
        paddingRight: undefined,
      }),
    },
  },
  tableRow: {
    cursor: 'pointer',
  },
  tableRowHover: {
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: 'initial',
  },
});

class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = ({ cellData, columnIndex }) => {
    const { columns, classes, rowHeight, onRowClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: rowHeight }}
        align={
          (columnIndex != null && columns[columnIndex].numeric) || false
            ? 'right'
            : 'left'
        }
      >
        {cellData}
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes } = this.props;

    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight}}
        align={columns[columnIndex].numeric || false ? 'right' : 'left'}
      >
        <span>{label}</span>
      </TableCell>
    );
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, ...tableProps } = this.props;
    return (
      <AutoSizer style={{width: "100%"}}>
        {({ height, width }) => (
            <center>
          <Table
            height={height}
            width={width}
            rowHeight={rowHeight}
            gridStyle={{
              direction: 'inherit',
            }}
            headerHeight={headerHeight}
            className={classes.table}
            {...tableProps}
            rowClassName={this.getRowClassName}
          >
            {columns.map(({ dataKey, ...other }, index) => {
              return (
                <Column
                  key={dataKey}
                  headerRenderer={(headerProps) =>
                    this.headerRenderer({
                      ...headerProps,
                      columnIndex: index,
                    })
                  }
                  className={classes.flexContainer}
                  cellRenderer={this.cellRenderer}
                  dataKey={dataKey}
                  {...other}
                  
                />
              );
            })}
          </Table>
          </center>
        )}
      </AutoSizer>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
};

const defaultTheme = createTheme();
const VirtualizedTable = withStyles(styles, { defaultTheme })(MuiVirtualizedTable);

// ---

const sample = [
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
  ['John Doe', '@johndoe123', 'johndoe123@gmail.com', 'https://eduhack.com/sub/askdhk12i76asdjkshg346', '04/09/2021 - 18:32:52 IST'],
];

function createData(srNo, fullName, userName, email, submissionLink, timestamp) {
  return { srNo, fullName, userName, email, submissionLink, timestamp };
}

const rows = [];

// sample.forEach(s => {

// })

for(let i = 0; i < sample.length; i+=1){
    rows.push(createData(i+1, ...sample[i]))
}

// for (let i = 0; i < 200; i += 1) {
//   const randomSelection = sample[Math.floor(Math.random() * sample.length)];
// //   rows.push(createData(i, ...randomSelection));
//     rows.push(sample)
// }

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 400, width: '100%', padding: "20px" }}>
      <VirtualizedTable
        rowCount={rows.length}
        rowGetter={({ index }) => rows[index]}
        columns={[
          {
            width: 75,
            label: 'Sr. No.',
            dataKey: 'srNo',
            numeric: true
          },
          {
            width: 120,
            label: 'Full Name',
            dataKey: 'fullName',
          },
          {
            width: 120,
            label: 'Username',
            dataKey: 'userName',
          },
          {
            width: 200,
            label: 'Email',
            dataKey: 'email',
          },
          {
            width: 240,
            label: 'Submission Link',
            dataKey: 'submissionLink',
          },
          {
            width: 200,
            label: 'Timestamp',
            dataKey: 'timestamp',
          },
        ]}
      />
    </Paper>
  );
}