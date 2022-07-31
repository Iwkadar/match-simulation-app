import { useEffect, useState } from 'react';
import { selectScoreBoardMatches, simulationStarted } from './score-board-slice';
import { useTeams } from '../../hooks/queries';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Teams } from '../../types/teams';

const ScoreBoard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches = useAppSelector(selectScoreBoardMatches);
    const [enabledRefetchInterval, setEnabledRefetchInterval] = useState(false);
    const { data, isSuccess, dataUpdatedAt } = useTeams(enabledRefetchInterval);

    useEffect(() => {
        if (isSuccess) {
            dispatch(simulationStarted(data as Teams));
        }
    }, [isSuccess, dataUpdatedAt]);

    const startSimulation = () => {
        setEnabledRefetchInterval(true);
    };

    return (
        <div>
            <button type="button" onClick={startSimulation}>
                Start
            </button>
            {Object.keys(matches).length > 0 &&
                Object.keys(matches).map((key) => (
                    <div key={matches[key].teamsId[0]}>
                        <span>{(data as Teams)[matches[key].teamsId[0]].name}</span>
                        <span className="score">{(data as Teams)[matches[key].teamsId[0]].score}</span>
                        <span> vs </span>
                        <span className="score">{(data as Teams)[matches[key].teamsId[1]].score}</span>
                        <span>{(data as Teams)[matches[key].teamsId[1]].name}</span>
                    </div>
                ))}
        </div>
    );
};

export default ScoreBoard;
