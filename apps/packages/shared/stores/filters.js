import { combineLatest, Subject } from 'rxjs';
import {
  bufferCount,
  filter,
  map,
  scan,
  share,
  startWith,
  tap,
} from 'rxjs/operators';
import { uniq, all } from 'ramda';
import { searchResults$ } from './search';

export const filters = [
  {
    title: "Organization",
    type: "org"
  },
  {
    title: "Type",
    type: "type"
  }
];

export const filters$ = new Subject();

const filtersGroups$ = filters$.pipe(bufferCount(filters.length));

export const searchFilters$ = combineLatest(
  [filtersGroups$, searchResults$]).pipe(
    filter(([filters, results]) => results.length > 0),
    map(([filters, results]) => {
      return filters.map((filter) => {
        const values = ["All", ...uniq(results.filter(result => result.org).map((result) => result[filter]))];
        // const values = ["All", ...uniq(results.map((result) => result[filter]))];
        return { type: filter, values };
      });
    }),
    startWith([]),
    share(),
  );

export const resultFilters$ = new Subject();

export const filteredResults$ = combineLatest(
  [resultFilters$, searchResults$]).pipe(
    map(([filters, results]) => {
      return results.filter((item) => {
        return all((filter) => {
          if (filter.value === "All") return true;
          return item[`${filter.type}`] === filter.value;
        }, Array.from(filters.values()));
      });
    }),
    startWith([]),
    share(),
  );
