import { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import {
    initializedMatches,
    updatedScore,
    selectScoreBoardMatches,
    selectScoreBoardTeams,
    selectScoreBoardStatus,
    simulationStarted,
    simulationFinished
} from './score-board-slice';
import { useInitTeams, useTeams } from '../../hooks/queries';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Teams } from '../../types/score-board';
import { getTotalGoals } from '../../utils/get-total-goals';

const ScoreBoard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches = useAppSelector(selectScoreBoardMatches);
    const teams = useAppSelector(selectScoreBoardTeams);
    const status = useAppSelector(selectScoreBoardStatus);
    const [enabledInitData, setEnabledInitData] = useState(false);
    const { data: initTeamsData } = useInitTeams(enabledInitData);
    const { data, dataUpdatedAt } = useTeams(initTeamsData);

    const [totalGoals, setTotalGoals] = useState(0);

    useEffect(() => {
        dispatch(initializedMatches());
    }, []);

    useEffect(() => {
        if (data) {
            setTotalGoals(getTotalGoals(data as Teams));
            dispatch(updatedScore(data as Teams));
        }
    }, [dataUpdatedAt]);

    const finishSimulation = () => {
        setEnabledInitData(false);
        dispatch(simulationFinished());
    };

    const startSimulation = () => {
        setEnabledInitData(true);
        dispatch(simulationStarted());
    };

    const ButtonEl = ({ text, onClicked }: { text: string; onClicked: () => void }): JSX.Element => (
        <Button variant="contained" onClick={onClicked}>
            {text}
        </Button>
    );

    const getButton = (): JSX.Element => {
        if (status === 'initializing') {
            return <ButtonEl text="Start" onClicked={startSimulation} />;
        }
        if (status === 'running') {
            return <ButtonEl text="Finish" onClicked={finishSimulation} />;
        }
        if (status === 'finished') {
            return <ButtonEl text="Restart" onClicked={startSimulation} />;
        }
        return <ButtonEl text="" onClicked={() => {}} />;
    };

    return (
        <Grid
            sx={{ marginTop: '10%', height: '100%', width: '100%' }}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Grid item>
                <Card>
                    <CardContent>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                width: '100%',
                                marginBottom: '30px',
                                marginTop: '30px'
                            }}
                        >
                            {getButton()}
                        </Box>

                        {Object.keys(matches).length > 0 &&
                            Object.keys(matches).map((key) => (
                                <Box
                                    key={matches[key].teamsId[0]}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between;',
                                        alignItems: 'center',
                                        height: '100%',
                                        width: '100%',
                                        marginBottom: '30px',
                                        marginTop: '30px'
                                    }}
                                >
                                    <Box sx={{ paddingRight: '20px' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span>{teams[matches[key].teamsId[0]].name}</span>
                                            <span> vs </span>
                                            <span>{teams[matches[key].teamsId[1]].name}</span>
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography gutterBottom variant="h5" component="div">
                                            <span className="score">{teams[matches[key].teamsId[0]].score}</span>
                                            <span> : </span>
                                            <span className="score">{teams[matches[key].teamsId[1]].score}</span>
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        <Typography gutterBottom component="div">
                            Total goals: {totalGoals}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ScoreBoard;
