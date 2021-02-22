import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    justifyContent:"space-between",
    marginleft:"50px"
  },
  media: {
    height: 140,
  },
});

export default function MediaCard(props) {
  const classes = useStyles();
  const history = useHistory();
  const moreBtn = ()=>{
     history.push(`${props.url}`)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {props.body}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Button onClick={moreBtn} size="small" color="primary">
          More
        </Button>
      </CardActions>
    </Card>
  );
}