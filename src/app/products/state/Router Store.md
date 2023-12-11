# Router Store

Router store is a feature state that is used to store the router state. 

It is used to store the current route, the previous route, and the navigation extras.

## Why Router Store?

`Router store` is useful when you want to access the router state in the store. 

For example, you can use the router state to store the previous route and the current route. This is useful when you want to access the previous route in the store.

> Router Store adds bindings to connect the Angular Router to @ngrx/store. 
> 
> To use these bindings, add `StoreRouterConnectingModule.forRoot()` to your `@NgModule.imports` array. 
>
> Once added, you can start using the router state inside your application code by injecting the `RouterStateSnapshot` into your `@ngrx/store` selectors.

## Navigation Actions

`ROUTER_REQUEST` At the start of each navigation

`ROUTER_NAVIGATION` During navigation, before any guards or resolvers run

`ROUTER_NAVIGATED` After guards and resolvers, when the navigation is successful

`ROUTER_ERROR` When an error is thrown during navigation

`ROUTER_CANCEL` If navigation is canceled by a guard or resolver

## Route Selectors

`selectCurrentRoute` Selects the current route
`selectFragment` Selects the current route fragment
`selectQueryParams` Selects the current route query params
`selectQueryParam` Selects a specific query param by name
`selectRouteParams` Selects the current route params
`selectRouteParam` Selects a specific route param by name
`selectRouteData` Selects the current route data
`selectRouteDataParam` Selects a specific route data param by name
`selectUrl` Selects the current url
`selectTitle` Selects the current route title

```typescript
import { getRouterSelectors } from '@ngrx/router-store';

export const {
    selectCurrentRoute,
    selectFragment,
} = getRouterSelectors();

```