import * as yargs from 'yargs'
import { readFile, createCopyFile, writeFile } from './files'
import { isString, isBoolean } from 'util'
import { replaceLines } from './operations'
import { validRegex } from './regex'

let commandsList: string[] = []

yargs
	.boolean('n')
	.nargs('f', 1)
	.describe('f', 'commands in file')
	.nargs('e', 1)
	.describe('e', 'Multiple commands').argv

let txtFile: string = ''

if (yargs.argv.f || yargs.argv.e) {
	if (yargs.argv.e) {
		if (Array.isArray(yargs.argv.e)) {
			for (let items of yargs.argv.e) {
				commandsList.push(items)
			}
		} else if (isString(yargs.argv.e)) {
			commandsList.push(yargs.argv.e)
		}
	}
	if (yargs.argv.f) {
		if (isString(yargs.argv.f)) {
			let lines: string[] = readFile(yargs.argv.f)
			for (let line of lines) {
				commandsList.push(line)
			}
		}
	}
	txtFile = yargs.argv._[0]
} else {
	commandsList.push(yargs.argv._[0])
	txtFile = yargs.argv._[1]
}

let fileContent: string[] = readFile(txtFile)
let newContent: string = ''

for (let command of commandsList) {
	if (!validRegex(command)) {
		throw `The line ${command} is invalid`
	}
}

export interface flags {
	n: boolean
	i: boolean | string | undefined
}

let lineFlags = {
	n: yargs.argv.n,
	i: yargs.argv.i
} as flags

for (let docLine of fileContent) {
	docLine = replaceLines(docLine, commandsList, lineFlags)
	newContent = newContent + docLine
}

if (yargs.argv.i !== undefined) {
	if (isString(yargs.argv.i)) {
		// Create the new file
		createCopyFile(txtFile, yargs.argv.i)
	}
	writeFile(txtFile, newContent)
}
