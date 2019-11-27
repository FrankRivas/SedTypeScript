export function validRegex(regexLine: string): boolean {
	let regexExpression = new RegExp(
		/^s\/[A-Za-z0-9 ]+\/[A-Za-z0-9 ]+\/(g?p?|p?g?)?$/
	)
	if (regexExpression.test(regexLine)) {
		return true
	} else {
		return false
	}
}

export function obtainCommand(regexLine: string): string[] {
	let originalWord = regexLine.split('/')[1]
	let newWord = regexLine.split('/')[2]
	let operationFlag = regexLine.split('/')[3]
	return [originalWord, newWord, operationFlag]
}
