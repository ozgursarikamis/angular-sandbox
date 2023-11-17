import { Directive, ElementRef, HostListener, Provider, forwardRef, inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const DATE_VALUE_ACCESSOR: Provider = {
	provide: NG_VALUE_ACCESSOR,
	useExisting: forwardRef(() => DateValueAccessorDirective),
	multi: true
};

@Directive({
	selector: 'input([type=date])[formControlName],input([type=date])[formControl],input([type=date])[ngModel]',
	providers: [DATE_VALUE_ACCESSOR]
})
export class DateValueAccessorDirective implements ControlValueAccessor {
	constructor() { }

	element = inject(ElementRef);
	// it is called whenever the value of a FormControl changes from the UI
	// this function is responsible for updating the HTML element 
	// when its corresponding FormControl value changes
	writeValue(newValue: any): void {
		if (newValue instanceof Date) {
			// yyyy-mm-dd
			this.element.nativeElement.value = newValue?.toISOString().split('T')[0];
		}
	}

	@HostListener('input', ['$event.target.valueAsDate'])
	private onChange!: Function;

	@HostListener('blur')
	private onTouched!: Function;

	registerOnChange(fn: any): void {
		this.onChange = (valueAsDate: Date) => {
			fn(valueAsDate);
		}
	}
	registerOnTouched(fn: Function): void {
		this.onTouched = fn;
	}
}