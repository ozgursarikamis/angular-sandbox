import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWordsValidator(control: AbstractControl): ValidationErrors | null {
  const restrictedWords = ['foo', 'bar', 'baz', 'qux'];
  const foundWords = restrictedWords.filter(word => control.value?.includes(word));

  return foundWords && foundWords.length > 0
	? { restrictedWords: foundWords.join(', ') }
	: null;
}