import { useState } from 'react';
import { useTeams } from './hooks/queries';

const ScoreBoard = (): JSX.Element => {
    const [enabledFetching, setEnabledFetching] = useState(false);
    const { data, isFetching, isLoading, isSuccess, dataUpdatedAt } = useTeams(enabledFetching);

    const startSimulation = () => {
        setEnabledFetching(true);
    };

    return (
        <div>
            {(isLoading || isFetching) && <div>Loading</div>}
            <button type="button" onClick={startSimulation}>
                Start
            </button>
            score board
        </div>
    );
};

export default ScoreBoard;
