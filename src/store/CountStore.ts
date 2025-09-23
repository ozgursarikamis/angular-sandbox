
import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const CountStore = signalStore(
  withState(initialState),
  withComputed(({ count }) => ({
    doubleCount: computed(() => {
      return count() ** 2
    })
  })),
  withMethods((store) => ({
    increment() {
      patchState(store, { count: store.count() + 1 })
    },
    decrement() {
      patchState(store, { count: store.count() - 1 })
    },
    set(value: number) {
      patchState(store, { count: value })
    }
  }))
);