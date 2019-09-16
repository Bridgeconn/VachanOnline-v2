import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import PrintIcon from '@material-ui/icons/Print';
import GetAppIcon from '@material-ui/icons/GetApp';
const useStyles = makeStyles({
    card: {
        minWidth: 180,
        marginBottom: 13
    },
    cardaction: {
        border: "1px solid #ddd"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
        fontSize: 12,
    },
});

export default function Notes() {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        John 3:1
        </Typography>
                    <Typography variant="h6" component="h6">
                        Jesus is alive
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        27-01-2019 | 9.00 am
        </Typography>
                    <Typography variant="body2" component="p">
                        The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
        </Typography>
                </CardContent>
                <CardActions className={classes.cardaction}>
                    <Button><EditIcon fontSize="small" /></Button>
                    <Button><DeleteIcon fontSize="small" /></Button>
                    <Button><ShareIcon fontSize="small" /></Button>
                    <Button><PrintIcon fontSize="small" /></Button>
                    <Button><GetAppIcon fontSize="small" /></Button>
                </CardActions>

            </Card>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        John 3:1
        </Typography>
                    <Typography variant="h6" component="h6">
                        Jesus is alive
        </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        27-01-2019 | 9.00 am
        </Typography>
                    <Typography variant="body2" component="p">
                        The book of the genealogy of Jesus Christ, the son of David, the son of Abraham.
        </Typography>
                </CardContent>
                <CardActions className={classes.cardaction}>
                    <Button><EditIcon fontSize="small" /></Button>
                    <Button><DeleteIcon fontSize="small" /></Button>
                    <Button><ShareIcon fontSize="small" /></Button>
                    <Button><PrintIcon fontSize="small" /></Button>
                    <Button><GetAppIcon fontSize="small" /></Button>
                </CardActions>

            </Card>

        </>
    );
}
