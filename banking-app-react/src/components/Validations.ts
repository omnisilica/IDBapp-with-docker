
/**
 * Various regular expressions for validating standardized form fields,
 * such as email addresses, passwords, provinces, postal codes, and
 * phone numbers.
*/
export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const provincePattern = /^(ON|QC|NS|NB|MB|BC|PE|SK|AB|NL)$/;
export const postalCodePattern = /^[A-Za-z][0-9][A-Za-z]\s?[0-9][A-Za-z][0-9]$/;
export const phonePattern = /^\+?1?[- ]?\(?\d{3}\)?[- ]?\d{3}[- ]?\d{4}$/;

/**
 * Class for creating validations on form fields and values, using generic value checks
 * and method chaining so that any given form can be validated regardless of its library.
*/
export class Validatable {
	private value : any;
	private name : string;

	private firstError : string;
	private lastError : string;
	private currentError : string;

	/**
	 * Constructor for a validatable field
	 * 		value	The current value of the field being validated
	 * 		name	The name of the field being validated, used for generating error strings
	 * 				ex. `new Validatable("A1A1A1", "postal code");`
	*/
	protected constructor(value, name) {
		this.value = value;
		this.name = name;
	}

	/**
	 * Inline static constructor for validations, directly constructin and returning
	 * a Validatable for instant use in method chaining.
	 * 		value	The current value of the field being validated
	 * 		name	The name of the field being validated, used for generating error strings
	 * 				ex. `Validatable.validate("A1A1A1", "postal code");`
	*/
	public static validate(value : any, name : string) {
		return new Validatable(value, name);
	}

	/**
	 * Internal method for setting the error messages.
	*/
	protected setError(error : String) {
		if (this.firstError === undefined) this.firstError = error;
		this.lastError = error;
	}

	/** 
	 * Internal method which checks the provided condition - if the condition is True, it
	 * calls setError with the new error message.
	*/
	protected check(condition : boolean, error : String) {
		this.currentError = error;
		if (condition) this.setError(error);
	}

	/**
	 * Returns the first error encountered in the course of validation.
	*/
	getError() : string {
		return this.firstError? this.firstError : null;
	}

	/**
	 * Helper function allowing you to customize the error message returned on a specific
	 * stage of validation. Useful for scenarios where you want to re-use validation but provide
	 * a highly specific message.
	 * 		error	The custom message you wish to return on a failed validation.
	*/
	overrideError(error : String) {
		if (this.firstError === this.lastError && this.lastError === this.currentError) {
			this.firstError = error;
			this.lastError = error;
			this.currentError = error;
		}
		return this;
	}

	/**
	 * Helper function allowing you to treat a validation as if it has failed, regardless what its
	 * outcome was. Helpful when you want to output the standard error message for display purposes.
	*/
	fail() {
		this.setError(this.currentError);
		return this;
	}

	/**********************************************************************************************
	 * Validations
	 * These are where all current validations are maintained. To ensure method chaining continues
	 * to operate, make sure all validations operate on `this`, and then return `this`, with a type
	 * of Validatable
	 **********************************************************************************************/

	/**
	 * Validates that the field is present. If the value of the field is equivalent to the empty
	 * string, returns a failed validation.
	*/
	fieldPresent() : Validatable {
		this.check(this.value === "", `Please provide ${this.name}`);
		return this;
	}

	/**
	 * Validates that a field has a max length. If the value of the field is a string or array
	 * of greater length than the max, returns a failed validation.
	 * 		max		The maximum length of the value
	*/
	maxLength(max : number) : Validatable {
		this.check(this.value.length > max, `Please provide a shorter ${this.name}.`);
		return this;
	}

	/**
	 * Validates that a numeric field is less than a maximum amount. If the value of the field
	 * is higher than the max, returns a failed validation.
	 * 		max		The maximum value of the field
	*/
	maxValue(max : number) : Validatable {
		this.check(this.value > max, `Please enter a number below ${max + 1}`);
		return this;
	}

	/**
	 * Validates that a numeric field is zero or greater. If the value of the field is negative,
	 * returns a failed validation.
	*/
	notNegative() : Validatable {
		this.check(this.value < 0, "Negative numbers may not be entered.");
		return this;
	}

	/**
	 * Validates that a string field matches a regular expression. If it does not match, returns a
	 * failed validation.
	 * 		rx				The regular expression that must be matched to pass the validation
	 * 		expectedFormat	An example string which would pass the validation
	*/
	matches(rx : RegExp, expectedFormat : String) {
		this.check(!this.value.match(rx), `Please enter ${this.name} in format ${expectedFormat}`);
		return this;
	}

	/**
	 * Validates that the contents of a field are a number. If it cannot be converted to a number,
	 * returns a failed validation.
	*/
	numeric() {
		this.check(this.value === null || isNaN(Number(this.value)), `Only numeric values are accepted.`);
		return this;
	}

	/**
	 * Validates that at least one member of an array of booleans is truthy. Useful for manually validating
	 * sets of checkboxes where you have to track each one's state. If there are no truthy members, a 
	 * failed validation is returned.
	*/
	oneOrMoreOption() : Validatable {
		let state = false;
		for (var option of this.value) {
			state = option? option : state;
		}
		this.check(!state, 'Please select at least one option.');
		return this;
	}
}