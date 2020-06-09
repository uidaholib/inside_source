import { BehaviorSubject, of } from 'rxjs';
import { startWith, switchMap, map, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
export const currentGroup$ = new BehaviorSubject(of(null));

import AsyncState from './async_state';

const state = new AsyncState();
export const currentState$ = state.currentState;


export const items$ = currentGroup$.asObservable().pipe(
  tap((_) => state.setLoading()),
  switchMap(group => {
    // const query =  `group:${group.id}`;
    // const url = `https://www.arcgis.com/sharing/rest/search?q=${query}&start=1&num=100&f=json`;
    // const url = `https://opendata.arcgis.com/api/v2/groups/${group.id}?include=datasets`;
    // const url = `https://opendata.arcgis.com/api/v2/groups/${group.id}/items?page[size]=100&include=datasets`;
    const url = `https://hub.arcgis.com/api/v3/datasets?filter[groupIds]=${group.id}&page[size]=99`;
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
        title: result.attributes.name,
        subtitle,
        description: result.attributes.description,
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
  tap((_) => state.setLoaded()),
  startWith([]),
);
