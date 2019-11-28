import * as fs from 'fs'

//Function to read the lines in files
export function readFile(fileName: string): string[] {
	let file: string = validFile(fileName)
	const content: string[] = file.split('\n')
	return content
}

//Function to validate that a file exists
function validFile(fileName: string): string {
	try {
		let str = fs.readFileSync(fileName, 'utf8')
		return str
	} catch {
		throw `invalid File ${fileName}`
	}
}

//Function to create a copy of the file that is used
export function createCopyFile(fileToCopy: string, extension: string): void {
	try {
		fs.copyFileSync(fileToCopy, `${fileToCopy}${extension}`)
	} catch {
		throw 'Error while creating the new file'
	}
}

//Function to write the file used in those cases that the -i flag is specified
export function writeFile(fileToWrite: string, content: string): void {
	try {
		fs.writeFileSync(fileToWrite, content, 'utf8')
	} catch {
		throw 'Error while writting the file'
	}
}
