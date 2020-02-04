import React from 'react';
import { dailyAverageBatteryConsumption } from '../helpers/dailyAverageBatteryConsumption'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

  const StyledTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles(theme => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.background.default,
      },
    },
  }))(TableRow);



class Battery extends React.Component {
    state = { batteryData: null, row: null }

    componentDidMount(){
        let batteryData =  dailyAverageBatteryConsumption();
        this.setState({batteryData, row:batteryData });
    }
    render() {
        const {row} = this.state;
        // const classes = useStyles();
      return (
        !row ? "Loading" :(<TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Battery Serial Number</StyledTableCell>
              <StyledTableCell align="right">Academy ID</StyledTableCell>
              <StyledTableCell align="right">Average battery Usage &nbsp;(%)</StyledTableCell>
              <StyledTableCell align="right">Need Replacement</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {row.map(row => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.serialNumber}
                </StyledTableCell>
                <StyledTableCell align="right">{row.academyID}</StyledTableCell>
                <StyledTableCell align="right">{row.averageOfDay.toFixed(2)}</StyledTableCell>
                <StyledTableCell style={row.needReplacement ? {color: 'red'} : {color: '#7cbe30'} } align="right">{row.needReplacement ? "YES": "NO"}</StyledTableCell>
              </StyledTableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>)
      )
    }
  }

  export default Battery;