export function validRegex(regexLine: string): boolean {
	let regexExpression = new RegExp(
		/^s\/[A-Za-z0-9 ]+\/[A-Za-z0-9 ]+\/(g?p?|p?g?)?$/
	)
	return regexExpression.test(regexLine)
}
