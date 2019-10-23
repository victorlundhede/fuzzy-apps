//Node.js application to show the most common words in a chosen text file
let fs = require('fs');

let fileName = process.argv[2]; //Load file name written in terminal
let file = fs.readFileSync(fileName, 'utf8'); //Read file

//Remove special sympols and make the text lowercase
let cleanFile = file.replace(/[^\w\s]/gi, '').toLowerCase();

let word = cleanFile.split(' '); //Split file to array
let wordCount = new Map(); //Create map

for (let i = 0; i < word.length; i++) {
	//Loop that adds words to the wordCount map
	if (!wordCount.has(word[i])) {
		//If word is not in map, then add it
		wordCount.set(word[i], 1);
	} else {
		//If word is in map, add 1 to its value
		wordCount.set(word[i], wordCount.get(word[i]) + 1);
	}
}
//Because a map can't be sorted directly, it is converted to array
let entries = []; //Make array. Can also use Array.from(wordCount.entries())
entries.push(...wordCount.entries()); //Push wordCount's content into entries array
entries.sort(function(a, b) {
	//Sort array
	return b[1] - a[1]; //Uses [1] since the values need to be compared, not the keys
});
//Loop to show the 20 most common words in file
for (let i = 0; i < 20; i++) {
	console.log(entries[i]);
}
