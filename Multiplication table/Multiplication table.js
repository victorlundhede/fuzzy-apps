//Generate a multiplication table
function lilleTabel() {
	//Definerer result da det ellers giver en fejl
	//Define result as it otherwise gives an error
	let result = '';
	//Uses a loop inside a loop to create table
	//First loop creates the vertical numbers
	for (let i = 1; i <= 10; i++) {
		//Second loop created the horizontal numbers
		for (let j = 1; j <= 10; j++) {
			//Multiplies the two variables and creates a line break for each line
			result += i * j + ' ';
			if (i * j < 10) {
				//If the result of i or j is less than 10, then is adds an extra space to make it look nicer
				result += ' ';
			}
		}
		// Create a linebreak in the first loop
		result += '\n';
	}
	//Return the result outside of the loops
	return result;
}
console.log(lilleTabel());
