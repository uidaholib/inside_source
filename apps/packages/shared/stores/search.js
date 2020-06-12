import { Subject, combineLatest, BehaviorSubject } from 'rxjs';
import {
  debounceTime, flatMap,
  startWith,
  switchMap,
  tap,
  filter,
  map, mergeMap, bufferCount, retryWhen, share, distinctUntilChanged, withLatestFrom,
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { flatten, uniq } from 'ramda';

import { organizations$ } from './organizations';

export const SEARCH_STATES = {
  'IDLE': 'IDLE',
  'LOADING': 'LOADING',
  'LOADED': 'LOADED',
};

export const searchState$ = new BehaviorSubject(SEARCH_STATES.IDLE);

export const search$ = new Subject();

export const groups$ = organizations$.pipe(
  filter(orgs => orgs.length > 0),
  map((orgs) => flatten(orgs.map((org) => org.groups))),
  share(),
);

export const searchTerm$ = new Subject();

export const searchResults$ = combineLatest([search$, groups$]).pipe(
  filter(([term, groups]) => term.length > 0 && groups.length > 0),
  tap(() => searchState$.next(SEARCH_STATES.LOADING)),
  switchMap(([text, groups]) => {
    searchTerm$.next(text);
    const groupIds = groups.map((group) => group.id);
    const filterByGroupIds = `any(${groupIds.join(',')})`;
    // const url = `https://opendata.arcgis.com/api/v2/datasets?q=${text}&filter[groupsIds]=${filterByGroupIds}&page[size]=100`;
    const url = `https://hub.arcgis.com/api/v3/datasets?q=${text}&filter[groupIds]=${filterByGroupIds}&page[size]=99`;
    return ajax(url);
  }),
  map((data) => {
    return data.response.data.map((result) => {
      let subtitle = '';
      if (result.attributes.tags && result.attributes.tags.find((s) => s.match(/\(?igc-ec\)?|idaho\s+geospatial\s+council\s+-\s+executive\s+committee\s+framework\s+layer/gi))) {
        subtitle = 'Idaho Framework Layer';
      }
      const itemId = result.links.itemPage.split("=")[1];
      return ({
        id: result.id,
        name: result.attributes.name,
        subtitle,
        owner: result.attributes.owner,
        type: result.attributes.type,
        snippet: result.attributes.description,
        thumbnailUrl: `https://www.arcgis.com/sharing/content/items/${itemId}/info/${result.attributes.thumbnailUrl}`,
        slug: result.attributes.slug,
        landingPage: result.links.self.replace("api/v3/", ""),
        url: result.links.itemPage,
        org: result.attributes.organization,
      });
    });
  }),
  tap(() => searchState$.next(SEARCH_STATES.LOADED)),
  startWith([]),
  share(),
);

