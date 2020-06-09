import {BehaviorSubject} from 'rxjs';

const ASYNC_STATES = {
  'INITIAL': 'INITIAL',
  'LOADING': 'LOADING',
  'LOADED': 'LOADED',
  'ERROR': 'ERROR',
};

export default class AsyncState {
    constructor(initialState = ASYNC_STATES.INITIAL) {
        this.state = new BehaviorSubject(initialState);
    }

    static get STATES() {
        return ASYNC_STATES;
    }

    get currentState() {
        return this.state;
    }

    setInitial() {
          this.state.next(ASYNC_STATES.INITIAL);
    }

    setLoading() {
          this.state.next(ASYNC_STATES.LOADING);
    }

    setLoaded() {
        this.state.next(ASYNC_STATES.LOADED);
    }

    setError() {
        this.state.next(ASYNC_STATES.ERROR);
    }
}