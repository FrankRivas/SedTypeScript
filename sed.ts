import * as yargs from 'yargs'
import { readFile } from './files'
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

//console.log(yargs.argv)

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
let newContent: string[] = []
/*console.log(txtFile)
console.log('..................')
console.log(fileContent)
console.log('..................')*/
for (let command of commandsList) {
	if (!validRegex(command)) {
		throw `The line ${command} is invalid`
	}
}
for (let docLine of fileContent) {
	docLine = replaceLines(docLine, commandsList, isBoolean(yargs.argv.n))
	newContent.push(docLine)
}
//console.log(isBoolean(yargs.argv.n))
/*
console.log(fileContent)
console.log('..................')
console.log(newContent)*/
