import { AbstractControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[] = ['foo', 'bar', 'baz', 'qux']) {
	return function restrictedWordsValidator(control: AbstractControl): ValidationErrors | null {
		
		const foundWords = words.filter(word => control.value?.includes(word));
	  
		return foundWords && foundWords.length > 0
		  ? { restrictedWords: foundWords.join(', ') }
		  : null;
	  }
}