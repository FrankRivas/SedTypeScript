import { flags } from './sed'

//Function to replace lines
export function replaceLines(
	line: string,
	commands: string[],
	nArg: flags
): string {
	let newLine: string = '' //variable to build the new line
	//Bucle to walk around each command
	commands.forEach(command => {
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
	})
	//End of the bucle
	//If the -n and the -i are not specified the program print the line
	if (!nArg.n) {
		if (nArg.i === undefined) {
			console.log(line)
		}
		newLine = newLine + line + '\n'
	}
	return newLine
}
