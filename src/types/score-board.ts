type Match = {
    id: number;
    teamsId: [number, number]; // tuple
};

export type Team = {
    id: number;
    score: number;
    name: string;
};

export type Status = '' | 'initializing' | 'running' | 'finished';
export type Matches = { [key: string]: Match };
export type Teams = { [key: string]: Team };
export type ScoreBoard = { matches: { byId: Matches }; teams: { byId: Teams }; status: Status };
