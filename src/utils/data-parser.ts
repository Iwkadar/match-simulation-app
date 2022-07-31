import * as A from 'fp-ts/ReadonlyArray';
import * as R from 'fp-ts/ReadonlyRecord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { Teams } from '../types/teams';
import { Matches } from '../types/matches';

const matches = [
    ['Germany', 'Poland'],
    ['Brazil', 'Mexico'],
    ['Argentina', 'Uruguay']
];

export const matchesById = (data: Teams): Matches =>
    pipe(
        matches,
        A.mapWithIndex((index, match) => ({
            id: index,
            teamsId: A.map((name) =>
                pipe(
                    data,
                    R.filter((team) => team.name === name),
                    R.reduce(S.Ord)(0 as number, (_, a) => a.id)
                )
            )(match)
        })),
        A.reduce({}, (acc, item) => R.upsertAt(item.id.toString(), item)(acc))
    );
