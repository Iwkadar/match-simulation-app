import { useEffect, useState } from 'react';
import { selectScoreBoardMatches, simulationStarted } from './score-board-slice';
import { useTeams } from '../../hooks/queries';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { Teams } from '../../types/teams';

const ScoreBoard = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const matches = useAppSelector(selectScoreBoardMatches);
    const [buttonText, setButtonText] = useState('Start');
    const [enabledRefetchInterval, setEnabledRefetchInterval] = useState(false);
    const { data, isSuccess } = useTeams(enabledRefetchInterval);

    useEffect(() => {
        if (isSuccess) {
            dispatch(simulationStarted(data as Teams));
        }
    }, [isSuccess]);

    const startSimulation = () => {
        setEnabledRefetchInterval(true);

        setButtonText((prev) => {
            let newButtonText = '';
            switch (prev) {
                case 'Start':
                case 'Restart':
                    newButtonText = 'Finish';
                    break;
                case 'Finish':
                    newButtonText = 'Restart';
                    break;
                default:
                    newButtonText = 'Start';
            }
            return newButtonText;
        });
    };

    return (
        <div>
            <button type="button" onClick={startSimulation}>
                {buttonText}
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
