import { createMachine, interpret, assign } from "xstate";
import { ajax } from "rxjs/ajax";
import {
  map,
  startWith,
  switchMap,
  flatMap,
  catchError,
  filter,
  share,
  take,
  tap,
} from "rxjs/operators";
import { of } from "rxjs";
import { combineToArray } from "./helpers";

export const organizations$ = (url) =>
  ajax(url)
    .pipe(
      switchMap((data) => {
        return data.response.organizations.map((org) => org.url);
      }),
      flatMap((url) => {
        return ajax(url);
      }),
      map((data) => {
        return {
          id: data.response.id,
          name: data.response.name,
          url: data.request.url,
        };
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
          })
        );
      }),
      filter((org) => org.groups.length > 0)
    )
    .pipe(
      combineToArray(),
      map((data) => ({ type: "DATA", data})),
    );

const machine = createMachine({
  id: "organizations",
  initial: "idle",
  context: {
    organizations: [],
    url: "https://insideidaho.org/assets/data/organizations.json",
    error: null,
  },
  states: {
    idle: {
      on: { LOAD: "loading" },
    },
    loading: {
      invoke: {
        src: (context) => organizations$(context.url),
        onDone: "loaded",
        onError: "error",
      },
      on: {
        DATA: {
          actions: assign({ organizations: (_, event) => event.data }),
        },
        CANCEL: "canceled",
      },
    },
    loaded: {},
    canceled: {
      on: { RETRY: "loading" },
    },
    error: {
      on: { RETRY: "loading" },
    },
  },
});

export default {
  machine,
};
