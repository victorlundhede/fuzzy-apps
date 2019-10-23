//Node.js file that shows the last lines of a chosen text
let fs = require('fs'); //Load file system

function lastLines(fileName, lineNumber) {
	const fil = fs.readFileSync(fileName, 'utf-8'); //Insert file in a constant
	let line = fil.split('\n'); //Split file for each linebreak
	let endIndex = line.length;
	let startIndex = endIndex - lineNumber; //endIndex and startIndex defines the lines the user wants to see
	for (let i = startIndex; i < endIndex; i++) {
		//A loop that finds the chosen lines and writes then in the console
		console.log(i + ' ' + line[i]); //Show line number and content
	}
}
run();
function run() {
	//A run function that takes inputs from the terminal and inserts them into function
	//Process.argv is an a array that refers to inputs in the console
	let fileName = process.argv[2];
	let lineNumber = process.argv[3];

	lastLines(fileName, lineNumber); //Insert values from console into the function lastLines
}
