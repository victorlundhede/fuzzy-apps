let fs = require('fs');

let file = fs.readFileSync('./albums.json', 'utf-8'); //Indlæser JSON filen

let artist = process.argv[2]; //Definere variablerne med de inputs vi skrive i node
let title = process.argv[3]; //Define variables with the inputs from node terminal
let songTitle = process.argv[4];

let albums = JSON.parse(file); //Translate JSON to JS
albums.push({
	//Push new object into albums array with inputs from node
	Artist: artist,
	Title: title,
	'Song title': songTitle
});

let json = JSON.stringify(albums); //Translate JS to JSON

fs.writeFileSync('./albums.json', json); //Save changes to the albums.json file

console.log(albums); //View saved albums
