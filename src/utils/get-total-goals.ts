import * as R from 'fp-ts/ReadonlyRecord';
import { pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { Teams } from '../types/score-board';

export const getTotalGoals = (data: Teams): number =>
    pipe(
        data,
        R.reduce(S.Ord)(0 as number, (acc, cur) => acc + cur.score)
    );
