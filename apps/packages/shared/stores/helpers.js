import { pipe } from "rxjs";
import { reduce, startWith } from "rxjs/operators";
import { sortBy, prop, compose, toLower } from "ramda";

export const combineToArray = (source) =>
  pipe(
    reduce((acc, curr) => [...acc, curr], []),
    startWith([])
  );

export const sorter = (propName, caseSensitive = true) =>
  sortBy(compose(toLower, prop(propName)));
