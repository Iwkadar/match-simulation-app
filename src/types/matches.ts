type Match = {
    id: number;
    teamsId: [number, number]; // tuple
};

export type Matches = { [key: string]: Match };
export type MatchesById = { matches: { byId: Matches } };
