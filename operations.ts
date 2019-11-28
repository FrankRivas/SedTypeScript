import { flags } from './sed'

export function replaceLines(
	line: string,
	commands: string[],
	nArg: flags
): string {
	let newLine: string = ''
	for (let command of commands) {
		let originalWord: string = command.split('/')[1]
		let newWord: string = command.split('/')[2]
		let operationFlags: string = command.split('/')[3]
		if (line.includes(originalWord)) {
			if (operationFlags.includes('g')) {
				let onChange = new RegExp(originalWord, 'g')
				line = line.replace(onChange, newWord)
			} else {
				line = line.replace(originalWord, newWord)
			}
			if (operationFlags.includes('p')) {
				if (nArg.i === undefined) {
					console.log(line)
				}
				newLine = newLine + line + '\n'
			}
		}
	}
	if (!nArg.n) {
		if (nArg.i === undefined) {
			console.log(line)
		}
		newLine = newLine + line + '\n'
	}
	return newLine
}
