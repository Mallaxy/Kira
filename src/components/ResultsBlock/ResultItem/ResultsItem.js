import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import s from './ResultsItem.module.css'

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: "35rem",
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    content: {
        paddingTop: "0",
        paddingBottom: "0",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: 700
    },
    header: {
        paddingBottom: "0.5rem",
        paddingTop: "1rem",
    }
}));

export const ResultsItem = ({props}) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const {generalInfo, mainInfo} = props

    return (
        <div className={s.resultItem}>
            <Card className={classes.root}>
                <CardHeader title={mainInfo.name} classes={{
                    title: classes.title,
                }} className={classes.header}/>
                <CardContent className={classes.content}>
                    <Typography variant="body1" color="textPrimary" style={{
                        width: "35rem",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        fontWeight: "700"
                    }}>
                        <div>Call Sign: {mainInfo.callSign}</div>
                        <div>Frequency: {mainInfo.frequency}</div>
                        <div>Languages: {mainInfo.languages}</div>
                        <div>Class: {mainInfo.class}</div>
                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            alignItems: "center"
                        }}>Vertical limits:
                            <div>
                                <div>From {mainInfo.vertical.from} Ft</div>
                                <div>To {mainInfo.vertical.to} Ft</div>
                            </div>
                        </div>
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton
                        className={clsx(classes.expand, classes.content)}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                        style={{fontWeight: "700"}}
                    >
                        General Info
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent style={{
                        maxWidth: "35rem",
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "0.5rem",
                        lineHeight: "1.2rem"
                    }}>
                        {generalInfo.warning
                            ? <div style={{color: "red"}}>Warning: {generalInfo.warning}</div> : null}
                        {generalInfo.location
                            ? <div>Location: {generalInfo.location}</div> : null}
                        {generalInfo.timezone
                            ? <div>Timezone: {generalInfo.timezone}</div> : null}
                        {generalInfo.operationalHours
                            ? <div>Operational Hours: {generalInfo.operationalHours}</div> : null}
                        {generalInfo.elevation
                            ? <div>Elevation: {generalInfo.elevation}</div> : null}
                        {generalInfo.magVar
                            ? <div>Mag Var: {generalInfo.magVar}</div> : null}
                        {generalInfo.coordinates
                            ? <div>Coordinates: {generalInfo.coordinates}</div> : null}
                        {generalInfo.dimensions
                            ? <div>Dimensions: {generalInfo.dimensions}</div> : null}
                        {generalInfo.runways
                            ? <div>Runways: {generalInfo.runways}</div> : null}
                        {generalInfo.resqueEquipment
                            ? <div>Resque Equipment: {generalInfo.resqueEquipment}</div> : null}
                        {generalInfo.radio
                            ? <div>Radio: {generalInfo.radio}</div> : null}
                    </CardContent>
                </Collapse>
            </Card>
        </div>
    );
}




