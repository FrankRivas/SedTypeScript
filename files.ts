import * as fs from 'fs'
type validator = [boolean, string]

export function readFile(fileName: string): string[] {
	let file: validator = validFile(fileName)
	//console.log(`Return de valid file ${file[0]}`)
	if (file[0]) {
		let content: string[] = file[1].split('\n')
		//console.log('Valid File')
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
