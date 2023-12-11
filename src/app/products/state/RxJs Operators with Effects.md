# RxJS Operators with Effects

| Operator | When | Possible Race Condition |
| --- | --- | --- |
| `concatMap` | Runs subscriptions/requests in order and is less performant. <br />`Use for GET, POST, PUT methods when the order is important` | No
| `mergeMap` | Runs subscriptions/requests in parallel and is more performant <br /> `Use for GET, POST, PUT methods when the order is not important` | Yes |
| `switchMap` | Cancels the current subscription/request <br /> `Use for cancelable requests like searches` | Yes |
| `exhaustMap` | Ignores all  subsequent subscription/request until complete <br /> `When you do not want more requests until the initial one completes.` | Yes |