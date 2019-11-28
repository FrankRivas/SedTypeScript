import * as yargs from 'yargs'
import { readFile, createCopyFile, writeFile } from './files'
import { isString, isBoolean } from 'util'
import { replaceLines } from './operations'
import { validRegex } from './regex'

let commandsList: string[] = [] //Variable to save all the commands

yargs
	.boolean('n')
	.nargs('f', 1)
	.describe('f', 'commands in file')
	.nargs('e', 1)
	.describe('e', 'Multiple commands').argv

let txtFile: string = '' //Variable to save the name of the file

/*If -f or -e is specified, save the value on the array and the file is going 
to be the first element of the anonymous array in otherwase the command is going 
to be the first element of the anonymous array of yargs and the file is going to be te second one*/

if (yargs.argv.f || yargs.argv.e) {
	if (yargs.argv.e) {
		if (Array.isArray(yargs.argv.e)) {
			commandsList = [...commandsList, ...yargs.argv.e]
		} else if (isString(yargs.argv.e)) {
			commandsList = [...commandsList, yargs.argv.e]
		}
	}
	if (yargs.argv.f) {
		if (isString(yargs.argv.f)) {
			const lines: string[] = readFile(yargs.argv.f)
			commandsList = [...commandsList, ...lines]
		}
	}
	txtFile = yargs.argv._[0]
} else {
	commandsList = [...commandsList, yargs.argv._[0]]
	txtFile = yargs.argv._[1]
}

//Calling the function to read the file specified
let fileContent: string[] = readFile(txtFile)
let newContent: string = ''
const regexExpression = new RegExp(
	/^s\/[A-Za-z0-9 ]+\/[A-Za-z0-9 ]+\/(g?p?|p?g?)?$/
)

//Validating the list of commands
commandsList.forEach(command => {
	if (!validRegex(command, regexExpression)) {
		throw `The line ${command} is invalid`
	}
})

export interface flags {
	n: boolean
	i: boolean | string | undefined
}

let lineFlags = {
	n: yargs.argv.n,
	i: yargs.argv.i
} as flags

//Calling the function to aply each command to each line
fileContent.forEach(docLine => {
	docLine = replaceLines(docLine, commandsList, lineFlags)
	newContent = newContent + docLine
})

//Creating and Rewritting the file
const regexExpressionFile = new RegExp(/^[.][A-Za-z]+.?[A-Za-z]+$/)
if (yargs.argv.i !== undefined) {
	//Validatinf the extension of the new file
	if (isString(yargs.argv.i)) {
		if (!validRegex(yargs.argv.i, regexExpressionFile)) {
			throw `The extension ${yargs.argv.i} is invalid`
		}
		//Create the new file
		createCopyFile(txtFile, yargs.argv.i)
	}
	//Rewritting the file
	writeFile(txtFile, newContent)
}
