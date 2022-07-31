type Match = {
    id: number;
    teamsId: [number, number]; // tuple
};

export type Matches = { [key: string]: Match };
export type ScoreBoard = { matches: { byId: Matches } };
