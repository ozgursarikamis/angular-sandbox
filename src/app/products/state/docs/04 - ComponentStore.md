# Component Store

ComponentStore is a standalone library that helps to manage local/component state. 

It is a lightweight alternative to NgRx/store.

`ComponentStore` is independent. It does not require NgRx/store or NgRx/effects.

## Installation

```bash
npm install @ngrx/component-store
```

## Why ComponentStore?

- Simpler single file.
- Independent state
- Similar to NgRx API

- `ComponentStore` does not dispatch actions. It is a simple state management solution for components.

## Usage

```ts
import { ComponentStore } from '@ngrx/component-store';

interface CounterState {
  count: number;
}

@Injectable()
export class CounterStore extends ComponentStore<CounterState> {
  constructor() {
    super({ count: 0 });
  }

  readonly count$ = this.select(state => state.count);

  readonly increment = this.updater((state: CounterState) => ({
    count: state.count + 1,
  }));

  readonly decrement = this.updater((state: CounterState) => ({
    count: state.count - 1,
  }));
}
```

```ts

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">Increment</button>
    <span>{{ count$ | async }}</span>
    <button (click)="decrement()">Decrement</button>
  `,
  providers: [CounterStore],
})

export class CounterComponent {
  readonly count$ = this.store.count$;

  constructor(private readonly store: CounterStore) {}

  increment() {
    this.store.increment();
  }

  decrement() {
    this.store.decrement();
  }
}
```