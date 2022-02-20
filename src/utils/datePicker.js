import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'no-wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 500,
    },
  }));
  
  
  const DatePickers = ({recordDate, changeCallback}) => {
    const classes = useStyles();
    return (
      <form className={classes.container} noValidate>
        <TextField
          id="date"
          label=""
          type="date"
          defaultValue= {recordDate}
          className={classes.textField}
          onChange={(e)=>changeCallback(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
    );
  }
  export default DatePickers