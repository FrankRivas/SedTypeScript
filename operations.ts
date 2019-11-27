export function replaceLines(
	line: string,
	commands: string[],
	nArg: boolean
): string {
	for (let command of commands) {
		let originalWord: string = command.split('/')[1]
		let newWord: string = command.split('/')[2]
		let operationFlags: string = command.split('/')[3]
		if (line.includes(originalWord)) {
			if (operationFlags.includes('g')) {
				let onChange = new RegExp(originalWord, 'g')
				line = line.replace(onChange, newWord)
				//console.log(line)
			} else {
				line = line.replace(originalWord, newWord)
				//console.log(line)
			}
			if (operationFlags.includes('p')) {
				console.log(line)
			}
		}
	}
	if (!nArg) {
		console.log(line)
	}
	return line
}
