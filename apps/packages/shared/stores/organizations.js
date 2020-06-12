import { ajax } from 'rxjs/ajax';
import {
  map,
  startWith,
  switchMap,
  flatMap,
  catchError,
  filter,
  share, take, tap,
} from 'rxjs/operators';
import { of } from 'rxjs';
import { combineToArray } from './helpers';


const baseUrl = window.location.origin;
// const dataUrl= `${baseUrl}/assets/data/organizations.json`;
const dataUrl= "https://insideidaho.org/assets/data/organizations.json";


export const organizations$ = ajax(dataUrl)
  .pipe(
    switchMap((data) => {
      return data.response.organizations.map(
        (org => org.url));
    }),
    flatMap((url) => {
      return ajax(url);
    }),
    map((data) => {
      return ({
        id: data.response.id,
        name: data.response.name,
        url: data.request.url,
      });
    }),
    startWith([]),
    catchError((error) => {
      return of([]);
    }),
    map((org) => {
      const query = `orgid:${org.id}`;
      return {
        ...org,
        url: `https://www.arcgis.com/sharing/rest/community/groups?f=pjson&q=isopendata:true AND (${query})&num=100`,
      };
    }),
    flatMap((org) => {
      return ajax(org.url).pipe(
        map((data) => {
          return {
            ...org,
            groups: data.response.results.map((result) => ({
              id: result.id,
              title: result.title,
              snippet: result.snippet,
              owner: result.owner,
            })),
          };
        }),
      );
    }),
    filter(org => org.groups.length > 0),
  ).pipe(
    combineToArray(),
    share(),
  );

