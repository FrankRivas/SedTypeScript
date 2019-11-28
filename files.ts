import * as fs from 'fs'
type validator = [boolean, string]

export function readFile(fileName: string): string[] {
	let file: validator = validFile(fileName)
	if (file[0]) {
		let content: string[] = file[1].split('\n')
		return content
	} else {
		throw 'Invalid File'
	}
}

function validFile(fileName: string): validator {
	try {
		let str = fs.readFileSync(fileName, 'utf8')
		return [true, str]
	} catch {
		throw 'Invalid File'
	}
}

export function createCopyFile(fileToCopy: string, extension: string): string {
	try {
		fs.copyFileSync(fileToCopy, `${fileToCopy}${extension}.txt`)
		return 'The new file was created'
	} catch {
		throw 'Error while creating the new file'
	}
}

export function writeFile(fileToWrite: string, content: string): string {
	try {
		fs.writeFileSync(fileToWrite, content, 'utf8')
		return 'The content was included in the document'
	} catch {
		throw 'Error while writting the file'
	}
}
