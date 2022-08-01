import { useEffect, useState } from 'react';
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

const ScoreBoard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches = useAppSelector(selectScoreBoardMatches);
    const teams = useAppSelector(selectScoreBoardTeams);
    const status = useAppSelector(selectScoreBoardStatus);
    const [enabledInitData, setEnabledInitData] = useState(false);
    const { data: initTeamsData } = useInitTeams(enabledInitData);
    const { data, dataUpdatedAt } = useTeams(initTeamsData);

    useEffect(() => {
        dispatch(initializedMatches());
    }, []);

    useEffect(() => {
        if (data) {
            dispatch(updatedScore(data as Teams));
        }
    }, [dataUpdatedAt]);

    const startSimulation = () => {
        setEnabledInitData(true);
        dispatch(simulationStarted());
    };

    const finishSimulation = () => {
        setEnabledInitData(false);
        dispatch(simulationFinished());
    };

    const Button = ({ text, onClicked }: { text: string; onClicked: () => void }): JSX.Element => (
        <button type="button" onClick={onClicked}>
            {text}
        </button>
    );

    const getButton = (): JSX.Element => {
        if (status === 'initializing') {
            return <Button text="Start" onClicked={startSimulation} />;
        }
        if (status === 'running') {
            return <Button text="Finish" onClicked={finishSimulation} />;
        }
        if (status === 'finished') {
            return <Button text="Restart" onClicked={startSimulation} />;
        }
        return <Button text="" onClicked={() => {}} />;
    };

    return (
        <div>
            {getButton()}
            {Object.keys(matches).length > 0 &&
                Object.keys(matches).map((key) => (
                    <div key={matches[key].teamsId[0]}>
                        <span>{teams[matches[key].teamsId[0]].name}</span>
                        <span className="score">{teams[matches[key].teamsId[0]].score}</span>
                        <span> vs </span>
                        <span className="score">{teams[matches[key].teamsId[1]].score}</span>
                        <span>{teams[matches[key].teamsId[1]].name}</span>
                    </div>
                ))}
        </div>
    );
};

export default ScoreBoard;
