import {pipe} from 'rxjs';
import {reduce, startWith} from 'rxjs/operators';

export const combineToArray = source => pipe(
    reduce((acc, curr) => ([...acc, curr]), []),
    startWith([]),
);