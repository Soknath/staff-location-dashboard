import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import {API_URL} from '../constants';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

export default function MediaControlCard(props) {
  const classes = useStyles();

  return (
    <Grid container alignItems="flex-start" className={classes.root} spacing={2}>
    <Grid item xs={3} 
        style={{margin: "auto"}}
    >
        <Avatar
            src={API_URL + props.info.avatar.url}
            alt="props.info.firstName"
        />
    </Grid>
    <Grid item xs={9}>
        <Typography component="subtitle1" variant="subtitle1">
            {props.info.firstName + " " + props.info.lastName}
            <br />
            <small>{new Date(props.info.createdAt).toLocaleString()}</small>
        </Typography>
    </Grid>
    <Grid item xs={12}>
        <div style={{flex: "right"}}>
        <Chip label={props.info.healthStatus} /> 
        </div>
        <Typography component="p" variant="p">
            {props.info.address}
        </Typography>
    </Grid>
    </Grid>
  );
}