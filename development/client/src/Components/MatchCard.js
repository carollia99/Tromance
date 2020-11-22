import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    minWidth: 345,
  },
  media: {
    height: 280,
  },
});

export default function MatchCard(props) {
  // console.log(props);
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.imageUrl}
          title="Match"
        />
        <CardContent>
          <div style={{display: "flex", justifyContent: "center"}}>
            <Typography gutterBottom variant="h6" component="h2" style={{textAlign: "center"}}>
              {props.name + " (" + props.age + ")"}
            </Typography>
            
          </div>
          <Typography gutterBottom variant="h6" style={{color: "#FF6584"}}>
              {props.matchPercent + " % compatible"}
          </Typography>
          
          <Typography variant="body2" color="textSecondary" component="p">
            {"Major: " + props.major}
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}