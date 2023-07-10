import { Pipe, PipeTransform } from '@angular/core';
import { isObservable, of } from 'rxjs';
import { map, startWith, catchError, concatAll } from 'rxjs/operators';

@Pipe({
  name: 'withLoading'
})
export class WithLoadingPipe implements PipeTransform {
  transform(val: any) {
    const loadingPipe$ = val.pipe(
      map((value: any) => {
        return {
          loading: value.type === 'start',
          value: value.type ? value.value : value
        };
      }),
      // concatAll(() => of({ loading: false })),
      catchError(error => of({ loading: false, error }))
    );

    return isObservable(val) ? loadingPipe$ : val;
  }
}