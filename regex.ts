//Function to validate the files extensions and the existence of the files
export function validRegex(
	regexLine: string,
	regexExpression: RegExp
): boolean {
	return regexExpression.test(regexLine)
}
