import { inject } from "@angular/core";
import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { UserService } from "src/app/services/user.service";

import { rxMethod } from "@ngrx/signals/rxjs-interop"
import { catchError, of, pipe, switchMap, tap } from "rxjs";
import { User } from "src/app/models/user";

interface UserState {
    users: User[] | [];
    isLoading: boolean;
    error: string | null;
}

export const UserStore = signalStore(
    withState<UserState>({
        users: [],
        isLoading: false,
        error: null,
    }),
    withHooks({
        onInit({ users }) { // Runs once the store is initialized. Useful for loading initial data.
            console.log(users());
        },
        onDestroy() {
            console.log('onDestroy');
        }
    }),
    withMethods((store, userService = inject(UserService)) => ({
        loadUsers: rxMethod<void>(
            pipe(
                // set loading:
                tap(() => patchState(store, { isLoading: true, error: null })),
                // execute the async http service, cancel previous one
                switchMap(() => {
                    return userService.getUsers()
                        .pipe(
                            // On success, update the state with the user data
                            tap((users) => patchState(store, { users, isLoading: false })),
                            catchError(error => {
                                patchState(store, { isLoading: false, error: error.message });
                                return of(error);
                            })
                        )
                })
            )
        )
    }))
);