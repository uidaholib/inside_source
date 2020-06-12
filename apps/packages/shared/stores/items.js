import { ajax } from "rxjs/ajax";
import { share, tap, map, switchMap, startWith } from "rxjs/operators";
import AsyncState from "./async_state";
import Item from "./item";

const state = new AsyncState();
export const itemsState$ = state.currentState;

const url = `https://opendata.arcgis.com/api/v2/datasets?q=igc-ec&fields[items]=tags`;

export const items$ = ajax(url).pipe(
  tap((_) => state.setLoading()),
  map((data) => data.response.data.map((result) => Item.from(result))),
  tap((_) => state.setLoaded()),
  startWith([]),
  share()
);
