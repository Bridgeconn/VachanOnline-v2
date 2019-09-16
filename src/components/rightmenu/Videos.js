import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import video from "../common/images/video.mp4";
import videos from "../common/images/videos.jpg";
const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: 100,
        paddingLeft: 15,
        overflowX: "hidden",
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    title: {
        paddingLeft: 2,
        paddingBottom: 0,
        marginBottom: 5,
        borderBottom: "1px solid #f1ecec",
        display: "flex",
        width: "100%",

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        minWidth: 170,
        width: 170,
        display: "inline-block",
        marginRight: 20,
        marginTop: 10,
        cursor: "pointer"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },

    pos: {
        marginBottom: 0,
        color: "blue"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    img1: {
        width: 140
    },
    img: {
        width: 800
    }
}));

export default function Videos() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (

        <div className={classes.root}>
            <Typography variant="h6" className={classes.title} >Videos</Typography>

            <Card className={classes.card} onClick={handleOpen}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Title
                                </Typography>
                    <Typography className={classes.title1} component="h6">
                        <img src={videos} className={classes.img1} alt={"bible"} />
                    </Typography>
                </CardContent>
            </Card>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <p><video controls src={video} alt={"bible"} className={classes.img} autoPlay="true" /></p>
                        <p id="transition-modal-description">react-transiton-group animates me.</p>
                    </div>
                </Fade>
            </Modal>
        </div>



    );
}
